import { getUsers, getUserById, updateUsers, deleteUser, patchUsers } from '../../services/user.service';
import * as repository from '../../repository/user.repository';
import { ExceptionType } from '../../helper/exceptions.type';

describe('getUsers function', () => {
    test('should return success', async () => {
        const mock = jest.spyOn(repository, 'getUsersDB')

        mock.mockResolvedValue([{ id: 1, name: 'nasy', surname: 'test', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }])

        await getUsers()

        expect(mock).toHaveBeenCalled()
    })

    test('should return exception', async () => {
        const mock = jest.spyOn(repository, 'getUsersDB')

        mock.mockResolvedValue([])
        try {
            await getUsers()

        } catch (error: any) {
            expect(mock).toHaveBeenCalled()
            expect(error.message).toBe(ExceptionType.GET_USERS_NOT_FOUND.message)
        }
    })

})

describe('getUserById function', () => {
    test('should return success', async () => {
        const mock = jest.spyOn(repository, 'getUserByIdDB')

        mock.mockResolvedValue([{ id: 1, name: 'nasy', surname: 'test', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }])

        await getUserById(1)

        expect(mock).toHaveBeenCalled()
    })

    test('should return exception', async () => {
        const mock = jest.spyOn(repository, 'getUserByIdDB')

        mock.mockResolvedValue([])
        try {
            await getUserById(1)

        } catch (error: any) {
            expect(mock).toHaveBeenCalled()
            expect(error.message).toBe(ExceptionType.GET_USER_NOT_FOUND.message)
        }
    })
})

describe('updateUsers function', () => {
    test('should return success', async () => {
        const mock = jest.spyOn(repository, 'updateUsersDB')

        mock.mockResolvedValue([{ id: 1, name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }])

        const result = await updateUsers(1, 'test', 'test', 'trewq', 'nasy@gmail.com', 1)

        expect(mock).toHaveBeenCalled()
        expect(result[0].id).toBe(1)
        expect(result[0].name).toBe('nasy')
        expect(result[0].surname).toBe('nasy')
        expect(result[0].pwd).toBe('qwert')
        expect(result[0].email).toBe('nasy@gmail.com')
        expect(result[0].status).toBe(1)

    })

    test('should return exception', async () => {
        const mock = jest.spyOn(repository, 'updateUsersDB')

        mock.mockResolvedValue([])
        try {
            await updateUsers(1, 'test', 'test', 'trewq', 'nasy@gmail.com', 1)

        } catch (error: any) {
            expect(mock).toHaveBeenCalled()
            expect(error.message).toBe(ExceptionType.PUT_USER_NOT_FOUND.message)
        }
    })
})

describe('deleteUser function', () => {
    test('should return success', async () => {
        const mock = jest.spyOn(repository, 'deleteUserDB')

        mock.mockResolvedValue([{ id: 1 }])

        await deleteUser(1)

        expect(mock).toHaveBeenCalled()
    })

    test('should return exception', async () => {
        const mock = jest.spyOn(repository, 'deleteUserDB')

        mock.mockResolvedValue([])
        try {
            await deleteUser(1)

        } catch (error: any) {
            expect(mock).toHaveBeenCalled()
            expect(error.message).toBe(ExceptionType.DELETE_USER_NOT_FOUND.message)
        }
    })
})

describe('patchUsers function', () => {
    test('should return success', async () => {
        const mock = jest.spyOn(repository, 'patchUsersDB')

        mock.mockResolvedValue([{ id: 1, name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com', status: 1 }])

        const result = await patchUsers(1, { name: 'test' })

        expect(mock).toHaveBeenCalled()
        expect(result[0].name).toBe('nasy')

    })

    test('should return exception', async () => {
        const mock = jest.spyOn(repository, 'deleteUserDB')

        mock.mockResolvedValue([])
        try {
            await patchUsers(1, { name: 'test' })

        } catch (error: any) {
            expect(mock).toHaveBeenCalled()
            expect(error.message).toBe(ExceptionType.PATCH_USER_NOT_FOUND.message)
        }
    })
})
