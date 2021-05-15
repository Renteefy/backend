import { server } from "../src/server";
import supertest from "supertest";

import { connectMongo, disconnectMongo } from "../src/utils/mongodbConnection";
let testServer: any;
const request = supertest(server);
const vals = { token: "", email: "tester2@gmail.com" };
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
	it("GET /user/getAll", async (done) => {
		const res = await request.get("/user/getAll");
		expect(res.statusCode).toBe(200);
		done();
	});
	it("POST /user/checkUser present email", async (done) => {
		const res = await request.post("/user/checkUser").send({ email: "tester2@gmail.com" });
		expect(res.statusCode).toBe(400);
		done();
	});
	it("POST /user/checkUser empty email", async (done) => {
		const res = await request.post("/user/checkUser").send({ email: "" });
		expect(res.statusCode).toBe(401);
		done();
	});
	it("POST /user/checkUser new email", async (done) => {
		const res = await request.post("/user/checkUser").send({ email: "tester420@gmail.com" });
		expect(res.statusCode).toBe(200);
		done();
	});
	it("POST /user/userLogin present email", async (done) => {
		const res = await request.post("/user/userLogin").send({ email: vals["email"] });
		expect(res.statusCode).toBe(200);
		vals["token"] = res.body["token"];
		done();
	});
	it("POST /user/userLogin empty email", async (done) => {
		const res = await request.post("/user/userLogin").send({ email: "" });
		expect(res.statusCode).toBe(401);
		done();
	});
	it("POST /user/userLogin new email", async (done) => {
		const res = await request.post("/user/userLogin").send({ email: "dhinchak@pooja.com" });
		expect(res.statusCode).toBe(400);
		done();
	});
	it("GET /user/userInfo", async (done) => {
		const res = await request.get("/user/getUserInfo").set({ Authorization: "Bearer " + vals["token"] });
		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty("message", "Success 😁");
		done();
	});
	it("GET /user/userInfo incorrect token", async (done) => {
		const res = await request.get("/user/getUserInfo").set({ Authorization: "Bearer " + vals["token"] + "x" });
		expect(res.statusCode).toBe(401);
		done();
	});
});
