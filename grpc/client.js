const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDef = protoLoader.loadSync("user.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);

const client = new grpcObject.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.GetUser({ id: 2}, (err, response) => {
  if (err) {
    return console.error(err);
  }

  console.log("User:", response);
});

client.CreateUser(
  { name: "New User",email:"new@gmail.com" },
  (err, res) => {
    console.log("Created:", res);
  }
);
client.DeleteUser({ id: 1 }, (err, res) => {
  console.log(res);
});const stream = client.GetUsersStream({});

stream.on("data", (user) => {
  console.log("User:", user);
});

stream.on("end", () => {
  console.log("Stream ended");
});