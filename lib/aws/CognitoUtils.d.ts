export interface UserData {
    getName(): string;
    getUsername(): string;
    getEmail(): string;
    isMemberOfAny(...groups: string[]): boolean;
    isMemberOfAll(...groups: string[]): boolean;
    getGroups(): string[];
}
export declare class CognitoUtils {
    static toUserData(authorizationHeaderValue: string): UserData;
}
