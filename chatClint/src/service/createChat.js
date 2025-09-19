import {v4 as uuid} from 'uuid'


export default function createChat(e, chats, setChat) {
    e.preventDefault()
    const chatId = uuid();
    setChat([...chats, chatId]);
    window.history.pushState(null, null, `/?chatId=${chatId}`);
}