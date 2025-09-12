import customFetch from '@/utils/customFetch';
import { useEffect, useState } from 'react';

const ChatMessages = ({ userId }: { userId: number }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await customFetch.get(`/messages/${userId}`);
      if (response.status === 200) {
        setMessages(response.data.data);
      }
    };
    getMessages();
  }, [userId]);

  return <div>{messages.map((message) => message.content)}</div>;
};
export default ChatMessages;
