moveOutOfTheWay = (creep) => {
  var sources = creep.room.find(FIND_FLAGS);
  creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
}

module.exports = {
  run: function(creep, taskRequester) {
    moveOutOfTheWay(creep)
    taskRequester.getTask(creep)
  }
}