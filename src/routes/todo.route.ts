import express from "express";
import { CreateTodoController, deleteTodo, getAllTodoController, todoDone, updateTodo } from "../controllers/todo.controller";

export default (router: express.Router) => {

router.get('/all-todo/:id', getAllTodoController);

router.post('/create-todo', CreateTodoController);

router.delete('/remove-todo/:id', deleteTodo)

router.put('/done/:id', todoDone);
router.put('/update-todo/:id', updateTodo);

// router.delete('/delete-blog/:id', deleteBlogController);

// router.get('/user-blog/:id', UserBlogsController);
}