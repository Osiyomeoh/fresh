import { CalendarIcon } from '@heroicons/react/outline';
import { useSlashAuth } from '@slashauth/slashauth-react';
import { useContext, useMemo } from 'react';
import { LoggedOut } from '../../common/components/LoggedOut';
import { BeatLoader } from '../../common/components/spinners/beat-loader';
import ContentLayout from '../../common/layout/content';
import { AppContext } from '../../context';
import { EventElem } from '../../features/events/event';
import TopBar from '../../features/top-bar';
import { RoleNameMember } from '../../constants';
import { NotAuthorized } from '../../common/components/NotAuthorized';
import eventsGradient from '../../common/gradients/events-gradient.png';
import { classNames } from '../../util/classnames';
import { SlashauthEvent } from '../../model/event';

export const EventsPage = () => {
  const { events, roles } = useContext(AppContext);

  const { isAuthenticated } = useSlashAuth();

  const defaultEvents = useMemo(() => {
    const now = new Date().getDate();
    return [
      new SlashauthEvent(
        'Zoom townhall sync',
        'Our weekly touchpoint for a townhall',
        'https://www.zoom.us/example',
        new Date(new Date().setDate(now + 5)).toLocaleDateString()
      ),
      new SlashauthEvent(
        'Weekly budget committee chat',
        'Our treasury team sync',
        'https://www.zoom.us/example',
        new Date(new Date().setDate(now + 6)).toLocaleDateString()
      ),
      new SlashauthEvent(
        'Governance Committee',
        'Our governance committee touchpoint',
        'https://www.zoom.us/example',
        new Date(new Date().setDate(now + 7)).toLocaleDateString()
      ),
    ];
  }, []);

  const hasRole = useMemo(
    () =>
      isAuthenticated &&
      roles.data &&
      roles.data[RoleNameMember] &&
      roles.data[RoleNameMember].data,
    [isAuthenticated, roles.data]
  );

  const eventsContent = useMemo(() => {
    if (!isAuthenticated) {
      return <LoggedOut roleNameRequired={RoleNameMember} />;
    }

    if (
      !roles.data ||
      !roles.data[RoleNameMember] ||
      roles.data[RoleNameMember].loading
    ) {
      return <BeatLoader />;
    }

    if (!roles.data[RoleNameMember].data) {
      return <NotAuthorized roleNameRequired={RoleNameMember} />;
    }

    const eventsToUse = [...defaultEvents];
    if (events.data) {
      eventsToUse.push(...events.data);
      eventsToUse.sort((a, b) => {
        return a.dateTime - b.dateTime;
      });
    }

    if (eventsToUse.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 border border-gray-100 rounded-lg">
          <div className="flex flex-col p-5 rounded-full bg-indigo-50">
            <CalendarIcon
              className="w-16 h-16 text-indigo-500"
              strokeWidth={1}
            />
          </div>
          <div className="mt-4 text-[16px] font-medium text-center text-secondary">
            No upcoming events
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col space-y-4">
        {eventsToUse.map((ev, idx) => (
          <EventElem key={`${ev.name}-${idx}`} event={ev} idx={idx} />
        ))}
      </div>
    );
  }, [defaultEvents, events.data, isAuthenticated, roles.data]);

  return (
    <>
      <TopBar />
      <div className="relative w-full h-[300px] bg-green">
        <img
          src={eventsGradient}
          className={classNames(
            'absolute inset-0 h-[300px] w-full object-cover z-0',
            !hasRole && 'grayscale'
          )}
          alt="Home Gradient"
        />
        <div className="absolute inset-0 flex flex-col">
          <ContentLayout fullHeight>
            <div className="flex flex-col items-start justify-center w-full h-full px-2 sm:w-2/3 sm:px-0 md: xl:w-2/5 text-banner">
              <h1 className="text-[36px] font-semibold">Upcoming Events</h1>
              <p className="text-[21px]">
                Keep your community in the loop with a member-only Events page.
              </p>
            </div>
          </ContentLayout>
        </div>
      </div>
      <ContentLayout fullHeight additionalClassnames="mt-8">
        <main className="text-center text-primary">
          <div className="mt-8">{eventsContent}</div>
        </main>
      </ContentLayout>
    </>
  );
};
