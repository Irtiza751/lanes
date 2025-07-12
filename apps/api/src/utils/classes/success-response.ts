import { HttpException, HttpStatus } from '@nestjs/common';

export class SuccessResponse extends HttpException {
  constructor(data: string | Record<string, any>) {
    super(data, HttpStatus.OK);
  }
}
