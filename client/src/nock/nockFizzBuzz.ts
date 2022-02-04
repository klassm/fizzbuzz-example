import nock from "nock";

export const nockFizzBuzz = (value: number) => {
  nock("http://localhost").get("/fizzBuzz").reply(200, { value });
}
