import { handleError } from '../../../helper/handleError';
import { ExceptionType } from '../../../helper/exceptions.type';
import { Response } from 'express';

describe('handleError function', () => {
  test('return success', () => {
    const mResponse: Response = {
      status: jest.fn(),
      send: jest.fn(),
    };

    handleError(mResponse, 404, ExceptionType.GET_TASK_NOT_FOUND.message);

    expect(mResponse.status).toHaveBeenCalled();
    expect(mResponse.send).toHaveBeenCalled();
    expect(mResponse.status).toHaveBeenCalledWith(404);
    expect(mResponse.send).toHaveBeenCalledWith(ExceptionType.GET_TASK_NOT_FOUND.message);
  });
});
