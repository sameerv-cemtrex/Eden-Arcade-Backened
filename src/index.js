const express = require("express");
const app = express();
const bodyParser1 = require("body-parser");
app.use(bodyParser1.json({ limit: "50mb" }));
app.use(bodyParser1.urlencoded({ limit: "50mb", extended: true }));
const userRouter = require("./routers/user.js");
const GunAttachmentRouter = require("./adminPanel/routes/GunAttachmentRouter");
const GunRouter = require("./adminPanel/routes/GunRouter");
const DroneRouter = require("./adminPanel/routes/DroneRouter.js");
const HumanGunTraitRouter = require("./adminPanel/routes/HumanGunTraitRouter.js");
const ItemRouter = require("./adminPanel/routes/ItemsRouter.js");
const TaskRouter = require("./adminPanel/routes/TaskRouter.js");
const TaskGiverRouter = require("./adminPanel/routes/TaskGiverRouter.js");
const LocationRouter = require("./adminPanel/routes/LocationRouter.js");
const NFTPrefabRouter = require("./adminPanel/routes/NFTPrefabRouter.js");
const DomeSalesRouter = require("./adminPanel/routes/DomeSaleRouter.js");
const TestRouter = require("./adminPanel/routes/TestRouter.js");
const CollectibleItemRouter = require("./adminPanel/routes/CollectableItemRouter.js");
const {
  getDomeSaleByDomeNo,
} = require("./adminPanel/controllers/DomeSalesController.js");
const response = require("./adminPanel/middlewares/response.js");
const DomeSaleItem = require("./adminPanel/models/DomeSaleItem.js");
//const adminRouter=require("./adminPanel/adminPanel.js")
var cors = require("cors");
const port = process.env.PORT || 5000;
var path = require("path");

const squadService = require("./sockets/spawning.service");

const {
  notFoundError,
  globalErrorHandler,
} = require("./adminPanel/middlewares/globalErrorHandler.js");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const optionsS = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Eden Game",
      version: "v1",
      description: "Eden Game Backend API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routers/*.js", "./src/adminPanel/*/*.js"],
};

const specs = swaggerJsDoc(optionsS);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use("/api/v1/admin-panel/gun-attachments", GunAttachmentRouter);
app.use("/api/v1/admin-panel/guns", GunRouter);
app.use("/api/v1/admin-panel/drones", DroneRouter);
app.use("/api/v1/admin-panel/human-gun-traits", HumanGunTraitRouter);
app.use("/api/v1/admin-panel/items", ItemRouter);
app.use("/api/v1/admin-panel/task-givers", TaskGiverRouter);
app.use("/api/v1/admin-panel/locations", LocationRouter);
app.use("/api/v1/admin-panel/tasks", TaskRouter);
app.use("/api/v1/admin-panel/dome-sales", DomeSalesRouter);
app.use("/api/v1/admin-panel/nft-prefabs", NFTPrefabRouter);
app.use(
  "/api/v1/dome-sales/:dome",
  response(DomeSaleItem),
  getDomeSaleByDomeNo
);
app.use("/api/v1/game/tests", TestRouter);
app.use("/api/v1/admin-panel/collectible-items", CollectibleItemRouter);

//app.use("/adminPanel",homeroute)

//error handler middlewares
// app.use(notFoundError);
app.use(globalErrorHandler);

var server2 = require("http").createServer(app);

// var https = require("https");
// var fs = require("fs");
// var options = {
//   key: fs.readFileSync(
//     "/etc/letsencrypt/live/eden-dev.cetxlabs.com-0002/privkey.pem"
//   ),
//   cert: fs.readFileSync(
//     "/etc/letsencrypt/live/eden-dev.cetxlabs.com-0002/fullchain.pem"
//   ),
//   ca: fs.readFileSync(
//     "/etc/letsencrypt/live/eden-dev.cetxlabs.com-0002/chain.pem"
//   ),
// };
// var server2 = https.createServer(options, app);

//TESTING IS SERVER RUNNING
const server = server2.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

///SOCKET CONNECTION
var sio = require("socket.io").listen(server2);
let socket_connect = require("./_helpers/socket");

socket_connect(sio);
module.exports.io = sio;
