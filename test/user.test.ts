import { server } from "../src/server";
import request from "supertest";

import { connectMongo, disconnectMongo } from "../src/utils/mongodbConnection";
let testServer: any;
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
	it("POST /getall", async () => {
		request(testServer).post("/user/getall").expect(200);
	});
});
