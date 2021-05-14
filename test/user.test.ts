import { server } from "../src/server";
import supertest from "supertest";

import { connectMongo, disconnectMongo } from "../src/utils/mongodbConnection";
let testServer: any;
const request = supertest(server);
describe("app test", () => {
  beforeAll(() => {
    testServer = server.listen(3000);
    connectMongo();
  });
  afterAll(async (done) => {
    testServer.close();
    await disconnectMongo();
    done();
  });
  it("POST /getall", async (done) => {
    const res = await request.get("/");
    expect(res.statusCode).toBe(100);
    done();
  });
});
