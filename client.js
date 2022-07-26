const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync(
    "user.proto",
    {}
);
const grpcObj = grpc.loadPackageDefinition(
    packageDef
);
const userPackage = grpcObj.userPackage;

const client = new userPackage.UserService(
    "0.0.0.0:5000",
    grpc.credentials.createInsecure()
);

client.createUser(
    {
        id: 1,
        name: "name",
    },
    (err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log("response: ", response);
    }
);

client.createUser(
    {
        id: 1,
        name: "name",
    },
    (err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log("createUser response: ", response);
    }
);

client.readUsers(
    null,
    (err, response) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log("readUsers response: ", response);
    }
);

const call = client.readUserStream();
call.on(
    "data",
    datum => {
        console.log("readUserStream: ", datum);
    }
);
call.on(
    "end",
    () => {
        console.log("readUserStream end");
    }
);
call.on(
    "error",
    err => {
        console.error("readUserStream error: ", err);
    }
);