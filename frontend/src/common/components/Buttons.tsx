import React from 'react';
import { classNames } from '../../util/classnames';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  additionalClassNames?: string;
  children: React.ReactNode;
};

export const BaseButton = React.memo(
  ({ size, children, additionalClassNames, ...rest }: ButtonProps) => (
    <button
      className={classNames(
        'inline-flex items-center border border-solid font-medium shadow-sm focus:outline-none',
        size === 'xs' && 'px-2.5 py-1.5 text-xs',
        size === 'sm' && 'px-3 py-2 text-sm leading-4',
        (!size || size === 'md') && 'px-4 py-2 text-sm',
        size === 'lg' && 'px-4 py-2 text-base',
        size === 'xl' && 'px-6 py-3 text-base',
        additionalClassNames
      )}
      {...rest}
    >
      {children}
    </button>
  )
);

export const PrimaryPillButton = React.memo(
  ({ children, additionalClassNames, ...rest }: ButtonProps) => {
    return (
      <BaseButton
        additionalClassNames={classNames(
          additionalClassNames,
          'rounded-full border-transparent text-white dark:text-gray-900 bg-indigo-600 dark:bg-indigo-400 hover:bg-indigo-700 dark:hover:bg-indigo-500'
        )}
        {...rest}
      >
        {children}
      </BaseButton>
    );
  }
);

export const PrimaryButton = React.memo(
  ({ children, additionalClassNames, ...rest }: ButtonProps) => {
    return (
      <BaseButton
        additionalClassNames={classNames(
          additionalClassNames,
          'border-transparent text-white dark:text-gray-900 bg-indigo-600 dark:bg-indigo-400 hover:bg-indigo-700 dark:hover:bg-indigo-500'
        )}
        {...rest}
      >
        {children}
      </BaseButton>
    );
  }
);

export const SecondaryButton = React.memo(
  ({ children, additionalClassNames, ...rest }: ButtonProps) => {
    return (
      <BaseButton
        additionalClassNames={classNames(
          additionalClassNames,
          'border-transparent text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800'
        )}
        {...rest}
      >
        {children}
      </BaseButton>
    );
  }
);

export const WhiteButton = React.memo(
  ({ children, additionalClassNames, ...rest }: ButtonProps) => {
    return (
      <BaseButton
        additionalClassNames={classNames(
          additionalClassNames,
          'border-gray-300 dark:border-gray-700 text-gray-900 dark:text-pale-sky-400 bg-white dark:bg-pale-sky-600 hover:bg-gray-50 dark:hover:bg-pale-sky-900'
        )}
        {...rest}
      >
        {children}
      </BaseButton>
    );
  }
);

export const FullWidthPillButton = React.memo(
  ({ children, additionalClassNames, ...rest }: ButtonProps) => {
    return (
      <BaseButton
        additionalClassNames={classNames(
          additionalClassNames,
          'w-full rounded-full justify-center text-sidebar border-transparent'
        )}
        {...rest}
      >
        {children}
      </BaseButton>
    );
  }
);

export const FullWidthShadowedWhitePillButton = React.memo(
  ({ children, additionalClassNames, ...rest }: ButtonProps) => {
    return (
      <BaseButton
        additionalClassNames={classNames(
          additionalClassNames,
          'w-full rounded-full justify-center text-sidebar border-transparent bg-white dark:bg-white shadow-xl hover:shadow-2xl text-gray-900'
        )}
        {...rest}
      >
        {children}
      </BaseButton>
    );
  }
);

export const SecondaryPillButton = React.memo(
  ({ children, additionalClassNames, ...rest }: ButtonProps) => {
    return (
      <SecondaryButton
        additionalClassNames={classNames(additionalClassNames, 'rounded-full')}
        {...rest}
      >
        {children}
      </SecondaryButton>
    );
  }
);
