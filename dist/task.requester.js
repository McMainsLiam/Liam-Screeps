var creepsToSpawn = require('creep.spawns')

class TaskRequester {
  constructor() {
    this.vacantEnergySpaceInRoom = 0;
    this.objectsToConstruct = [];
    this.objectsToRepair = [];
  }

  // if the new task is different from the old one, check if the current number of workers for that task is above the minimum:
  // if it is, then you can assign the next task,
  // otherwise, keep it on it's own task

  getMinimumForTask(task) {
    for(var creepType in creepsToSpawn) {
      creepType = creepsToSpawn[creepType];
      if(creepType.startingMemory.task == task) {
        return creepType.taskMinimum;
      }
    }
  }

  getRoomState() {
    this.vacantEnergySpaceInRoom = this.getTotalEnergyInRoom();
    this.objectsToConstruct = this.getObjectsToConstruct();
    this.objectsToRepair = this.getObjectsToRepair();
  }

  getCreepsByTask(task) {
    return _.filter(Game.creeps, { memory: { task: task }});
  }

  assignNewTask(creep, task) {
    // if the creep is being assigned a new task
    if(creep.memory.task != task) {
      // check if the current number of creeps doing the current task is greater than the minimum number of workers required for the current task
      if(this.getCreepsByTask(creep.memory.task).length > this.getMinimumForTask(creep.memory.task)) {
        // if it is greater, than the worker can safely change tasks
        creep.memory.task = task
      }
    }
  }

  getTask(creep) {
    if(this.vacantEnergySpaceInRoom != 0) {
      this.assignNewTask(creep, 'harvest')
    } else if (this.objectsToConstruct.length > 0) {
      this.assignNewTask(creep, 'build')
    } else if (this.objectsToRepair.length > 0) {
      this.assignNewTask(creep, 'repair')
    } else {
      this.assignNewTask(creep, 'upgrade')
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

  getObjectsToRepair() {
    const targets = Game.spawns['MainSpawn'].room.find(FIND_STRUCTURES, {
      filter: object => object.hits < object.hitsMax
    });
  
    return targets.sort((a,b) => a.hits - b.hits);
  }
}

module.exports = new TaskRequester();