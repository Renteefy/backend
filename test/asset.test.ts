import { server } from "../src/server";
import supertest from "supertest";

let testServer: any;
const request = supertest(server);

const vals = { token: "", email: "tester2@gmail.com", assetID: "2IpFIb-hZhYC9PoETSJvE", new_assetID: "" };
describe("app test", () => {
	beforeAll(async () => {
		const res = await request.post("/user/userLogin").send({ email: vals["email"] });
		expect(res.statusCode).toBe(200);
		vals["token"] = res.body["token"];
	});
	it("GET /asset/getAllAssets", async (done) => {
		const res = await request.get("/asset/getAllAssets").set({ Authorization: "Bearer " + vals["token"] });
		expect(res.statusCode).toBe(200);
		done();
	});
	it("GET /asset/getAsset/2IpFIb-hZhYC9PoETSJvE", async (done) => {
		const res = await request.get("/asset/getAsset/2IpFIb-hZhYC9PoETSJvE").set({ Authorization: "Bearer " + vals["token"] });
		expect(res.statusCode).toBe(200);
		done();
	});
	it("GET /asset/getSome", async (done) => {
		const res = await request
			.get("/asset/getSome")
			.set({ Authorization: "Bearer " + vals["token"] })
			.send({ arr: ["5xyTv_I_0i8_p72HYWRis", "9Oz-WFMcvXxOpdK1Mlu4u"] });
		expect(res.statusCode).toBe(200);
		done();
	});
	it("POST /asset/addAsset", async (done) => {
		const res = await request
			.post("/asset/addAsset")
			.set({ Authorization: "Bearer " + vals["token"] })
			.send({ title: "testAsset", category: "testing", description: "literally a test bro", price: "69", interval: "hhehe" });
		expect(res.statusCode).toBe(200);
		vals["new_assetID"] = res.body["assetID"];
		// console.log("ramu");
		// console.log(res);
		// console.log("ramu");
		done();
	});
	it("PATCH /asset/updateAsset", async (done) => {
		const res = await request
			.patch(`/asset/updateAsset/${vals["new_assetID"]}`)
			.set({ Authorization: "Bearer " + vals["token"] })
			.send({ changes: { title: "newTest" } });
		expect(res.statusCode).toBe(200);
		done();
	});
	it("DELETE /asset/deleteAsset", async (done) => {
		const res = await request.get(`/asset/deleteAsset/${vals["new_assetID"]}`).set({ Authorization: "Bearer " + vals["token"] });
		expect(res.statusCode).toBe(200);
		done();
	});
});
