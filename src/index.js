const express = require("express");
const app = express();
const path = require("path");
const bodyParser1 = require("body-parser");
app.use(bodyParser1.json({ limit: "50mb" }));
app.use(bodyParser1.urlencoded({ limit: "50mb", extended: true }));
const userRouter = require("./routers/user.js");




   var https = require('https');

   var fs = require('fs');

  /* var options = {
  key: fs.readFileSync('/etc/letsencrypt/live/eden-dev.cetxlabs.com-0002/privkey.pem'),
 cert: fs.readFileSync('/etc/letsencrypt/live/eden-dev.cetxlabs.com-0002/fullchain.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/eden-dev.cetxlabs.com-0002/chain.pem')

}  
var server2 = https.createServer(options,app);    */     
 
var server2 = require("http").createServer(app);
var sio = require("socket.io").listen(server2); // it was require('socket.io')(server);

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(userRouter);


const server = server2.listen(port, () => {
  
  console.log(`Server is running on port ${port}`);
});




///SOCKET
let socket_connect = require("./_helpers/socket");

socket_connect(sio);

module.exports.io = sio;


