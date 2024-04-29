import { SequelizeConnection, SequelizeModelManager } from "itrm-tools";
import { DataTypes } from "@sequelize/core";
import { config } from "./definitions";

export interface UserType {
  userId?: number;
  email: string;
  password: string;
}

const connection = new SequelizeConnection(config);

export const User = new SequelizeModelManager<UserType>({
  name: "User",
  attributes: {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
});

async function createTable() {
  try {
    await connection.connect();
    await User.define(connection);
    await User.sync()
    console.log("modelos creados");

  } catch (error) {
    console.error("Ocurrio un error", error);
  }
}
createTable();
