import { todoRouter } from "./routes/todo/todo.routes.js";
import { router } from "./trpc.js";

//root router
//added todo router -> that has a procedure -> queries all todos
//all type safe 
//we can query using trpc client if there is some frontend or something...
//but we are doing spec for development and making contracts
//those contracts might be used for frontend devs if they see the openai spec contract
//here openai spec is used for making standard contracts format made by open ai 
//trpc simplify that by connecting open ai spec to trpc and to server using a third party library trpc-open-ai
export const appRouter = router({
    todos: todoRouter
})

// Export type router type signature,
// NOT the router itself.
//client can use it
export type AppRouter = typeof appRouter;


