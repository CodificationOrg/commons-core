import * as JWT from 'jwt-decode';

export class CognitoUserData {
  private token: Object;

  constructor(jwtToken: string) {
    this.token = JWT(jwtToken);
  }

  public name(): string {
    return this.token['name'];
  }

  public username(): string {
    return this.token['cognito:username'];
  }

  public email(): string {
    return this.token['email'];
  }

  public isMember(group: string) {
    return this.groups().filter(g => g == group).length == 1;
  }

  public groups(): string[] {
    return this.token['cognito:groups'];
  }
}
