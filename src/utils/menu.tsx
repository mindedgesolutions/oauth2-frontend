import { MessageCircleMore, Users } from 'lucide-react';
import { FiTool } from 'react-icons/fi';

export const allMenu = () => {
  const adminMenu: MenuProps[] = [
    { title: 'users', icon: Users, url: '/admin/users' },
    { title: 'factories', icon: FiTool, url: '/admin/factories' },
    { title: 'chat', icon: MessageCircleMore, url: '/admin/chat' },
  ];
  return { adminMenu };
};
