import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TodoSchema = new Schema({
    description  : {type : String, require: [true,"you must add description"]},
    deadline  : {type : Date, require: [true,"you must add valid date"]},
    createdAt: { type: Date, default: Date.now, required: true},
    status: { type: Boolean, default: false}
});

export default model("todo", TodoSchema);
