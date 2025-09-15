import echo from '@/echo';
import { useAppSelector } from '@/hooks';
import customFetch from '@/utils/customFetch';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatMessages = ({ receiver }: { receiver: number }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { currentUser } = useAppSelector((store) => store.common);
  const authUserId = currentUser!.id;

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
    <ScrollArea className="h-[450px]">
      <div className="flex flex-col gap-2 p-2 relative">
        {messages.map((m) => {
          return Number(authUserId) === Number(m.sender_id) ? (
            <div key={m.id} className="flex justify-end">
              <div className="flex flex-col gap-1 max-w-2/3 p-2 rounded-sm bg-sky-muted/50 text-sm">
                <span>{m.content}</span>
                <span className="text-[11px] text-muted-foreground text-end">
                  {dayjs(m.created_at).format('DD/MM/YYYY HH:mm A')}
                </span>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex">
              <div className="flex flex-col max-w-2/3 p-2 rounded-sm bg-warning-muted/50 text-sm">
                <span>{m.content}</span>
                <span className="text-[11px] text-muted-foreground text-end">
                  {dayjs(m.created_at).format('DD/MM/YYYY HH:mm A')}
                </span>
              </div>
            </div>
          );
        })}
        {/* <div className="">AA</div> */}
      </div>
    </ScrollArea>
  );
};
export default ChatMessages;
