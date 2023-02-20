import React from 'react';
import { FaDiscord, FaTelegram, FaTwitter } from 'react-icons/fa';
import { BsMedium } from 'react-icons/bs';
import { classNames } from '../../../util/classnames';

export enum SocialProvider {
  Twitter,
  Discord,
  Medium,
  Telegram,
}

type Props = {
  provider: SocialProvider;
  url?: string;
  hideBackground?: boolean;
};

const baseClasses = 'bg-transparent h-6 w-6';

export const SocialButton = React.memo(
  ({ provider, url, hideBackground }: Props) => {
    const contents = (
      <div
        className={classNames(
          'flex items-center justify-center dark:hover:bg-pale-sky-100 focus:bg-gray-800 dark:focus:bg-pale-sky-200 rounded-full',
          !hideBackground && 'bg-black hover:bg-gray-700 dark:bg-white'
        )}
      >
        {provider === SocialProvider.Twitter && (
          <FaTwitter className={baseClasses} />
        )}
        {provider === SocialProvider.Discord && (
          <FaDiscord className={baseClasses} />
        )}
        {provider === SocialProvider.Medium && (
          <BsMedium className={baseClasses} />
        )}
        {provider === SocialProvider.Telegram && (
          <FaTelegram className={baseClasses} />
        )}
      </div>
    );

    if (url) {
      return (
        <a href={url} target="_blank" rel="noreferrer">
          {contents}
        </a>
      );
    }
    return contents;
  }
);
