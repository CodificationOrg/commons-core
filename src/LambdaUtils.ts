import { APIGatewayEvent } from 'aws-lambda';

import { CognitoUserData } from './CognitoUserData';

export class LambdaUtils {
  public static toCognitoUserData(event: APIGatewayEvent): CognitoUserData {
    return new CognitoUserData(this.findJWTToken(event));
  }

  public static findJWTToken(event: APIGatewayEvent): string {
    return event.headers['Authorization'];
  }
}
