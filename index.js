"use strict";
require("dotenv").config();

var express = require("express"); 
var app = express();
const mongoose = require("mongoose");

  var cors = require("cors");
//const mongoDB = require("./common/connection");
const responses = require("./common/response");
const Routes = require("./routes/indexRoute");
const PORT = 3003;

  const mongodb = async () => {
  await mongoose.connect(
    "mongodb+srv://madhurgarg87:ASrVmZWRZmmkQpYf@basiccurd.b0eurn3.mongodb.net/"
    ).then(console.log("Mongodb connected")).catch((err)=>{
       console.log(err)
    })

};
mongodb();

app.use(cors());
app.use(responses());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", Routes);

app.use("/", express.static(__dirname + "/public"));

app.use((req, res, next) => res.error(404, "NOT_FOUND"));

// Error handling
app.use((error, req, res, next) => {
  console.error(error);
  return res.error(400, error.message || error);
});


app.listen(PORT, ()=> { 
    console.log(`server is running on the port ${PORT}`)
})