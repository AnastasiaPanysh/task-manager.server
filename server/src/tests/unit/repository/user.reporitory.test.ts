import { getUsersDB, getUserByIdDB, updateUsersDB, deleteUserDB, patchUsersDB } from '../../../repository/user.repository';

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

describe('getUsersDB function', () => {
  test('should return success', async () => {
    const mockUsers = [{ id: 1, name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await getUsersDB();

    expect(expected).toEqual(mockUsers);
  });
});

describe('getUserByIdDB', () => {
  test('should return succes', async () => {
    const mockUsers = [{ id: 1, name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await getUserByIdDB(1);

    expect(expected).toEqual(mockUsers);
  });
});

describe('updateUsersDB', () => {
  test('should return success', async () => {
    const mockUsers = [{ id: 1, name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await updateUsersDB(1, 'nasy', 'nasy', 'qwert', 'nasy@gmail.com', 1);

    expect(mClient.query).toBeCalledWith('COMMIT');
    expect(expected).toEqual(mockUsers);
  });
});

describe('deleteUserDB', () => {
  test('should return success', async () => {
    const mockUsers = [{ id: 1, name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await deleteUserDB(1);

    expect(mClient.query).toBeCalledWith('COMMIT');
    expect(expected).toEqual(mockUsers);
  });
});

describe('patchUsersDB', () => {
  test('should return success', async () => {
    const mockUsers = [{ id: 1, name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await patchUsersDB(1, { name: 'nasy' });

    expect(mClient.query).toBeCalledWith('COMMIT');
    expect(expected).toEqual(mockUsers);
  });
});
