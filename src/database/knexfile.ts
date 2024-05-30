import {Knex} from 'knex';
import { ENV } from '../config/conf';

interface knexDatabaseConnectionObjectType {
    [key:string]: Knex.Config,
}

const connectToDatabase: knexDatabaseConnectionObjectType = {
    development: {
        client: 'mysql2',
        connection:{
            host: ENV.DatabaseHost,
            port: Number(ENV.DatabasePort),
            user: ENV.DatabaseUser,
            password: ENV.DatabasePassword,
            database: ENV.DatabaseDatabase,
        },
        migrations:{
            tableName: 'knex_migrations',
        },
    },
};

console.log(connectToDatabase)

export default connectToDatabase;