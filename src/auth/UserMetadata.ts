export interface UserMetadata {
  getName(): string;
  getUsername(): string;
  getEmail(): string;
  isMemberOfAny(...groups: string[]): boolean;
  isMemberOfAll(...groups: string[]): boolean;
  getGroups(): string[];
}
