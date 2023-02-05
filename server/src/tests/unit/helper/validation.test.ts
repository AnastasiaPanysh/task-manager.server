import { isValidUserId, isValidUser, isValidEmail } from '../../../helper/validation';
import { Request, Response, NextFunction } from 'express';
import { ExceptionType } from '../../../helper/exceptions.type';

describe('isValidUserId functoin', () => {
  test('should return success', () => {
    const mRequest: Request = { params: { id: 1 } };
    const mResponse: Response = jest.fn();
    const mNext: NextFunction = jest.fn();

    isValidUserId(mRequest, mResponse, mNext);

    expect(mNext).toHaveBeenCalled();
  });

  test('should return exception:id is not exist', () => {
    const mRequest: Request = { params: { id: 1 } };
    const mResponse: Response = jest.fn();
    const mNext: NextFunction = jest.fn();

    try {
      isValidUserId(mRequest, mResponse, mNext);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.USER_ID_INVALID.message);
    }
  });
});

describe('isValidUser functoin', () => {
  test('should return success', () => {
    const mRequest: Request = { body: { name: 'nastya', surname: 'panysh' } };
    const mResponse: Response = jest.fn();
    const mNext: NextFunction = jest.fn();

    isValidUser(mRequest, mResponse, mNext);

    expect(mNext).toHaveBeenCalled();
  });

  test('should return exception:name is not exist', () => {
    const mRequest: Request = { body: { name: '', surname: 'test' } };
    const mResponse: Response = jest.fn();
    const mNext: NextFunction = jest.fn();

    try {
      isValidUser(mRequest, mResponse, mNext);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.USER_NAME_INVALID.message);
    }
  });

  test('should return exception:surname is not exist', () => {
    const mRequest: Request = { body: { name: 'test', surname: '' } };
    const mResponse: Response = jest.fn();
    const mNext: NextFunction = jest.fn();

    try {
      isValidUser(mRequest, mResponse, mNext);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.USER_SURNAME_INVALID.message);
    }
  });
});
describe('isValidEmail functoin', () => {
  test('should return success', () => {
    const mRequest: Request = { body: { email: 'test@gmail.com' } };
    const mResponse: Response = jest.fn();
    const mNext: NextFunction = jest.fn();

    isValidEmail(mRequest, mResponse, mNext);

    expect(mNext).toHaveBeenCalled();
  });

  test('should return exception:user with this email does not exist', () => {
    const mRequest: Request = { body: { email: 'nastya.panysh.com' } };
    const mResponse: Response = jest.fn();
    const mNext: NextFunction = jest.fn();

    try {
      isValidEmail(mRequest, mResponse, mNext);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.USER_EMAIL_INVALID.message);
    }
  });
});
