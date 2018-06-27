harvestMinerals = (creep) => {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

moveOutOfTheWay = (creep) => {
    var sources = creep.room.find(FIND_FLAGS);
    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
}  

getRoads = (creep) => {
    var structures = creep.room.find(FIND_STRUCTURES);
    return structures.filter((structure) => { return structure.structureType == STRUCTURE_ROAD })
}

compare = (a,b) => {
    if (a.hits > b.hits)
      return 1;
    if (a.hits < b.hits)
      return -1;
    return 0;
}

module.exports = {
    run: function(creep) {
        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        if(creep.memory.working) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });
            
            targets.sort((a,b) => a.hits - b.hits);
            
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            } else {
                if(creep.carry.energy < creep.carryCapacity) {
                    harvestMinerals(creep)
                } else {
                    moveOutOfTheWay(creep)
                }
            }
        }
        else {
            harvestMinerals(creep)
        }
    }
}