const students = require('./task3_students.js');

const extractNames = studentArr => studentArr.map(
  ({ name }) => name,
);

console.log(extractNames(students));
