class TaskRequester {
  constructor() {
    this.vacantEnergySpaceInRoom = 0;
    this.objectsToConstruct = [];
  }

  getRoomState() {
    this.vacantEnergySpaceInRoom = this.getTotalEnergyInRoom();
    this.objectsToConstruct = this.getObjectsToConstruct();
  }

  getTask(creep) {
    if(creep.memory.role == "builder" || creep.memory.role == "harvester") {
      if(this.vacantEnergySpaceInRoom != 0) {
        creep.memory.task = 'harvest'
      } else if (this.objectsToConstruct.length != 0) {
        creep.memory.task = 'build'
      } else {
        creep.memory.task = 'nothing'
      }
    }
  }

  getTotalEnergyInRoom() {
    let spawnEnergy = Game.spawns['MainSpawn'].energyCapacity - Game.spawns['MainSpawn'].energy;
    var extensions = Game.spawns['MainSpawn'].room.find(FIND_MY_STRUCTURES).filter((extension) => { return extension.structureType == STRUCTURE_EXTENSION });
    var vacantEnergyStorage = spawnEnergy;
    for(var extension in extensions) {
      extension = extensions[extension];
      vacantEnergyStorage += extension.energyCapacity - extension.energy;
    }
    return vacantEnergyStorage;
  }

  getObjectsToConstruct() {
    var targets = Game.spawns['MainSpawn'].room.find(FIND_CONSTRUCTION_SITES);
    return targets;
  }
}

module.exports = new TaskRequester();