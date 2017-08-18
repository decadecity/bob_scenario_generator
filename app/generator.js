const _ = require('lodash');

const periods_avail = ['early', 'mid', 'late', 'blitz'];
const types_avail = ['common', 'outlandish'];
const scenarios_avail = ['intercept', 'night', 'recon'];

module.exports.get_playable = aircraft => _.filter(aircraft, a => a.playable);

module.exports.get_periods = aircraft => _.uniq(module.exports._get_weighted_periods(aircraft));

module.exports.get_types = (aircraft, periods) => {
	return _.uniq(
		_.reduce(aircraft, (types, a) => {
			periods.forEach(period => {
				if (a[period]) {
					types_avail.forEach(type => {
						if (a[type]) {
							types.push(type);
						};
					});
				}
			});
			return types;
		}, [])
	);
};

module.exports._get_weighted_periods = aircraft => {
	let periods = [];
	aircraft.forEach(a => {
		periods_avail.forEach(period => {
			_.times(a[period], () => {
				periods.push(period);
			});
		});
	});
	return periods;
};

module.exports._get_aircraft_weighted_by_period = (aircraft, period) => {
	let weighted = [];
	aircraft.forEach(a => {
		_.times(a[period], () => {
			weighted.push(a);
		});
	});
	return weighted;
};

module.exports._get_aircraft_weighted_by_type = (aircraft, common, outlandish) => {
	let weighted = [];
	aircraft.forEach(a => {
		_.times((a['common'] * common) + (a['outlandish'] * outlandish), () => {
			weighted.push(a);
		});
	});
	return weighted;
};

module.exports._get_opponents = (aircraft) => {
	return aircraft.opponents;
};

module.exports._get_weighted_scenarios = (aircraft_1, aircraft_2) => {
	let scenarios = [];
	scenarios_avail.forEach(scenario => {
		_.times(aircraft_1[scenario] * aircraft_2[scenario], () => {
			scenarios.push(scenario);
		})
	});
	return scenarios;
};

get_aircraft = (aircraft, period, outlandish, common) => {
	aircraft = module.exports._get_aircraft_weighted_by_period(aircraft, period);
	aircraft = module.exports._get_aircraft_weighted_by_type(aircraft, outlandish, common);
	return _.sample(aircraft);
}

module.exports.get_scenario = (available_aircraft, aircraft, outlandish, common) => {
	const period = _.sample(module.exports._get_weighted_periods(aircraft));

	const a = get_aircraft(aircraft, period, outlandish, common);
	const o = get_aircraft(a.opponents, period, outlandish, common);
	const scenario = _.sample(module.exports._get_weighted_scenarios(a, o));

	return [a, o, scenario]

};
