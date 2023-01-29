import { getTasksDB, getTaskByIdDB, createTaskDB, updateTaskDB, deleteTaskDB, patchTaskDB } from '../../repository/task.repository';

const mClient = {
    query: jest.fn()
}

jest.mock('pg', () => {
    const mPool = {
        connect: jest.fn(() => mClient)
    }
    return { Pool: jest.fn(() => mPool) }
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('getTasksDB function', () => {
    test('should return success', async () => {
        const mockTasks = [{ id: 1, task: 'task', user_id: 1 }]

        mClient.query.mockResolvedValue({ rows: mockTasks })
        const expected = await getTasksDB()

        expect(expected).toEqual(mockTasks)
    })
})

describe('getTaskByIdDB function', () => {
    test('should return success', async () => {
        const mockTask = [{ id: 1, task: 'task', user_id: 1 }]

        mClient.query.mockResolvedValue({ rows: mockTask })
        const expected = await getTaskByIdDB(1)

        expect(expected).toEqual(mockTask)
    })
})

describe('createTaskDB function', () => {
    test('should return success', async () => {
        const mockTask = [{ id: 1, task: 'task', user_id: 1 }]

        mClient.query.mockResolvedValue({ rows: mockTask })
        const expected = await createTaskDB('task', 1)

        expect(mClient.query).toBeCalledWith('COMMIT')
        expect(expected).toEqual(mockTask)
    })
})

describe('updateTaskDB function', () => {
    test('should return success', async () => {
        const mockTask = [{ id: 1, task: 'task', user_id: 1 }]

        mClient.query.mockResolvedValue({ rows: mockTask })
        const expected = await updateTaskDB(1, 'task', 1)

        expect(mClient.query).toBeCalledWith('COMMIT')
        expect(expected).toEqual(mockTask)
    })
})

describe('deleteTaskDB function', () => {
    test('should return success', async () => {
        const mockTask = [{ id: 1, task: 'task', user_id: 1 }]

        mClient.query.mockResolvedValue({ rows: mockTask })
        const expected = await deleteTaskDB(1)

        expect(mClient.query).toBeCalledWith('COMMIT')
        expect(expected).toEqual(mockTask)
    })
})

describe('patchTaskDB function', () => {
    test('should return success', async () => {
        const mockTask = [{ id: 1, task: 'task', user_id: 1 }]

        mClient.query.mockResolvedValue({ rows: mockTask })
        const expected = await patchTaskDB(1, { task: 'task' })

        expect(mClient.query).toBeCalledWith('COMMIT')
        expect(expected).toEqual(mockTask)
    })
})
