import echo from '@/echo';
import customFetch from '@/utils/customFetch';
import { useEffect, useState } from 'react';

const ChatMessages = ({
  authUserId,
  receiver,
}: {
  authUserId: number;
  receiver: number;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const response = await customFetch.get(`/messages/${receiver}`);
      if (response.status === 200) {
        setMessages(response.data.data);
      }
    };
    getMessages();
  }, [receiver]);

  useEffect(() => {
    const channel = echo.private(`chat.${authUserId}`);

    channel.listen('.MessageSent', (event: { message: Message }) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === event.message.id)) return prev;
        return [...prev, event.message];
      });
    });

    return () => {
      echo.leave(`chat.${authUserId}`);
    };
  }, [authUserId]);

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>
          <b>{m.sender_id !== authUserId ? 'Them' : 'You'}:</b> {m.content}
        </div>
      ))}
    </div>
  );
};
export default ChatMessages;
