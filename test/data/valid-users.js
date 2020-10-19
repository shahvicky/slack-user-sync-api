'use strict'

const faker = require('faker')

function createValidUser() {
  return {
    "userid": faker.random.alphaNumeric(),
    "teamid": faker.random.alphaNumeric(),
    "firstName": faker.name.firstName(),
    "lastName": faker.name.lastName(),
    "email": faker.internet.email(),
    "image": faker.image.avatar(),
    "lastUpdated": Date.now(),
    "timeZone": "America/Los_Angeles"
  }
}

function getValidUser(num) {
  const validUsers = []
  if (Number.isInteger(num) && num > 0) {
    for (let i=1; i<=num; i++) {
      validUsers.push(createValidUser())
    }
    return validUsers
  }
  return createValidUser()
}

module.exports = {
  getValidUser
}
