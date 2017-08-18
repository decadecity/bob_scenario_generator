_new = (
  id,
  playable,
  name,
  early,
  mid,
  late,
  blitz,
  common,
  outlandish,
  intercept,
  night,
  recon,
  opponents
) => {
  return {
    id: id,
    playable: playable,
    name: name,
    early: early,
    mid: mid,
    late: late,
    blitz: blitz,
    common: common,
    outlandish: outlandish,
    intercept: intercept,
    night: night,
    recon: recon,
    opponents: opponents,
  };
}

module.exports.new = _new;

const german_aircraft = [
  /*   id  play?   Name         e  m  l  b   c  o   i  n  r  */
  _new(11, false, 'Ju 87',      2, 1, 0, 0,  2, 2,  2, 0, 0  ),
  _new(12, false, 'Do 17',      3, 2, 1, 0,  3, 2,  3, 0, 3  ),
  _new(13, false, 'He 111',     3, 3, 3, 3,  3, 1,  3, 2, 0  ),
  _new(14, false, 'Ju 88',      1, 2, 3, 3,  2, 2,  3, 3, 1  ),
  _new(15, false, 'Ar 196',     2, 2, 2, 0,  0, 2,  0, 0, 3  ),
]

const ju_87 = german_aircraft[0];
const do_17 = german_aircraft[1];
const he_111 = german_aircraft[2];
const ju_88 = german_aircraft[3];
const ar_196 = german_aircraft[4];

const british_aircraft = [
  /*   id  play?   Name         e  m  l  b   c  o   i  n  r  Opponents */
  _new(1,  true,  'Hurricane',  3, 2, 2, 0,  3, 1,  3, 1, 2, [ju_87, do_17, he_111, ju_88, ar_196]),
  _new(2,  true,  'Spitfire',   3, 3, 3, 3,  3, 1,  3, 2, 0, [ju_87, do_17, he_111, ju_88]),
  _new(3,  true,  'Defiant',    3, 1, 0, 0,  2, 1,  3, 1, 3, [ju_87, do_17, he_111]),
  _new(4,  true,  'Blenheim',   1, 0, 0, 2,  1, 3,  1, 3, 2, [ju_87, do_17, he_111, ju_88]),
  _new(5,  true,  'Gladiator',  1, 0, 0, 0,  0, 3,  1, 0, 2, [ju_87, do_17, he_111, ar_196]),
  _new(6,  true,  'Whirlwind',  1, 1, 1, 0,  0, 3,  1, 0, 2, [ju_87, do_17, he_111, ar_196]),
];

const hurricane = british_aircraft[0];
const spitfire = british_aircraft[1];
const defiant = british_aircraft[2];
const blenheim = british_aircraft[3];
const gladiator = british_aircraft[4];
const whirlwind = british_aircraft[5];

module.exports.available_aircraft = [...british_aircraft, ...german_aircraft] ;

_get_opponents = (aircraft, available_aircraft) => {
  return _.filter(available_aircraft, a => aircraft.opponents.includes(a.id));
};
