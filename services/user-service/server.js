const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const packageDef = protoLoader.loadSync(
  path.join(__dirname, "../proto/user.proto")
);

const grpcObject = grpc.loadPackageDefinition(packageDef);
const userPackage = grpcObject.user;

const users = [
  { id: 1, name: "Krishna", email: "krishna@test.com" },
];

function getUser(call, callback) {
  console.log("Requested ID:", call.request.id);

  const user = users.find(u => u.id === call.request.id);

  if (!user) {
    console.log("user NOT FOUND");
    return callback({
      code: grpc.status.NOT_FOUND,
      message: "User not found",
    });
  }

  console.log("User FOUND:", user);
  callback(null, user);
}

const server = new grpc.Server();

server.addService(userPackage.UserService.service, {
  GetUser: getUser,
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("User Service running on 50051");
  }
);