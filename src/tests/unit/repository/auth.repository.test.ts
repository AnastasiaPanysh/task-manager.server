import { getUserByEmailDB, createUserDB } from '../../../repository/auth.repository';

const mClient = {
  query: jest.fn(),
};

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(() => mClient),
  };
  return { Pool: jest.fn(() => mPool) };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('getUserByEmailDB function', () => {
  test('should return success', async () => {
    const mockUsers = [{ id: 1, name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await getUserByEmailDB('nasy@gmail.com');

    expect(mClient.query).toHaveBeenCalled();
    expect(mClient.query).toHaveBeenCalledWith(`SELECT * FROM users WHERE email=$1`, ['nasy@gmail.com']);
    expect(expected).toEqual(mockUsers);
    expect(expected[0].email).toBe('nasy@gmail.com');
  });
});

describe('createUserDB function', () => {
  test('should return success', async () => {
    await createUserDB('nasy', 'nasy', 'nasy@gmail.com', 'qwert');

    expect(mClient.query).toBeCalledWith('COMMIT');
  });
});
