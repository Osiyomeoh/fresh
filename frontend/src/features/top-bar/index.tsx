import { Fragment, useContext } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { AppContext, NavigationContext } from '../../context';
import ContentLayout from '../../common/layout/content';
import { Link } from 'react-router-dom';
import { TopBarNavigation } from './navigation';
import { Popover, Transition } from '@headlessui/react';
import { ReactComponent as SlashauthIcon } from '../../common/icons/slashauth-dark-icon.svg';
import { SlashAuthUserDropdownComponent } from '@slashauth/slashauth-react';
import { classNames } from '../../util/classnames';
import { H1 } from '../../common/styles/typography';

function TopBar() {
  const navigation = useContext(NavigationContext);

  const { appMetadata } = useContext(AppContext);

  return (
    <Popover className="z-10 bg-white border-b border-gray-100 dark:bg-black dark:border-gray-800">
      {({ open, close }) => (
        <>
          <ContentLayout>
            <div className="flex justify-between h-16 px-2 sm:px-0">
              <div className="flex">
                <div className="flex items-center flex-shrink-0">
                  <Link to="/" className="flex items-center">
                    <H1>{appMetadata?.data.name}</H1>
                  </Link>
                </div>
                <TopBarNavigation />
              </div>

              <div className="flex items-center">
                <div className="z-50">
                  <SlashAuthUserDropdownComponent />
                </div>
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-transparent rounded-md twotab:hidden hover:text-gray-700 hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </ContentLayout>
          <Transition.Root as={Fragment}>
            <div className="twotab:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 z-20 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-30 w-full max-w-3xl p-2 mx-auto transition origin-top transform"
                >
                  <div className="bg-white divide-y divide-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="pt-3 pb-2">
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <SlashauthIcon className="w-auto h-6" />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="w-6 h-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="px-2 pb-2 mt-3 space-y-1 border-b border-solid border-color-gray-300">
                        {navigation.navigationItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.pathname}
                            className={classNames(
                              'text-gray-600 dark:text-pale-sky-400 hover:bg-gray-200 dark:hover:bg-pale-sky-700',
                              'group flex items-center px-3 py-2 text-sidebar font-medium rounded-md'
                            )}
                          >
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            <item.icon
                              className={classNames(
                                'text-gray-500 flex-shrink-0 -ml-1 mr-5 h-5 w-5'
                              )}
                              aria-hidden="true"
                            />
                            <span className="truncate">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  );
}

export default TopBar;
