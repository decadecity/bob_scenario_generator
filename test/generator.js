/* eslint-env mocha */

const assert = require('assert');

const generator = require('../app/generator');
const aircraft = require('../app/aircraft');

const available_aircraft = [
  aircraft.new(1, true, 'Hurricane', 3, 2, 2, 0, 3, 1, 3, 1, 2, [11, 12, 13, 14, 15]),
  aircraft.new(2, true, 'Spitfire', 3, 3, 3, 3, 3, 1, 3, 2, 0, [11, 12, 13, 14, 15]),
  aircraft.new(3, true, 'Defiant', 3, 1, 0, 0, 2, 1, 3, 1, 3, 2, [11, 12, 12, 13]),
  aircraft.new(4, true, 'Blenheim', 1, 0, 0, 2, 1, 3, 1, 3, 2, [11, 12, 13, 14]),
  aircraft.new(5, true, 'Gladiator', 1, 0, 0, 0, 0, 3, 1, 0, 2, [11, 12, 13, 15]),
  aircraft.new(6, true, 'Whirlwind', 1, 1, 1, 0, 0, 3, 1, 0, 2, [11, 12, 13, 15]),
  aircraft.new(11, false, 'Ju 87 Stuka', 2, 1, 0, 0, 2, 2, 2, 0, 0),
  aircraft.new(12, false, 'Do 17 Flying Pencil', 3, 2, 1, 0, 3, 2, 3, 0, 3),
  aircraft.new(13, false, 'He 111', 3, 3, 3, 3, 3, 1, 3, 2, 0),
  aircraft.new(14, false, 'Ju 88', 1, 2, 3, 3, 2, 2, 3, 3, 1),
  aircraft.new(15, false, 'Ar 196', 2, 2, 2, 0, 0, 2, 0, 0, 3),
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
			available_aircraft[4],
			available_aircraft[5],
		]);
	});

	it("should list the available periods", function() {
		periods = ['early', 'mid', 'late', 'blitz'];
		assert.deepEqual(generator.get_periods(playable), periods);
	});

	it("should list the available types", function() {
		assert.deepEqual(generator.get_types([available_aircraft[0]], ['early']), ['common', 'outlandish']);
		assert.deepEqual(generator.get_types([available_aircraft[5]], ['early']), ['outlandish']);
	});

	describe("Sub routines", function() {

		it("should generate a weighted list of available periods from aircraft", function() {
			assert.deepEqual(generator._get_weighted_periods([available_aircraft[0]]),
				['early', 'early', 'early', 'mid', 'mid', 'late', 'late']
			);
			assert.deepEqual(generator._get_weighted_periods([available_aircraft[0], available_aircraft[3]]),
				['early', 'early', 'early', 'mid', 'mid', 'late', 'late', 'early', 'blitz', 'blitz']
			);
		});

	});

	xit("should generate a list of possible scenarios", function() {
			let aircraft = [];
			let periods = [];
			let types = [];
			assert.deepEqual(generator.get_scenario(aircraft, periods, types), []);

			//Aircraft, Scenario, Opponent, (period)
		});

});
