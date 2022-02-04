import { beforeAll, afterAll, afterEach } from '@jest/globals';
import nock from 'nock';

export function useNock(): void {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
}
