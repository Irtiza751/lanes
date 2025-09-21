export interface JwtPayload {
  /**
   * @description user's uuid v4
   */
  sub: string;
  /**
   * @description logged in user email
   */
  email: string;
  /**
   * @description logged in user name
   */
  name: string;
}
