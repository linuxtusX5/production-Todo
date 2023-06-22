import express from 'express';
import users from './user.route';
import todos from './todo.route';

const router  = express.Router();

export default (): express.Router => {
    todos(router);
    users(router);
    return router;
}