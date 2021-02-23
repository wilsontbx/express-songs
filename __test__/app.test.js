const request = require("supertest");
const app = require("../app");

describe("App", () => {
    it("GET / should respont with Hello World", async () => {
        const { text } = await request(app).get("/").expect(200);
        expect(text).toBe("Hello World");
    });

    it("POST / should throw error when seding non-json content", async () => {
        const { text } = await request(app)
            .post("/")
            .send({ name: "test" })
            .expect(201);

        expect(text).toBe("Thanks for the JSON!");
    });
});
