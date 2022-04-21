import { Dialect } from 'sequelize/types';

export const config = {
    port: process.env.PORT,
    database: {
        dialect: 'postgres' as Dialect,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        logging: false,
    },
};