import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const NotificationSchema = new Schema({
    taskId: { required: true, type: Schema.Types.ObjectId, ref: "todo"},
    isNotifiedUser: { default: false, type: Boolean}
});
export default model('Notification', NotificationSchema);
