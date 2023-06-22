import UserModel from "../models/user.models";
import TodoModel from "../models/todos.models";
import mongoose from "mongoose";
import { Request, Response } from "express";

export async function getAllTodoController(req: Request, res: Response){
    try {
        const userTodo = await UserModel.findById(req.params.id).populate("todos");
        if(!userTodo){
            return res.status(404).send({
                success: false,
                message: "Todos not found with this ID!"
            })
        }
        return res.status(200).send({
            success: true,
            message: "User Todos",
            userTodo
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            message: "Error in user  Todos!!",
            success: false,
            error
        })
    }
}
export async function CreateTodoController(req: Request, res: Response) {
  try {
    const { todo, status, user } = req.body;

    if (!todo || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields!",
      });
    }

    const existingUser = await UserModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newTodo: any = new TodoModel({ todo, status, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newTodo.save({ session });

    existingUser.todos.push(newTodo._id);
    await existingUser.save({ session });
    await session.commitTransaction();

    return res.status(201).send({
      success: true,
      message: "Created!",
      newTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Creating Todo",
      error,
    });
  }
}

// Delete a todo
export async function deleteTodo(req: Request, res: Response) {
  try {
    const todoId: string = req.params.id;

    const deletedTodo = await TodoModel.findByIdAndDelete(todoId).populate('user');

    if (deletedTodo && deletedTodo.user ) {
      const user: any = deletedTodo.user;
      user.todos.pull(deletedTodo);
      await user.save();
      
      return res.status(200).json({
        success: true,
        message: 'Todo deleted successfully',
        todo: deletedTodo,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Todo not found',
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Failed to delete todo',
      error
    });
  }
}

export const todoDone = async (req: Request, res: Response) => {
  try {
        const { id } = req.params;
        const { status  } = req.body;
        const todo = await TodoModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        return res.status(200).send({
            success: true,
            message: "Updated Successfully!",
            todo
        })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update todo',
      error,
    });
  }
};
export const updateTodo = async (req: Request, res: Response) => {
  try {
        const { id } = req.params;
        const { todo  } = req.body;
        const todos = await TodoModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        return res.status(200).send({
            success: true,
            message: "Updated Successfully!",
            todos
        })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create todo',
      error,
    });
  }
};