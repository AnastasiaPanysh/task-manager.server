import { createUser, doAuthorization } from '../../services/auth.service';
import * as repository from '../../repository/auth.repository';
import { ExceptionType } from '../../helper/exceptions.type';
import bcrypt from 'bcrypt';


describe('createUser function', () => {

    test('should return success', async () => {
        const mockGet = jest.spyOn(repository, 'getUserByEmailDB')
        const mockCreate = jest.spyOn(repository, 'createUserDB')
        const mockBcrS = jest.spyOn(bcrypt, 'genSaltSync')
        const mockHash = jest.spyOn(bcrypt, 'hashSync')

        mockGet.mockResolvedValue([])
        mockCreate.mockResolvedValue()
        mockBcrS.mockResolvedValue('$2b$10$ZUcp6qOe71mzr3pf2kEkn.')
        mockHash.mockResolvedValue('$2b$10$ZUcp6qOe71mzr3pf2kEkn./utHvVMUCmTK17Ma3upSJQYc2fUFonC')

        await createUser('nasy', 'nasy', 'nasy@gmail.com', 'qwert')
    })

    test('should return exception', async () => {
        const mockGet = jest.spyOn(repository, 'getUserByEmailDB')

        mockGet.mockResolvedValue([{ id: 1, name: '1', surname: '1', email: '1', pwd: '1', status: 1 }])

        try {
            await createUser('nasy', 'nasy', 'nasy@gmail.com', 'qwert')
        } catch (error) {
            expect(mockGet).toHaveBeenCalled()
        }
    })
})

describe('doAuthorization function', () => {
    test('should return success', async () => {
        const mockGet = jest.spyOn(repository, 'getUserByEmailDB')
        const mockCompare = jest.spyOn(bcrypt, 'compare')

        mockGet.mockResolvedValue([{ name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com' }])
        mockCompare.mockResolvedValue(true)

        await doAuthorization('qwert', 'nasy@gmail.com')

        expect(mockGet).toBeCalled()
    })

    test('should return exception', async () => {
        const mockGet = jest.spyOn(repository, 'getUserByEmailDB')
        const mockCompare = jest.spyOn(bcrypt, 'compare')

        mockGet.mockResolvedValue([])
        mockCompare.mockResolvedValue(true)

        try {
            await doAuthorization('qwert', 'nasy@gmail.com')
        } catch (error: any) {
            expect(error.message).toBe(ExceptionType.AUTH_USER_WITH_EMAIL.message)
        }
    })

    test('should return exception', async () => {
        const mockGet = jest.spyOn(repository, 'getUserByEmailDB')
        const mockCompare = jest.spyOn(bcrypt, 'compare')

        mockGet.mockResolvedValue([{ name: 'nasy', surname: 'nasy', pwd: 'qwert', email: 'nasy@gmail.com' }])
        mockCompare.mockResolvedValue(false)

        try {
            await doAuthorization('qwert', 'nasy@gmail.com')
        } catch (error: any) {
            expect(error.message).toBe(ExceptionType.AUTH_USER_WITH_PWD.message)
        }
    })
})