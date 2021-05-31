import server from "./server";
import http from "http";
import environment from "./config/environment";

const port = environment.PORT;
const app = http.createServer(server);
import "reflect-metadata";

app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});
