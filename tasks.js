const { uuid } = require('uuidv4');

const tasks = [
  {
    id: uuid(),
    title: "Something",
    isComplete: true
  },
  {
    id: uuid(),
    title: "Something not so important",
    isComplete: false
  },
  {
    id: uuid(),
    title: "Something stupid",
    isComplete: false
  }
];

module.exports = tasks;