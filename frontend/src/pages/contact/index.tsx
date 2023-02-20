import { useSlashAuth } from '@slashauth/slashauth-react';
import { useContext, useMemo } from 'react';
import { PrimaryButton } from '../../common/components/Buttons';
import { LoggedOut } from '../../common/components/LoggedOut';
import { NotAuthorized } from '../../common/components/NotAuthorized';
import { BeatLoader } from '../../common/components/spinners/beat-loader';
import ContentLayout from '../../common/layout/content';
import { RoleNameMember } from '../../constants';
import { AppContext } from '../../context';
import TopBar from '../../features/top-bar';
import contactGradient from '../../common/gradients/contact-gradient.png';
import { classNames } from '../../util/classnames';

export const ContactPage = () => {
  const { isAuthenticated } = useSlashAuth();
  const { roles } = useContext(AppContext);

  const hasRole = useMemo(
    () =>
      isAuthenticated &&
      roles.data &&
      roles.data[RoleNameMember] &&
      roles.data[RoleNameMember].data,
    [isAuthenticated, roles.data]
  );

  const contents = useMemo(() => {
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

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg bg-indigo-50">
        <div className="text-[24px] font-semibold">Need to contact us?</div>
        <div className="text-[18px]">
          Join our super secret member only discord via this link:
        </div>
        <a
          href="https://discord.gg/QWQWQWQW"
          className="mt-4"
          target="_blank"
          rel="noreferrer"
        >
          {/*eslint-disable-next-line @typescript-eslint/no-empty-function*/}
          <PrimaryButton onClick={() => {}}>Join Secret Discord</PrimaryButton>
        </a>
      </div>
    );
  }, [isAuthenticated, roles.data]);

  return (
    <>
      <TopBar />
      <div className="relative w-full h-[300px] bg-green">
        <img
          src={contactGradient}
          className={classNames(
            'absolute inset-0 h-[300px] w-full object-cover z-0',
            !hasRole && 'grayscale'
          )}
          alt="Home Gradient"
        />
        <div className="absolute inset-0 flex flex-col">
          <ContentLayout fullHeight>
            <div className="flex flex-col items-start justify-center w-full h-full px-2 sm:w-2/3 sm:px-0 md: xl:w-2/5 text-banner">
              <h1 className="text-[36px] font-semibold">Contact us</h1>
              <p className="text-[21px]">
                Allow members to contact you directly with a gated Contact Us
                page.
              </p>
            </div>
          </ContentLayout>
        </div>
      </div>
      <ContentLayout fullHeight additionalClassnames="mt-8">
        <main className="text-center text-primary">
          <div className="mt-8">{contents}</div>
        </main>
      </ContentLayout>
    </>
  );
};
