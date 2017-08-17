/* eslint-env mocha */

const assert = require('assert');

const generator = require('../app/generator');
const aircraft = require('../app/aircraft');

const available_aircraft = [
  /*           id  play?   Name         e  m  l  b   c  o   i  n  r  Opponents */
  aircraft.new(1,  true,  'Hurricane',  3, 2, 2, 0,  3, 1,  3, 1, 2, [11, 12, 13, 14, 15]),
  aircraft.new(2,  true,  'Spitfire',   3, 3, 3, 3,  3, 1,  3, 2, 0, [11, 12, 13, 14, 15]),
  aircraft.new(3,  true,  'Defiant',    3, 1, 0, 0,  2, 1,  3, 1, 3, [11, 12, 13]),
  aircraft.new(4,  true,  'Blenheim',   1, 0, 0, 2,  1, 3,  1, 3, 2, [11, 12, 13, 14]),
  aircraft.new(5,  true,  'Gladiator',  1, 0, 0, 0,  0, 3,  1, 0, 2, [11, 12, 13, 15]),
  aircraft.new(6,  true,  'Whirlwind',  1, 1, 1, 0,  0, 3,  1, 0, 2, [11, 12, 13, 15]),
  aircraft.new(11, false, 'Ju 87',      2, 1, 0, 0,  2, 2,  2, 0, 0  ),
  aircraft.new(12, false, 'Do 17',      3, 2, 1, 0,  3, 2,  3, 0, 3  ),
  aircraft.new(13, false, 'He 111',     3, 3, 3, 3,  3, 1,  3, 2, 0  ),
  aircraft.new(14, false, 'Ju 88',      1, 2, 3, 3,  2, 2,  3, 3, 1  ),
  aircraft.new(15, false, 'Ar 196',     2, 2, 2, 0,  0, 2,  0, 0, 3  ),
];

const hurricane = available_aircraft[0];
const spitfire = available_aircraft[1];
const defiant = available_aircraft[2];
const blenheim = available_aircraft[3];
const gladiator = available_aircraft[4];
const whirlwind = available_aircraft[5];
const ju_87 = available_aircraft[6];
const do_17 = available_aircraft[7];
const he_111 = available_aircraft[8];
const ju_88 = available_aircraft[9];
const ar_196 = available_aircraft[10];


describe("Generator", () => {

	it("should return a list of playable aircraft", () => {
		assert.deepEqual(generator.get_playable(available_aircraft), [
			hurricane,
			spitfire,
			defiant,
			blenheim,
			gladiator,
			whirlwind,
		]);
	});

	it("should list the available periods", () => {
		assert.deepEqual(generator.get_periods([hurricane, blenheim]), ['early', 'mid', 'late', 'blitz']);
	});

	it("should list the available types", () => {
		assert.deepEqual(generator.get_types([hurricane], ['early']), ['common', 'outlandish']);
		assert.deepEqual(generator.get_types([whirlwind], ['early']), ['outlandish']);
	});

	describe("Sub routines", () => {

		it("should generate a weighted list of available periods from aircraft", () => {
			assert.deepEqual(generator._get_weighted_periods([hurricane]),
				['early', 'early', 'early', 'mid', 'mid', 'late', 'late']
			);
			assert.deepEqual(generator._get_weighted_periods([hurricane, blenheim]),
				['early', 'early', 'early', 'mid', 'mid', 'late', 'late', 'early', 'blitz', 'blitz']
			);
		});

		it("should generate a weighted list of aircraft for a given period", () => {
			assert.deepEqual(
				generator._get_aircraft_weighted_by_period(
					[hurricane, blenheim],
					'early'
				),
				[hurricane, hurricane, hurricane, blenheim]
			);

			assert.deepEqual(
				generator._get_aircraft_weighted_by_period(
					[do_17, he_111],
					'blitz'
				),
				[he_111, he_111, he_111]
			);
		});

		it("should generate a weighted list of aircraft by type", () => {
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

		it("should get the opponents of a selected aircraft", () => {
			assert.deepEqual(generator._get_opponents(defiant, available_aircraft), [
				ju_87, do_17, he_111,
			]);
		});

		it("should get the scenarios for a pair of aircraft", () => {
			assert.deepEqual(
				generator._get_weighted_scenarios(spitfire, do_17),
				['intercept', 'intercept', 'intercept', 'intercept', 'intercept', 'intercept', 'intercept', 'intercept', 'intercept', ]
			);
		});

	});

});
