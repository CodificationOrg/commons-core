import * as JWT from 'jwt-decode';

import { UserMetadata } from '../auth/UserMetadata';

export class CognitoUtils {
  public static toUserMetadata(authorizationHeader: string): UserMetadata {
    return new CognitoUserMetadata(authorizationHeader);
  }
}

class CognitoUserMetadata implements UserMetadata {
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
