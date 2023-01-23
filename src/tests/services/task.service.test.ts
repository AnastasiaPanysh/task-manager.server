import { createTask } from "../../services/task.service";
import * as repository from "../../repository/task.repository";
import { ExceptionType } from "../../helper/exceptions.type";

describe('createTask function', () => {

    test('test', async () => {
        const mock = jest.spyOn(repository, 'createTaskDB')

        mock.mockResolvedValue([{ id: 1, task: 'task', user_id: 1 }])

        const result = await createTask('task', 1)

        expect(mock).toHaveBeenCalled()
        expect(result[0].task).toBe('task')
        expect(result[0].user_id).toBe(1)
    })
    test('error', async () => {
        const mock = jest.spyOn(repository, 'createTaskDB')

        mock.mockResolvedValue([])
        try {
            await createTask('task', 1)

        } catch (error: any) {
            expect(mock).toHaveBeenCalled()
            expect(error.message).toBe(ExceptionType.POST_TASK_NOT_FOUND.message)
        }

    })

})
