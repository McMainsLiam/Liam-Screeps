findFlags = (creep) => {
  var flag = Game.flags['Scout'];
  creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}});
}

module.exports = {
  run(creep) {
    if(creep.memory.scouting) {
      findFlags(creep)
    }
  }
}