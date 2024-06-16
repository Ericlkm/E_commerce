const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection.js");

// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`\x1b[36m App listening on port ${PORT}\x1b[0m`);
  });
});
