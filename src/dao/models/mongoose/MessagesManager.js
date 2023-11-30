import { messagesModel } from "../../../config/database/mongoose/models/message.js";

class MessagesManager{


async getMessages() {
    try {
        const messages = await messagesModel.find();
        return messages;
    } catch (error) {
        return error;
    }
}

async createOne(message) {
    try {
        console.log('entro al create message');
        const newMessage = await messagesModel.create(message);

        return newMessage;
    } catch (error) {
        return error;
    }
}
}

export const messagesManager = new MessagesManager();
