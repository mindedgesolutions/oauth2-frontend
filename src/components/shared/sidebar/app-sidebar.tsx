import { NavUser } from '@/components/shared/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import { titles } from '@/constants';
import { NavMain } from './nav-main';
import { allMenu } from '@/utils/menu';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { adminMenu: menus } = allMenu();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={`/`}>
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <FaScrewdriverWrench className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span
                    className="font-semibold text-base tracking-wider"
                    title={titles.appName}
                  >
                    {titles.appName.length > 15
                      ? titles.appName.slice(0, 15) + '...'
                      : titles.appName}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-2">
        <NavMain menus={menus} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <NavUser />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
