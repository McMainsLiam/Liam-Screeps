var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleNothing = require('role.nothing')
var spawner = require('creep.spawner');
var taskRequester = require('task.requester');

module.exports.loop = function () {

    spawner.run();
    taskRequester.getRoomState();
    displaySpawningStatus();

    for(var name in Game.creeps) {
        let creep = Game.creeps[name];

        // every 5 seconds, reassign the creeps to do the most important task
        if (Game.time % 5 === 0) { 
            taskRequester.getTask(creep)
        }

        // And start the creep working
        assignTask(creep);
    }
}

assignTask = (creep) => {
    if(creep.memory.task == 'harvest') {
        roleHarvester.run(creep, taskRequester);
    }
    if(creep.memory.task == 'upgrade') {
        roleUpgrader.run(creep, taskRequester);
    }
    if(creep.memory.task == 'build') {
        roleBuilder.run(creep, taskRequester);
    }
    if(creep.memory.task == 'repair') {
        roleRepairer.run(creep, taskRequester);
    }
    if(creep.memory.task == 'nothing') {
        roleNothing.run(creep, taskRequester);
    }
}

displaySpawningStatus = () => {
    if(Game.spawns['MainSpawn'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['MainSpawn'].spawning.name];
        Game.spawns['MainSpawn'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['MainSpawn'].pos.x + 1,
            Game.spawns['MainSpawn'].pos.y,
            {align: 'left', opacity: 0.8});
    }
}