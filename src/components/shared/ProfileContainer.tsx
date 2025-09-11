import { unsetCurrentUser } from '@/features/common.slice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import profileImg from '@/assets/images/profile.jpg';
import { Lock, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const ProfileContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((store) => store.common);

  const logout = async () => {
    try {
      await customFetch.post(`/auth/logout`);

      showSuccess('Logged out successfully');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      dispatch(unsetCurrentUser());
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-0 -mt-2 hidden md:block">
        <Button type="button" variant="ghost" className="focus:outline-none">
          <img src={profileImg} alt="user" className="w-6 h-6 rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1 w-52">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={profileImg} alt={currentUser?.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{currentUser?.name}</span>
              <span className="truncate text-xs">{currentUser?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={`/account/settings`}>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="h-4 w-4 text-muted-foreground/80 mr-1" />
              <span className="text-sm font-normal text-card-foreground/80">
                Account settings
              </span>
            </DropdownMenuItem>
          </Link>
          <Link to={`/account/change-password`}>
            <DropdownMenuItem className="cursor-pointer">
              <Lock className="h-4 w-4 text-muted-foreground/80 mr-1" />
              <span className="text-sm font-normal text-card-foreground/80">
                Change password
              </span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          <LogOut className="h-4 w-4 text-muted-foreground/80 mr-1" />
          <span className="text-sm font-normal text-card-foreground/80">
            Log out
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileContainer;
