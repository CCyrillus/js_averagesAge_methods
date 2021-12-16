'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */

function calculateAverageAge(userList) {
  return +(userList.reduce((firstUser, currentUser) =>
    firstUser + currentUser.died - currentUser.born, 0)
    / (userList.length));
}

function calculateMenAverageAge(people, century) {
  const filteredUsers = century === undefined
    ? people.filter(user => user.sex === 'm')
    : people.filter(user => user.sex === 'm'
      && century === Math.ceil(user.died / 100));

  return calculateAverageAge(filteredUsers);
};

function calculateWomenAverageAge(people, withChildren = false) {
  const filteredUsers = withChildren
    ? people.filter(user => user.sex === 'f'
      && people.find(child => user.name === child.mother))
    : people.filter(user => user.sex === 'f');

  return calculateAverageAge(filteredUsers);
}

function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let childrenList = onlyWithSon
    ? people.filter(user => user.sex === 'm' && user.mother !== null)
    : people.filter(user => user.mother !== null);

  childrenList = childrenList.filter(child =>
    people.find(user => user.name === child.mother));

  const difArr = childrenList.map(child =>
    child.born - people.find(user => user.name === child.mother).born);

  return difArr.reduce((firstValue, secondValue) =>
    firstValue + secondValue, 0) / difArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
