const generator = require('./generator');
const aircraft = require('./aircraft');

let scenario = generator.get_scenario(aircraft.available_aircraft, generator.get_playable(aircraft.available_aircraft), 0, 3)
console.log(scenario[0].name, scenario[1].name, scenario[2]);
