import { BodyWrapper, ChatMessages } from '@/components';
import { ScrollArea } from '@/components/ui/scroll-area';
import { setChatUsers } from '@/features/common.slice';
import { useAppSelector } from '@/hooks';
import type { RootState } from '@/store';
import customFetch from '@/utils/customFetch';
import type { Store } from '@reduxjs/toolkit';
import profileImg from '@/assets/images/profile.jpg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import showError from '@/utils/showError';

const Chat = () => {
  const { currentUser, chatUsers } = useAppSelector((store) => store.common);
  const authUserId = currentUser!.id;
  const [message, setMessage] = useState<any>('');
  const [receiver, setReceiver] = useState<UserProps | null>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === '') return;
    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = {
      ...data,
      sender_id: String(authUserId),
      receiver_id: String(receiver!.id),
    };

    try {
      const response = await customFetch.post(`/messages/send`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201 || response.status === 200) {
        setMessage('');
        msgRef.current?.focus();
      }
    } catch (error) {
      Object.entries((error as any)?.response?.data?.errors).forEach(
        ([__, value]) => {
          showError(value as string);
        }
      );
    }
  };

  return (
    <BodyWrapper>
      <div className="flex p-2 gap-2 justify-start items-center h-[600px] max-h-screen overflow-hidden">
        <div className="">
          <ScrollArea className="h-[600px] w-full overflow-hidden">
            {chatUsers &&
              chatUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex flex-row justify-between items-center gap-4 p-2 px-4 ${
                    user.id === receiver?.id
                      ? 'bg-sky-muted/80 hover:bg-none'
                      : 'bg-muted hover:bg-muted-foreground/15'
                  } rounded-sm my-0.5 group cursor-pointer`}
                  onClick={() => setReceiver(user)}
                >
                  <div className="flex gap-3 items-center">
                    <Avatar className="h-6 w-6 rounded-full">
                      <AvatarImage src={profileImg} alt={`user`} />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <p
                      className={`text-xs ${
                        user.id === receiver?.id
                          ? 'text-card-foreground font-medium'
                          : 'text-muted-foreground font-normal'
                      } group-hover:text-card-foreground`}
                    >
                      {user.name}
                    </p>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                </div>
              ))}
          </ScrollArea>
        </div>
        {receiver && (
          <div className="w-2xl h-[600px] flex flex-col gap-2">
            <div className="h-full w-full p-2 bg-muted/50">
              <div className="flex flex-row justify-start items-center gap-3 p-2 bg-sky-muted/50">
                <span>
                  <Avatar className="h-6 w-6 rounded-full">
                    <AvatarImage src={profileImg} alt={`user`} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                </span>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-foreground">
                  {receiver.name}
                </p>
              </div>
              <ChatMessages receiver={receiver.id} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="relative h-[100px]">
                <Textarea
                  name="message"
                  className="h-[100px] rounded-none resize-none"
                  placeholder="Type here ..."
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  ref={msgRef}
                />
                <div className="absolute top-0 right-0 h-full p-1.5">
                  <Button type="submit" className="h-full rounded-none">
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
        <div className=""></div>
      </div>
    </BodyWrapper>
  );
};
export default Chat;

// ----------------------------

export const loader = (store: Store<RootState>) => async () => {
  const { chatUsers } = store.getState().common;

  if (chatUsers.length === 0) {
    try {
      const response = await customFetch.get(`/users`);
      if (response.status === 200) {
        store.dispatch(setChatUsers(response.data.data));
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
};
