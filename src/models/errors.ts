export class InternalServerError extends Error {
  constructor(message?: string) {
    super(`Internal Server Error. ${message}`);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(`Unauthorized. ${message}`);
  }
}

export class BadRequest extends Error {
  constructor(message?: string) {
    super(message);
  }
}
