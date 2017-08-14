/* eslint-env mocha */

const assert = require('assert');

const generator = require('../app/generator');
const aircraft = require('../app/aircraft');

const available_aircraft = [
  aircraft.new(1, true, 'Hurricane', 3, 2, 2, 0, 3, 1, 3, 1, 2, [11, 12]),
  aircraft.new(2, true, 'Spitfire', 3, 3, 3, 3, 3, 1, 3, 2, 0, [11, 12]),
  aircraft.new(3, true, 'Defiant', 3, 1, 0, 0, 2, 1, 3, 1, 3, 2, [11, 12]),
  aircraft.new(5, true, 'Gladiator', 1, 0, 0, 0, 0, 3, 1, 0, 2, [11, 12]),
  aircraft.new(11, false, 'He 111', 3, 3, 3, 3, 3, 1, 3, 2, 0),
];

describe("Generator", function() {
	let playable;
	let periods;

	it("should return a list of playable aircraft", function() {
		playable = generator.get_playable(available_aircraft);
		assert.deepEqual(playable, [
			available_aircraft[0],
			available_aircraft[1],
			available_aircraft[2],
			available_aircraft[3],
		]);
	});

	it("should list the available periods", function() {
		periods = ['early', 'mid', 'late', 'blitz'];
		assert.deepEqual(generator.get_periods(playable), periods);
	});

	it("should list the available types", function() {
		assert.deepEqual(generator.get_types([available_aircraft[0]], ['early']), ['common', 'outlandish']);
		assert.deepEqual(generator.get_types([available_aircraft[3]], ['early']), ['outlandish']);
	});

});
