const { uuid } = require('uuidv4');

const tasks = [
  {
    id: uuid(),
    title: "something game",
    isComplete: true
  },
  {
    id: uuid(),
    title: "something not so important",
    isComplete: false
  },
  {
    id: uuid(),
    title: "something stupid",
    isComplete: false
  },
  {
    id: uuid(),
    title: "dayum son stupid",
    isComplete: false
  },
  {
    id: uuid(),
    title: "bruh son stupid",
    isComplete: true
  }
];

module.exports = tasks;