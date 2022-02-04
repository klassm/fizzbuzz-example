import { useServer } from "./useServer";
import axios from "axios";

const axiosOptions = { validateStatus: () => true };

describe("/fizzBuzz", () => {
  useServer();

  it('can save and get the state', async () => {
    const value = 1337;
    const putResponse = await axios.put("/fizzBuzz", { value }, axiosOptions);
    expect(putResponse.status).toEqual(200);

    const getResponse = await axios.get("/fizzBuzz", axiosOptions);
    expect(getResponse.status).toEqual(200);
    expect(getResponse.data).toEqual({ value });
  });

  it('returns a counter of 1  if getting a value that is not yet present', async () => {
    const getResponse = await axios.get("/fizzBuzz", axiosOptions);
    expect(getResponse.status).toEqual(200);
    expect(getResponse.data).toEqual({ value: 1 });
  });

  it('returns a 400 if putting a wrong structure', async () => {
    const response = await axios.put("/fizzBuzz", {bla: 'blub'}, axiosOptions);
    expect(response.status).toEqual(400);
  });
})
