findFlags = (creep) => {
  var flag = Game.flags['Scout'];
  console.log(flag)
  creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}});
}

module.exports = {
  run(creep) {
    console.log("running")
    if(creep.memory.scouting) {
      findFlags(creep)
    }
  }
}