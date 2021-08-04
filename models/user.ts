import { Optional } from "sequelize";

const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index');

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  username: string;

}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes{
  public id!: number;
  public email!: string;
  public password!: string;
  public username!: string;
}

User.init( {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(50),
  },
  password: {
    type: DataTypes.STRING(100)
    // allowNull defaults to true
  },
  username: {
    type: DataTypes.STRING(50),
    unique: true,
  }
}, {
  // Other model options go here
  tableName: 'user',
  timestamps: false,
  sequelize
});

module.exports = User;