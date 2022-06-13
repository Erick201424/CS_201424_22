import { getData } from "./db.js";
import Sequelize from "sequelize";

const User = getData.sequelizeClient.define(
  "cat_users",
  {
    id: { type: Sequelize.SMALLINT, primaryKey: true, autoIncremen: true },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    phone_number: Sequelize.STRING,
    createdAt: false,
    updateAt: false,
  },
  {

  }
);

export const getUser = User;