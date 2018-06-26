let creepsToSpawn = [
    {
      role: "harvester",
      numberToSpawn: 3,
      body: [
        MOVE,
        MOVE,
        CARRY,
        CARRY,
        WORK,
        WORK
      ],
      precedence: 8,
      startingMemory: {
          role: "harvester",
          task: "harvest"
      } 
    },
    {
      role: "builder",
      numberToSpawn: 3,
      body: [
        MOVE,
        MOVE,
        CARRY,
        CARRY,
        WORK,
        WORK
      ],
      precedence: 10,
      startingMemory: {
        role: "builder",
        task: "build",
        building: false
      }
    },
    {
        role: "upgrader",
        numberToSpawn: 1,
        body: [
          MOVE,
          MOVE,
          CARRY,
          CARRY,
          WORK,
          WORK
        ],
        precedence: 9,
        startingMemory: {
          role: "upgrader",
          task: "upgrade",
          upgrading: false
        }
      },
      {
        role: "repairer",
        numberToSpawn: 2,
        body: [
          MOVE,
          MOVE,
          CARRY,
          CARRY,
          WORK,
          WORK
        ],
        precedence: 9,
        startingMemory: {
          role: "repairer",
          task: "repair",
          repairing: false
        }
      }    
  ];

  
spawnCreepIfNeeded = (creep) => {
    var creepsOfType = _.filter(Game.creeps, (gameCreep) => { return gameCreep.memory.role == creep.role });
    if(creepsOfType.length < creep.numberToSpawn) {
        console.log("Spawning: " + creep.role)
        Game.spawns["MainSpawn"].spawnCreep(creep.body, creep.role + Game.time, {memory: creep.startingMemory})
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
