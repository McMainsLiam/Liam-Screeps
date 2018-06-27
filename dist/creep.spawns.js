module.exports = [
  {
    role: "harvester",
    roleMinimum: 3,
    taskMinimum: 0,
    body: [MOVE, MOVE, CARRY, CARRY, WORK, WORK],
    precedence: 8,
    startingMemory: {
      role: "harvester",
      task: "harvest"
    }
  },
  {
    role: "builder",
    roleMinimum: 3,
    taskMinimum: 0,
    body: [MOVE, MOVE, CARRY, CARRY, WORK, WORK],
    precedence: 10,
    startingMemory: {
      role: "builder",
      task: "build",
      working: false
    }
  },
  {
    role: "upgrader",
    roleMinimum: 1,
    taskMinimum: 1,
    body: [MOVE, MOVE, CARRY, CARRY, WORK, WORK],
    precedence: 9,
    startingMemory: {
      role: "upgrader",
      task: "upgrade",
      working: false
    }
  },
  {
    role: "repairer",
    roleMinimum: 2,
    taskMinimum: 1,
    body: [MOVE, MOVE, CARRY, CARRY, WORK, WORK],
    precedence: 9,
    startingMemory: {
      role: "repairer",
      task: "repair",
      working: false
    }
  },
  {
    role: "scouter",
    roleMinimum: 0,
    taskMinimum: 1,
    body: [MOVE, MOVE, MOVE, MOVE],
    precedence: 15,
    startingMemory: {
      role: "scouter",
      task: "scout",
      scouting: false
    }
  }
];
