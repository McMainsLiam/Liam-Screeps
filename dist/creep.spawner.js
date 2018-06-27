var creepsToSpawn = require('creep.spawns')
  
spawnCreepIfNeeded = (creep) => {
    var creepsOfType = _.filter(Game.creeps, (gameCreep) => { return gameCreep.memory.role == creep.role });
    if(creepsOfType.length < creep.roleMinimum) {
        if(Game.spawns["MainSpawn"].spawnCreep(creep.body, creep.role + Game.time, {memory: creep.startingMemory}) == OK) {
            console.log("Spawning creep: " + creep.role)
        }
    }
}

getCreepsSortedByPrecedence= () => {
    return creepsToSpawn.sort(compare)
}

compare = (a,b) => {
    if (a.precedence > b.precedence)
      return 1;
    if (a.precedence < b.precedence)
      return -1;
    return 0;
}

removeDeadCreepsFromMemory = () => {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Creep ' + name + " died...");
        }
    }
}
 
module.exports = {
    run: function() {
        removeDeadCreepsFromMemory();
        
        let creeps = getCreepsSortedByPrecedence();
        for(let creep in creeps) {
            creep = creeps[creep];
            spawnCreepIfNeeded(creep)
        }
    }
};
