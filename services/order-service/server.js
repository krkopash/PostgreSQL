const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const orderDef = protoLoader.loadSync(
  path.join(__dirname, "../proto/order.proto")
);
const orderPkg = grpc.loadPackageDefinition(orderDef).order;
const userDef = protoLoader.loadSync(
  path.join(__dirname, "../proto/user.proto")
);
const userPkg = grpc.loadPackageDefinition(userDef).user;

const userClient = new userPkg.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

function createOrder(call, callback) {
  const { user_id, product } = call.request;

  console.log("Order Request:", call.request);

  userClient.GetUser({ id: user_id }, (err, user) => {
    if (err) {
      console.log("User not found");
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "User not found",
      });
    }

    console.log("User:", user);
    console.log(`Order created for ${user.name}: ${product}`);

    callback(null, {
      message: `Order placed for ${user.name}`,
    });
  });
}

const server = new grpc.Server();

server.addService(orderPkg.OrderService.service, {
  CreateOrder: createOrder,
});

server.bindAsync(
  "0.0.0.0:50052",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("Order Service running on 50052");
  }
);