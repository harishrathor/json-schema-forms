import "./paths";

import http from "http";
import Handler from "@coreModule/classes/request-handler";

const PORT = process.env.port || 5000;
/* 
import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;
console.log("Number of cpus:", numCPUs);
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
 */
  http
    .createServer((req, res) => {
      Handler.handle(req, res);
    })
    .listen(PORT, err => {
      if (err) {
        console.log("Error in running web server.", err);
      } else {
        console.log(`Web Server running at port ${PORT}.`);
      }
    });
/* 
  console.log(`Worker ${process.pid} started`);
} */

