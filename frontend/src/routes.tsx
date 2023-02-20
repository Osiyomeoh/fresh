import { Fragment, useContext, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavigationProvider } from './providers/navigation-provider';
import { SlashAuthLoadedWrapper } from './common/components/slashauth-loader-wrapper';
import Home from './pages/home';
import { EventsPage } from './pages/events';
import { ContactPage } from './pages/contact';
import { AdminPage } from './pages/admins';
import { AppContext } from './context';
import { BeatLoader } from './common/components/spinners/beat-loader';
import { DataRoomPage } from './pages/data-room';
import ContentLayout from './common/layout/content';
import { Transition } from '@headlessui/react';

export const SlashAuthRoutes = () => {
  const [loading, setLoading] = useState(true);
  const appContext = useContext(AppContext);
  const [fetchingMetadata, setFetchingMetadata] = useState(false);

  if (
    appContext.appMetadata.data === undefined &&
    !appContext.appMetadata.loading &&
    !fetchingMetadata
  ) {
    setFetchingMetadata(true);
    appContext.appMetadata.fetch().finally(() => {
      setFetchingMetadata(false);
      setLoading(false);
    });
  }

  if (appContext.roles.data === undefined) {
    appContext.roles.fetchRoles();
  }

  const loadingDiv = useMemo(() => {
    return (
      <Transition
        as={Fragment}
        show={loading || appContext.appMetadata.data === undefined}
        leave="transition ease-in duration-500"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <div className="fixed inset-0 z-[100] bg-white h-full w-full flex flex-col">
          <ContentLayout fullHeight>
            <div className="flex flex-col items-center justify-center flex-grow w-full h-full">
              <img
                src="https://d1l2xccggl7xwv.cloudfront.net/icons/slashauth-dark.png"
                className="w-16 h-16 mb-12"
                alt="slashauth-logo"
              />
              <BeatLoader />
            </div>
          </ContentLayout>
        </div>
      </Transition>
    );
  }, [appContext.appMetadata.data, loading]);

  if (appContext.appMetadata.data === null) {
    return (
      <ContentLayout fullHeight>
        <div className="flex flex-col items-center justify-center flex-grow w-full h-full">
          <h1 className="mb-4 text-3xl font-bold text-center">
            An error occured creating your demo environment.
          </h1>
          <p className="mb-4 text-center text-gray-700">
            If you're having issues, please contact us at{' '}
            <a
              className="text-blue-500 hover:text-blue-600 focus:text-blue-700"
              href="mailto:support@slashauth.com"
            >
              support@slashauth.com
            </a>
          </p>
        </div>
      </ContentLayout>
    );
  }

  return (
    <>
      {loadingDiv}
      {!!appContext.appMetadata.data && (
        <Router>
          <NavigationProvider>
            <SlashAuthLoadedWrapper>
              <div className="sm:mr-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/files/*" element={<DataRoomPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </div>
            </SlashAuthLoadedWrapper>
          </NavigationProvider>
        </Router>
      )}
    </>
  );
};
