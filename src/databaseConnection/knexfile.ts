import {config} from 'dotenv';
import {Knex} from 'knex';
import knex_g from 'knex';

config();

// type keyTypes = 'development'|'production'|'staging'|'test'

interface knexDatabaseConnectionObjectType {
    [key:string]: Knex.Config
}

const connectToDatabase: knexDatabaseConnectionObjectType = {
    development: {
        client: 'mysql2',
        connection:{
            host: process.env.databaseHost,
            port: Number(process.env.databasePort),
            user: process.env.databaseUser,
            password: process.env.databasePassword,
            database: process.env.databaseDatabase,
        },
        migrations:{
            tableName: 'knex_migrations',
        },
    },
};

const environment: string = process.env.environment||'development';

const knex = knex_g(connectToDatabase[environment]);

// console.log(knex);

export default knex;
