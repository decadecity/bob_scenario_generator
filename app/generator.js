const _ = require('lodash');

const periods_avail = ['early', 'mid', 'late', 'blitz'];

module.exports.get_playable = function(aircraft) {
	return _.filter(aircraft, function(a) { return a.playable; });
};

module.exports.get_periods = function(aircraft) {
	return _.uniq(
		_.reduce(aircraft, function(periods, a) {
			periods_avail.forEach(function(period) {
				if (a[period]) {
					periods.push(period);
				}
			});
			return periods;
		}, [])
	);
};

module.exports.get_types = function(aircraft, periods) {
	const types_avail = ['common', 'outlandish'];
	return _.uniq(
		_.reduce(aircraft, function(types, a) {
			periods.forEach(function(period) {
				if (a[period]) {
					types_avail.forEach(function(type) {
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

module.exports._get_weighted_periods = function(aircraft) {
	let periods = [];
	aircraft.forEach(function(a) {
		periods_avail.forEach(function(period) {
			for (let i = 0; i < a[period]; i++) {
				periods.push(period);
			}
		});
	});
	return periods;
};

/*
Scenario generator algorithm.

aircraft, periods, types

X find the intersection of periods and available aircraft.
X weighted list of those periods by aircraft
 - pick one.

find aircraft weighted for that period.
multiply each aircraft's common and outlandish scores to weight the list of aircraft.
pick the aircraft.

find the opponents weighted for that period.
weight for common and outlandish.
pick the opponent.

weight the scenarios for both aircraft and pick one.

*/
