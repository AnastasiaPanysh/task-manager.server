import { getUsersDB, getUserByIdDB, updateUsersDB, deleteUserDB, patchUsersDB } from '../../repository/user.repository' 

const mClient = {
    query: jest.fn()
}

jest.mock('pg', () => {
    const mPool = {
        connect: jest.fn(() => mClient)
    }
    return { Pool: jest.fn(() => mPool) }
})

describe('getUsersDB', ()=>{
    test('should return success', async()=>{
        const mockUsers = [{ id: 1, name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }]

        mClient.query.mockResolvedValue({ rows: mockUsers })
        const expected = await getUsersDB()

        expect(expected).toEqual(mockUsers)
    })
})
