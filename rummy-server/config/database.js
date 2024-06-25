const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const dbFilePath = path.resolve("config", "db-config.json");
const dbOptFile = fs.readFileSync(dbFilePath);
const dbAllOptions = JSON.parse(dbOptFile);

const dbOptions = dbAllOptions.development;

const sequelize = new Sequelize(
    dbOptions.database,
    dbOptions.user,
    dbOptions.password,
    {
        dialect: dbOptions.dialect,
        host:dbOptions.host,
        pool: dbOptions.pool,
        logging: false
    },
);

module.exports = sequelize;
