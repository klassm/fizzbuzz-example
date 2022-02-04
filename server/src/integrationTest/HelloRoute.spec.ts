import { useServer } from "./useServer";
import axios from "axios";

describe("/hello", () => {
  useServer();

  it('returns world', async () => {
    const response = await axios.get("/hello", { validateStatus: () => true });

    expect(response.status).toEqual(200);
    expect(response.data).toEqual({hello: 'world' })
  })
})
