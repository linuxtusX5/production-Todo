import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema({
    todo: {
        type: String,
        require: [true, 'todo is required!']
    },
    status: {
        type: String,
        require: [true, 'status is required!']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, 'user ID is required!']
    }
}, {timestamps: true})

const TodoModel = mongoose.model("Todo", TodoSchema)

export default TodoModel;