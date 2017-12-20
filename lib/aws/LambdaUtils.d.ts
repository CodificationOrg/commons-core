import { APIGatewayEvent } from 'aws-lambda';
import { CognitoUserData } from './CognitoUserData';
export declare class LambdaUtils {
    static toCognitoUserData(event: APIGatewayEvent): CognitoUserData;
    static findJWTToken(event: APIGatewayEvent): string;
}
