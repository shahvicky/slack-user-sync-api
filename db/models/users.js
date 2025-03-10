'use strict'

const {DataTypes} = require('sequelize')
const {connection: sequelize} = require('./../connection.js')

const Users = sequelize.define('User', {
  userid: {
    type: DataTypes.STRING
  , primaryKey: true
  , field: 'user_id'
  }
, teamid: {
    type: DataTypes.STRING
  , primaryKey: true
  , field: 'team_id'
  }
, firstName: {
    type: DataTypes.STRING(60)
  , field: 'first_name'
  }
, lastName: {
    type: DataTypes.STRING(60)
  , field: 'last_name'
  }
, email: {
    type: DataTypes.STRING(100)
  , allowNull: false
  , unique: true
  , validate: {
      isEmail: true
    }
  , field: 'email'
  }
, image: {
    type: DataTypes.STRING
  , field: 'image'
  }
, isDeleted: {
    type: DataTypes.BOOLEAN
  , allowNull: false
  , defaultValue: false
  , field: 'is_deleted'
  }
, isOwner: {
    type: DataTypes.BOOLEAN
  , allowNull: false
  , defaultValue: false
  , field: 'is_owner'
  }
, isAdmin: {
    type: DataTypes.BOOLEAN
  , allowNull: false
  , defaultValue: false
  , field: 'is_admin'
  }
, isBot: {
    type: DataTypes.BOOLEAN
  , allowNull: false
  , defaultValue: false
  , field: 'is_bot'
  }
, lastUpdated: {
    type: DataTypes.DATE
  , field: 'last_updated'
  }
, timeZone: {
    type: DataTypes.STRING
  , field: 'time_zone'
  }
}, {
  tableName: 'users'
})

module.exports = Users
