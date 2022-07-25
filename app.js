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

function createUser(
    call,
    callback
) {
    console.log(call);
}

function readUsers(
    call,
    callback
) {
    console.log(call);
}

const server = new grpc.Server();
server.bind(
    "0.0.0.0:50000",
    grpc.ServerCredentials.createInsecure()
);
server.addService(
    userPackage.UserService.service,
    {
        "createUser": createUser,
        "readUsers": readUsers
    }
);
server.start();
