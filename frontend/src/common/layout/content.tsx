import { classNames } from '../../util/classnames';

type Props = {
  fullHeight?: boolean;
  additionalClassnames?: string;
  children: React.ReactNode;
};

function ContentLayout({ fullHeight, additionalClassnames, children }: Props) {
  return (
    <div
      className={classNames(
        'max-w-7xl xl:mx-auto w-full sm:px-4',
        additionalClassnames && additionalClassnames,
        fullHeight && 'flex-grow flex flex-col'
      )}
    >
      {children}
    </div>
  );
}

export default ContentLayout;
