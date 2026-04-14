const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const packageDef = protoLoader.loadSync(
  path.join(__dirname, "../proto/order.proto")
);

const grpcObject = grpc.loadPackageDefinition(packageDef);
const orderPackage = grpcObject.order;

const client = new orderPackage.OrderService(
  "localhost:50052",
  grpc.credentials.createInsecure()
);

client.CreateOrder(
  { user_id: 1, product: "mobile" },
  (err, response) => {
    if (err) {
      console.log("Error:", err.message);
      return;
    }

    console.log("Response:", response);
  }
);