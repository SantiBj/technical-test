import { Options } from '@sequelize/core';

export const config: Options = {
    dialect: "sqlite",
    storage:'./database.db',
    logging: false
};

