import { HttpException, HttpStatus } from "@nestjs/common";
import { createError } from "services/error.service";

export class HttpError extends HttpException {
  public constructor(
    text: string,
    status: HttpStatus
  ) {
    super(createError(text, null), status);
  }

  public static hash() {
    return new HttpException(createError("Hash parse error", null), HttpStatus.FORBIDDEN);
  }

  public static create(text: string, status: HttpStatus) {
    return new HttpException(createError(text, null), status);
  }
}

export default HttpError;
