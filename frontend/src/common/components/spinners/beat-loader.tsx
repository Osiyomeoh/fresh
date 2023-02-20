import React from 'react';
import { classNames } from '../../../util/classnames';

type Props = {
  color?: string;
};

export const BeatLoader = React.memo(({ color }: Props) => {
  const circleCommonClasses =
    'h-2.5 w-2.5 bg-current rounded-full inline-block';

  return (
    <div
      className={classNames(
        'inline-block',
        color ? color : 'bg-text-gray-900 dark:bg-text-gray-100 '
      )}
    >
      <div
        className={`${circleCommonClasses} mr-1 animate-beat-fade ease-in-out`}
      ></div>
      <div
        className={`${circleCommonClasses} mr-1 animate-beat-fade-odd`}
      ></div>
      <div className={`${circleCommonClasses} animate-beat-fade`}></div>
    </div>
  );
});
