export declare class CognitoUserData {
    private token;
    constructor(jwtToken: string);
    name(): string;
    username(): string;
    email(): string;
    isMember(group: string): boolean;
    groups(): string[];
}
