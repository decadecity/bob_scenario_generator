/* eslint-env mocha */

const assert = require('assert');

const aircraft = require('../app/aircraft');

describe("Aircraft", function() {
  it("should have the correct properties", function() {
    const result_aircraft = {
      id: 1,
      playable: true,
      name: 'Hurricane',
      early: 3,
      mid: 2,
      late: 2,
      blitz: 0,
      common: 3,
      outlandish: 1,
      intercept: 3,
      night: 1,
      recon: 2,
      opponents: [11, 12],
    };
    const test_aircraft = aircraft.new(1, true, 'Hurricane', 3, 2, 2, 0, 3, 1, 3, 1, 2, [11, 12]);
    assert.deepEqual(test_aircraft, result_aircraft);
  });
});
