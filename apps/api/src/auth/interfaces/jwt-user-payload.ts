export interface JwtUserPayload {
  /**
   * @description
   * user id
   */
  sub: number;
  /**
   * @description
   * user email address
   */
  email: string;
}
