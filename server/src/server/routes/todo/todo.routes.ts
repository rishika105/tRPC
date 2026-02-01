import { publicProcedure, router } from "../../trpc.js";
import { z } from "zod"
import { getAllTodosOutModal, todoModel, type Todo } from "./model.js";

//mock data
const TODOS: Todo[] = [{ id: '1', isCompleted: false, title: 'Coding', description: "learing how to build prod apis with contracts using trpc for type safety and to connect with openai spec for contract driven developement" }]

//no input here now just give all todos with type in .output 
//and all todos in query
//localhost: 8000 / trpc / todos.getAllTodos
export const todoRouter = router({

    createTodo: publicProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/create-todo',
                tags: ['Todo'],
                description: "Creates a new todo"
            }
        })
        .input(z.object({ title: z.string() }))
        .output(z.object({ todo: todoModel }))
        .mutation(({ input }) => {
            TODOS.push({ id: '2', isCompleted: false, title: input.title })
            return {
                todo: { id: '2', isCompleted: false, title: input.title }
            }
        }),

    getAllTodos: publicProcedure
        //add contract
        .meta({
            openapi: {
                method: 'GET',
                path: "/todos",
                tags: ['Todo'],
                description: 'Returns all the todos'
            }
        })
        .input(z.undefined())
        .output(getAllTodosOutModal)
        .query(() => {
            return { todos: TODOS }
        })
})

// we need to accept input from the client.tRPC lets you define input parsers 
// to validate and parse the input.You can define your own input parser or use a validation library of your choice, like zod, yup, or superstruct.

