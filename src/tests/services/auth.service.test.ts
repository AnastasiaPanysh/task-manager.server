import { createUser, doAuthorization } from '../../services/auth.service';
import * as repository from '../../repository/auth.repository';
import { ExceptionType } from '../../helper/exceptions.type';

describe('createUser function', () => {

    test('should return success', async () => {
        const mock = jest.spyOn(repository, 'createUserDB')

        mock.mockResolvedValue()

        const result = await createUser('nasy','nasy', 'nasy@gmail.com','qwert')

        expect(mock).toHaveBeenCalled()
        expect(result[0].id).toBe(1)
        expect(result[0].name).toBe('nasy')
        expect(result[0].surname).toBe('surname')
    })


})
