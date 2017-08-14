const _ = require('lodash');

module.exports.get_playable = function(aircraft) {
	return _.filter(aircraft, function(a) { return a.playable; });
};

module.exports.get_periods = function(aircraft) {
	return _.uniq(
		_.reduce(aircraft, function(periods, a) {
			['early', 'mid', 'late', 'blitz'].forEach(function(period) {
				if (a[period]) {
					periods.push(period);
				}
			});
			return periods;
		}, [])
	);
};
