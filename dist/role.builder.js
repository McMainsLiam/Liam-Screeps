moveOutOfTheWay = (creep) => {
    var sources = creep.room.find(FIND_FLAGS);
    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
}

harvestMinerals = (creep) => {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}

buildNearestObject = (creep) => {
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if(targets.length) {
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
}

thereAreConstructionSitesAvailable = (creep) => {
    let constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
    return constructionSites.length != 0
}

var roleBuilder = {
    run: function(creep, taskRequester) {

        if(creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        if(!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        
        if(thereAreConstructionSitesAvailable(creep)) {
            if(creep.memory.working) {
                buildNearestObject(creep);
            } 
            else {
                harvestMinerals(creep);
            }
        } else {
            if(creep.memory.working) {
                taskRequester.getTask(creep);
            } else {
                if(creep.carry.energy < creep.carryCapacity) {
                    harvestMinerals(creep);
                }
                else {
                    taskRequester.getTask(creep);
                }
            }
        }
    }
};

module.exports = roleBuilder;