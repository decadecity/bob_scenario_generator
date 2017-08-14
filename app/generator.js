const _ = require('lodash');

module.exports.get_playable = function(aircraft) {
	return _.filter(aircraft, function(a) { return a.playable; });
};

module.exports.get_periods = function(aircraft) {
	const periods_avail = ['early', 'mid', 'late', 'blitz'];
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
