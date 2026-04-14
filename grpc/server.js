const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const pool = require("./db");

const packageDef = protoLoader.loadSync("user.proto");
const grpcObject = grpc.loadPackageDefinition(packageDef);

const userPackage = grpcObject;
async function getUser(call, callback) {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [call.request.id]
    );

    if (result.rows.length === 0) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "User not found",
      });
    }

    callback(null, result.rows[0]);
  } catch (err) {
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}
async function createUser(call, callback) {
  const { name, email } = call.request;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    callback(null, result.rows[0]);
  } catch (err) {
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

async function deleteUser(call, callback) {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [call.request.id]
    );

    if (result.rows.length === 0) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "User not found",
      });
    }

    callback(null, { message: "User deleted successfully" });
  } catch (err) {
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

async function getUsersStream(call) {
    const result = await pool.query("SELECT * FROM users");
    result.rows.forEach((user) => {
      call.write(user); 
    });

    call.end(); 
}

const server = new grpc.Server();

server.addService(userPackage.UserService.service, {
  GetUser: getUser,
  CreateUser: createUser,
  DeleteUser: deleteUser,
  GetUsersStream: getUsersStream,
});

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC Server running on port 50051");
    server.start();
  }
);