import { beforeEach, afterEach } from '@jest/globals';
import { Application } from "../Application";
import { Routes } from "../Routes";

export function useServer() {
  let application: Application | undefined;

  beforeEach(async () => {
    if (application !== undefined) {
      throw new Error("We should not have a running application.")
    }
    application = new Application(new Routes())
    await application.start();
  })

  afterEach(async () => {
    await application?.stop();
    application = undefined;
  })
}
