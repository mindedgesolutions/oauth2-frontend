import { Footer, Topnav } from '@/components';
import { AppSidebar } from '@/components/shared/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { setCurrentUser } from '@/features/common.slice';
import type { RootState } from '@/store';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import type { Store } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const unauthenticated = () => {
    showError(`You need to log in to access this page`);
    navigate(`/`);
  };

  const unauthorized = () => {
    showError(`You do not have permission to access this page`);
    navigate(`/forbidden`);
  };

  useEffect(() => {
    window.addEventListener('unauthenticated', unauthenticated);
    window.addEventListener('unauthorized', unauthorized);

    return () => {
      window.removeEventListener('unauthenticated', unauthenticated);
      window.removeEventListener('unauthorized', unauthorized);
    };
  }, [pathname]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Topnav />
          <Outlet />
          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};
export default Layout;

// ------------------------------

export const loader = (store: Store<RootState>) => async () => {
  try {
    const response = await customFetch(`/auth/me`);
    store.dispatch(setCurrentUser(response.data.data));
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
