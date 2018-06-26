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

mainSpawnIsAtFullCapacity = () => {
    return Game.spawns['MainSpawn'].energy == Game.spawns['MainSpawn'].energyCapacity
}

getNonFullExtensionsByCreep = (creep) => {
    var extensions = creep.room.find(FIND_MY_STRUCTURES);
    return extensions.filter((extension) => { return extension.energy != 50 && extension.structureType == STRUCTURE_EXTENSION })
}

moveAndDepositEnergy = (creep, structure) => {
    if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
    } 
}

getNumberOfHarvesters = () => {
    return _.filter(Game.creeps, (gameCreep) => { return gameCreep.memory.task == "harvest" }).length;
}

const MINIMUM_NUMBER_OF_HARVESTERS = 1;

var roleHarvester = {
    run: function(creep, taskRequester) {
        if(creep.carry.energy < creep.carryCapacity) {
            harvestMinerals(creep)
        }
        else {
            // if the spawn is full, fill the extensions
            if(mainSpawnIsAtFullCapacity()) {
                let extensions = getNonFullExtensionsByCreep(creep)
                if(extensions.length) {
                    moveAndDepositEnergy(creep, extensions[0])
                } else {
                    taskRequester.getTask(creep);
                }
            } 
            // if the spawn is not full, fill the spawns first
            else {
                let depositStructure = Game.spawns['MainSpawn'];
                moveAndDepositEnergy(creep, depositStructure);
            }
        }
    }
};

module.exports = roleHarvester;