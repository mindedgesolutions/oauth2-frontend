import { Users } from 'lucide-react';
import { FiTool } from 'react-icons/fi';

export const allMenu = () => {
  const adminMenu: MenuProps[] = [
    { title: 'users', icon: Users, url: '/admin/users' },
    { title: 'factories', icon: FiTool, url: '/admin/factories' },
  ];
  return { adminMenu };
};
