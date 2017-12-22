import { APIGatewayEvent } from 'aws-lambda';
import { CognitoUtils } from './CognitoUtils';
import { UserMetadata } from '../auth/UserMetadata';

export class LambdaUtils {
  public static toCognitoUserData(event: APIGatewayEvent): UserMetadata {
    return CognitoUtils.toUserMetadata(event.headers['Authorization']);
  }

  public static corsHeaders(
    origin: string,
    headers: string = 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    methods: string = 'POST,OPTIONS,GET,PUT,PATCH,DELETE'
  ) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': headers,
      'Access-Control-Allow-Methods': methods
    };
  }
}
