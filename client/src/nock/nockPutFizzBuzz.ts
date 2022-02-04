import nock from "nock";

export const nockPutFizzBuzz = (value: number) => {
  nock("http://localhost").put("/fizzBuzz", { value }).reply(200);
}
