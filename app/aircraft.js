module.exports.new = (
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
