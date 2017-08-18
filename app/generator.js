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

module.exports.get_scenario = (available_aircraft, aircraft, outlandish, common) => {
	const period = _.sample(module.exports._get_weighted_periods(aircraft));
	//console.log(period);

	aircraft = module.exports._get_aircraft_weighted_by_period(aircraft, period);
	//console.log(aircraft);
	aircraft = module.exports._get_aircraft_weighted_by_type(aircraft, outlandish, common);
	//console.log(aircraft);
	let a = _.sample(aircraft);
	//console.log(a);

	let opponents = module.exports._get_opponents(a);
	//console.log(opponents);
	opponents = module.exports._get_aircraft_weighted_by_period(opponents, period);
	opponents = module.exports._get_aircraft_weighted_by_type(opponents, outlandish, common);
	let o = _.sample(opponents);

	let scenario = _.sample(module.exports._get_weighted_scenarios(a, o));

	return [a, o, scenario]

};

/*
Scenario generator algorithm.

aircraft, periods, types

X find the intersection of periods and available aircraft.
X weighted list of those periods by aircraft
rand: pick a period.

X find aircraft weighted for that period.
X multiply each aircraft's common and outlandish scores to weight the list of aircraft.
rand: pick the aircraft.

X find the opponents
X weight the opponents for that period.
X weight for common and outlandish.
rand: pick the opponent.

X weight the scenarios for both aircraft
rand: pick the scenario.

*/
