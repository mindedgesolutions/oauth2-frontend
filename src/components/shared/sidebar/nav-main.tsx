import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';

export function NavMain({ menus }: { menus: MenuProps[] }) {
  const { isMobile } = useSidebar();
  const { pathname } = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menus.map((item) => (
          <DropdownMenu key={item.title}>
            <SidebarMenuItem>
              <DropdownMenuTrigger asChild>
                <Link to={`${item.url ?? `#`}`}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground capitalize text-sm cursor-pointer font-light active:font-normal"
                  >
                    <item.icon className="size-4 opacity-70 mr-1" />
                    <span className="text-xs font-medium tracking-wider">
                      {item.title}
                    </span>
                    {item.children && <MoreHorizontal className="ml-auto" />}
                  </SidebarMenuButton>
                </Link>
              </DropdownMenuTrigger>
              {item.children?.length ? (
                <DropdownMenuContent
                  side={isMobile ? 'bottom' : 'right'}
                  align={isMobile ? 'end' : 'start'}
                  className="min-w-56 rounded-sm"
                >
                  {item.children.map((item) => (
                    <DropdownMenuItem
                      asChild
                      key={item.title}
                      className="capitalize cursor-pointer text-xs font-medium tracking-wider"
                    >
                      <Link to={item.url}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              ) : null}
            </SidebarMenuItem>
          </DropdownMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
