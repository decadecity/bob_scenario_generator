/* eslint-env mocha */

const assert = require('assert');

const generator = require('../app/generator');
const aircraft = require('../app/aircraft');

const available_aircraft = [
  /*  i                 id  play?  Name          e  m  l  b   c  o   i  n  r  Opponents */
  /*  0 */ aircraft.new(1,  true,  'Hurricane',  3, 2, 2, 0,  3, 1,  3, 1, 2, [11, 12, 13, 14, 15]),
  /*  1 */ aircraft.new(2,  true,  'Spitfire',   3, 3, 3, 3,  3, 1,  3, 2, 0, [11, 12, 13, 14, 15]),
  /*  2 */ aircraft.new(3,  true,  'Defiant',    3, 1, 0, 0,  2, 1,  3, 1, 3, [11, 12, 13]),
  /*  3 */ aircraft.new(4,  true,  'Blenheim',   1, 0, 0, 2,  1, 3,  1, 3, 2, [11, 12, 13, 14]),
  /*  4 */ aircraft.new(5,  true,  'Gladiator',  1, 0, 0, 0,  0, 3,  1, 0, 2, [11, 12, 13, 15]),
  /*  5 */ aircraft.new(6,  true,  'Whirlwind',  1, 1, 1, 0,  0, 3,  1, 0, 2, [11, 12, 13, 15]),
  /*  6 */ aircraft.new(11, false, 'Ju 87',      2, 1, 0, 0,  2, 2,  2, 0, 0  ),
  /*  7 */ aircraft.new(12, false, 'Do 17',      3, 2, 1, 0,  3, 2,  3, 0, 3  ),
  /*  8 */ aircraft.new(13, false, 'He 111',     3, 3, 3, 3,  3, 1,  3, 2, 0  ),
  /*  9 */ aircraft.new(14, false, 'Ju 88',      1, 2, 3, 3,  2, 2,  3, 3, 1  ),
  /* 10 */ aircraft.new(15, false, 'Ar 196',     2, 2, 2, 0,  0, 2,  0, 0, 3  ),
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

		it("should generate a weighted list of aircraft for a given period", function() {
			assert.deepEqual(
				generator._get_aircraft_weighted_by_period(
					[available_aircraft[0], available_aircraft[3]],
					'early'
				),
				[available_aircraft[0], available_aircraft[0], available_aircraft[0], available_aircraft[3]]
			);

			assert.deepEqual(
				generator._get_aircraft_weighted_by_period(
					[available_aircraft[7], available_aircraft[8]],
					'blitz'
				),
				[available_aircraft[8], available_aircraft[8], available_aircraft[8]]
			);
		});

		it("should generate a weighted list of aircraft by type", function() {
			const hurricane = available_aircraft[0];
			const gladiator = available_aircraft[4];

			assert.deepEqual(
				generator._get_aircraft_weighted_by_type(
					[hurricane, hurricane, gladiator],
					2,2
				),
				[
					hurricane, hurricane, hurricane, hurricane, hurricane, hurricane, hurricane, hurricane,
					hurricane, hurricane, hurricane, hurricane, hurricane, hurricane, hurricane, hurricane,
					gladiator, gladiator, gladiator, gladiator, gladiator, gladiator,
				]
			);
		});

		it("should get the opponents of a selected aircraft", function() {
			assert.deepEqual(generator._get_opponents(available_aircraft[2], available_aircraft), [
				available_aircraft[6], available_aircraft[7], available_aircraft[8],
			]);
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
