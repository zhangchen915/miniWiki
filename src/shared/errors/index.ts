import { errorMessages, ErrorMessagesInterface } from './error.message';

export class ErrorMessage extends Error {
  public messageCode: string;
  public httpStatus: number;
  public errorMessage: string;

  constructor(messageCode: string) {
    super();

    const errorMessageConfig = this.getMessageFromMessageCode(messageCode);
    if (!errorMessageConfig) throw new Error('Unable to find message code error.');

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.httpStatus = errorMessageConfig.httpStatus;
    this.messageCode = messageCode;
    this.errorMessage = errorMessageConfig.errorMessage;
    this.message = errorMessageConfig.userMessage;
  }

  private getMessageFromMessageCode(code: string): ErrorMessagesInterface {
    if (!errorMessages[code]) throw new Error('Unable to find the given message code error.');
    return errorMessages[code];
  }
}