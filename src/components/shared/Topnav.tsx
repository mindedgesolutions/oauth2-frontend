import { useAppSelector } from '@/hooks';
import { SidebarTrigger } from '../ui/sidebar';
import ProfileContainer from './ProfileContainer';

const Topnav = () => {
  const { currentUser } = useAppSelector((store) => store.common);

  return (
    <div className="bg-muted flex flex-row justify-between items-center relative">
      <SidebarTrigger />
      <section className="p-2 flex flex-row justify-end items-center gap-0 md:gap-2 pr-4 md:pr-4">
        <span className="hidden md:block text-xs tracking-wide text-muted-foreground font-medium">
          Welcome{' '}
          <span className="uppercase tracking-wider ml-1">
            {currentUser?.name ?? `Guest`}
          </span>
        </span>
        <ProfileContainer />
      </section>
    </div>
  );
};
export default Topnav;
