import * as JWT from 'jwt-decode';

export interface UserData {
  getName(): string;
  getUsername(): string;
  getEmail(): string;
  isMemberOfAny(...groups: string[]): boolean;
  isMemberOfAll(...groups: string[]): boolean;
  getGroups(): string[];
}

export class CognitoUtils {
  public static toUserData(authorizationHeaderValue: string): UserData {
    return new CognitoUserData(authorizationHeaderValue);
  }
}

class CognitoUserData implements UserData {
  private token: Object;

  constructor(jwtToken: string) {
    this.token = JWT(jwtToken);
  }

  public getName(): string {
    return this.token['name'];
  }

  public getUsername(): string {
    return this.token['cognito:username'];
  }

  public getEmail(): string {
    return this.token['email'];
  }

  public isMemberOfAny(...groups: string[]): boolean {
    return this.toFilteredGroups(...groups).length > 0;
  }

  public isMemberOfAll(...groups: string[]): boolean {
    return this.toFilteredGroups(...groups).length == groups.length;
  }

  private toFilteredGroups(...groups: string[]): string[] {
    return this.getGroups().filter(g => groups.indexOf(g) > -1);
  }

  public getGroups(): string[] {
    return this.token['cognito:groups'];
  }
}
