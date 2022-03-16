const mongoose = require("mongoose")
const app = require("./app")
const port = process.env.PORT || 3977
const { API_VERSION, PORT_DB, IP_SERVER } = require("./config")

mongoose.connect(
  'mongodb+srv://test-weplot:test-weplot@test-weplot-db.kno5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      console.log("err", err)
      throw err;
    } else {
      console.log("conexion correcta");
      app.listen(port, () => {
        console.log("##################");
        console.log("#### API REST ####");
        console.log("##################");
        console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
      });
    }
  }
);