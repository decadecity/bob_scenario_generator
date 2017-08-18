/* eslint-env mocha */

const assert = require('assert');

const generator = require('../app/generator');
const aircraft = require('../app/aircraft');

const available_aircraft = aircraft.available_aircraft;

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
