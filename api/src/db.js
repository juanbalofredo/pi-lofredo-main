require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`,
        { logging: false, native: false }
      );
const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let mayEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(mayEntries);

const { Country, Activity } = sequelize.models;

Country.belongsToMany(Activity, { through: "countryActivity" });
Activity.belongsToMany(Country, { through: "countryActivity" });

module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};

