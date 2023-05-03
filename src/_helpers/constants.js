module.exports = Object.freeze({
  CREATESQUAD: "CREATESQUAD",
  SQUADJOIN: "SQUADJOIN",
  SQUADLEAVE: "SQUADLEAVE",
  READYFORGAME: "READYFORGAME",
  NOTREADYFORGAME: "NOTREADYFORGAME",
  STARTGAMENOW: "STARTGAMENOW",
  EVENTHAPPEN: "EVENTHAPPEN",
  SQUADREQUEST: "SQUADREQUEST",
  ONSQUADJOINED: "ONSQUADJOINED",
  EXTRACTED: "EXTRACTED",
  YOULOSTSINGLE: "YOULOSTSINGLE",
  ONSQUADSTART: "ONSQUADSTART",
  STARTGAME: "STARTGAME",
  SQUADSTARTTIME: "SQUADSTARTTIME",
  SQUADEND: "SQUADEND",
  ONSQUADLEAVE: "ONSQUADLEAVE",

  ADDUSERITEMINVENTORY: "ADDUSERITEMINVENTORY",
  SETLOADOUT: "SETLOADOUT",
  UPDATEINVENTORY: "UPDATEINVENTORY",
  UPDATEINSURANCE: "UPDATEINVENTORY",

  GETINVENTORY: "GETINVENTORY",
  ADDITEMINVENTORY: "ADDITEMINVENTORY",
  DELETEITEMINVENTORY: "DELETEITEMINVENTORY",

  JOINFRIENDSROOM: "JOINFRIENDSROOM",
  SENDCODEOFROOM: "SENDCODEOFROOM",

  UPDATEPOINTS: "UPDATEPOINTS",
  ADDEVENTDATA: "ADDEVENTDATA",
  ADDZONE: "ADDZONE",
  SETCURRENTMATCH: "SETCURRENTMATCH",
  GETHOUSESOFUSER: "GETHOUSESOFUSER",
  GETTOTALDOMES: "GETTOTALDOMES",
  GETDOMEBYNUMBER: "GETDOMEBYNUMBER",
  GETUNSOLDHOUSE: "GETUNSOLDHOUSE",
  BUYHOUSE: "BUYHOUSE",
  JOINDOME: "JOINDOME",
  SEEHOUSE: "SEEHOUSE",
  LEAVEDOME: "LEAVEDOME",
  REQUESTPASS: "REQUESTPASS",
  RECIEVEDPASS: "RECIEVEDPASS",
  RECIVEDPASSESLIST: "RECIVEDPASSESLIST",
  REQUESTPASSESLIST: "REQUESTPASSESLIST",
  USEPASS: "USEPASS",
  DECISIONPASS: "DECISIONPASS",
  ACCEPTCALLREQUEST: "ACCEPTCALLREQUEST",
  REJECTCALLREQUEST: "REJECTCALLREQUEST",
  SENDCALLREQUEST: "SENDCALLREQUEST",
  CUTCALL: "CUTCALL",
  SENDFRIENDREQUEST: "SENDFRIENDREQUEST",
  ACCEPTFRIENDREQUEST: "ACCEPTFRIENDREQUEST",
  UNFRIEND: "UNFRIEND",
  UPDATEPLAYERSTAT: "UPDATEPLAYERSTAT",
  REJECTFRIENDREQUEST: "REJECTFRIENDREQUEST",
  ADDLOOT: "ADDLOOT",
  REMOVELOOT: "REMOVELOOT",

  //TASK-SYSTEM
  ACCEPT_TASK: "ACCEPT_TASK",
  DISPLAY_TASK: "DISPLAY_TASK",
  MERGE_TASK_INVENTORY: "MERGE_TASK_INVENTORY",
  MY_ACTIVE_TASK: "MY_ACTIVE_TASK",
  TASKGIVER_DETAILS: "TASKGIVER_DETAILS",
  TASKS_BY_TASKGIVER : "TASKS_BY_TASKGIVER",

  // CRAFTING
  START_CRAFTING: "START_CRAFTING",
  FINISH_CRAFTING: "FINISH_CRAFTING",

  SENDZONE: "SENDZONE",
  DEPLOYLOOT: "DEPLOYLOOT",
  MAKEROOM: "MAKEROOM",
  STARTGAMEOFFRIEND: "STARTGAMEOFFRIEND",
  PLAYERADDEDMATCH: "PLAYERADDEDMATCH",
  ONMATCHENDED: "ONMATCHENDED",
  STARTGAMEOFFRIEND: "STARTGAMEOFFRIEND",
  DEPLOYLOOTANDDRONES: "DEPLOYLOOTANDDRONES",
  DESTROYNPC: "DESTROYNPC",

  FRIENDREQUESTACCEPTED: "FRIENDREQUESTACCEPTED",
  FRIENDREQUESTRECEIVED: "FRIENDREQUESTRECEIVED",
  FRIENDSTATUS: "FRIENDSTATUS",
  DOMESTATUS: "DOMESTATUS",
  CALLRESPONSE: "CALLRESPONSE",
  ONHOUSEBUY: "ONHOUSEBUY",
  CUTCALLRESPONSE: "CUTCALLRESPONSE",
  CALLREQUEST: "CALLREQUEST",

  //API response messages
  STATUS_CODE_OK: 200,
  SERVER_EXISTS: "Server Already Exists",
  STATUS_CODE_CREATED: 201,
  STATUS_CODE_NOT_FOUND: 404,
  STATUS_CODE_NO_CONTENT: 204,
  STATUS_CODE_BAD_REQUEST: 400,
  STATUS_CODE_MULTIPLE_CHOICES: 300,
  SERVER_CREATED: "Server Created Successfully.",

  USER_FETCHED: "User Fetched Successfully",
  USER_CREATED: "User registered successfully",
  USER_NOT_FOUND: "User Not Found.",
  SAME_USER: "Same User, Cannot proceed",
  ALREADY_FRIEND: "Already a friend",
  ALREADY_REQUEST_SENT: "Already a request has been sent",
  CAN_SEND_REQUEST: "Request can be send",

  DATA_FOUND: "Data Fetched Successfully",
  DATA_NOT_FOUND: "Data Not Found.",
  DATA_CREATED: "Record inserted successfully",
  DATA_UPDATED: "Data Updated Successfully",
  DATA_DELETED: "Data Deleted Successfully.",
  BAD_REQUEST: "Bad Request",

  USER_EXISTS: "User already Exists",
  PASSWORDS_NOT_MATCHED: "Password Not Matched",
  USERNAME_NOT_AVAILABLE: "User name not available",

  RAID_SURVIVED_EVENT: 2,
  DRONE_KILLED_EVENT: 4,
  KILLED_BY_PLAYER_EVENT: 1,
  KILLED_BY_DRONE_EVENT: 3,
  KILL_EVENT: 5,
  EXPLORATION_EVENT: 6,
  FETCH_EVENT: 7,
});
