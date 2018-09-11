import { HttpStatus } from '@nestjs/common';

export interface ErrorMessagesInterface {
  type: string;
  httpStatus: HttpStatus;
  errorMessage: string;
  userMessage: string;
}

export const errorMessages: { [code: string]: ErrorMessagesInterface } = {
  'user:create:missingInformation': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create a new user with missing information.',
    userMessage: 'Impossible de créer un utilisateur avec des données manquantes.',
  },
  'dir:create': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Can not create dir.',
    userMessage: 'Can not create dir.',
  },
};