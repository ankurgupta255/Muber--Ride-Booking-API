const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

const Driver = mongoose.model("driver");

describe("Drivers Controller", () => {
  it("Post to /api/drivers creates a new driver", (done) => {
    Driver.count().then((count) => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end(() => {
          Driver.count().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });
  it("PUT to /api/dirversid edits an existing driver", (done) => {
    const driver = new Driver({ email: "t@t.com", driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then((driver) => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it("DELETE an existing driver", (done) => {
    const driver = new Driver({ email: "t@t.com", driving: false });
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .send()
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then((driver) => {
            assert(driver === null);
            done();
          });
        });
    });
  });

  it("Get to /api/drivers find drivers locations", (done) => {
    const janakpuri = new Driver({
      email: "janakpuri@test.com",
      geometry: { type: "Point", coordinates: [28.618, 77.038] },
    });
    const miami = new Driver({
      email: "miami@test.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] },
    });
    Promise.all([janakpuri.save(), miami.save()]).then(() => {
      request(app)
        .get("/api/drivers?lng=-80&lat=25")
        .end((err, response) => {
          console.log(response.body[0].obj);
          assert(response.body.length === 1);
          assert(response.body[0].obj.email === "miami@test.com");
          done();
        });
    });
  });
});
