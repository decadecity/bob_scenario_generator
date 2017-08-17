const generator = require('./generator');
const aircraft = require('./aircraft');

const available_aircraft = [
  /*           id  play?   Name         e  m  l  b   c  o   i  n  r  Opponents */
  aircraft.new(1,  true,  'Hurricane',  3, 2, 2, 0,  3, 1,  3, 1, 2, [11, 12, 13, 14, 15]),
  aircraft.new(2,  true,  'Spitfire',   3, 3, 3, 3,  3, 1,  3, 2, 1, [11, 12, 13, 14, 15]),
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


let scenario = generator.get_scenario(available_aircraft, generator.get_playable(available_aircraft), 0, 3)
console.log(scenario[0].name, scenario[1].name, scenario[2]);
