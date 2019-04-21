const students = require('./task3_students.js');

// Count array by pre-defined gender.
const countByGender = (studentArr, gen) => studentArr.filter(
  student => student.gender === gen,
).length;

const countMale = countByGender(students, 'male');
const countFemale = countByGender(students, 'female');

console.log(`There are ${countMale} males.`);
console.log(`There are ${countFemale} females.`);
