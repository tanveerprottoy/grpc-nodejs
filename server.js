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

const users = [];

function createUser(
    call,
    callback
) {
    const request = call.request;
    const user = {
        id: users.length + 1,
        name: request.name
    };
    users.push(user);
    callback(
        null,
        user
    );
}

function readUsers(
    call,
    callback
) {
    callback(
        null,
        {
            users: users
        }
    );
}

function readUsers(
    call,
    callback
) {
    callback(
        null,
        {
            users: users
        }
    );
}

function readUserStream(
    call,
    callback
) {
    users.forEach(
        u => call.write(u)
    );
    call.end();
}

const server = new grpc.Server();
server.addService(
    userPackage.UserService.service,
    {
        "createUser": createUser,
        "readUsers": readUsers,
        "readUserStream": readUserStream,
    }
);
server.bindAsync(
    "0.0.0.0:5000",
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log("grpc server starting...");
        server.start();
    }
);
