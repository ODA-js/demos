import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutation:getProfile:');

import { mutateAndGetPayload } from 'oda-api-graphql';
export const resolver = {
  getProfile: mutateAndGetPayload(
    async (
      args: {
      },
      context,
      info
    ) => {
      logger.trace('getProfile');
      let result: {
        // what must be in output
        role?: any; // string,
      };
      result = {};
      // put your code here
      return result;
    }
  ),
};
