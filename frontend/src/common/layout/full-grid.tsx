import { classNames } from '../../util/classnames';

type Props = {
  additionalClassnames?: string;
  children: React.ReactNode;
};

export const FullGridLayout = ({ additionalClassnames, children }: Props) => {
  return (
    <div
      className={classNames(
        'grid grid-cols-12 gap-4',
        additionalClassnames && additionalClassnames
      )}
    >
      {children}
    </div>
  );
};

export const FullGridLayoutLeftBarColumn = ({
  additionalClassnames,
  children,
}: Props) => {
  return (
    <div
      className={classNames(
        'hidden twotab:block twotab:col-span-3',
        additionalClassnames && additionalClassnames
      )}
    >
      {children}
    </div>
  );
};

export const FullGridLayoutContent = ({
  additionalClassnames,
  children,
}: Props) => {
  return (
    <div
      className={classNames(
        'col-span-12 twotab:col-span-9',
        additionalClassnames && additionalClassnames
      )}
    >
      {children}
    </div>
  );
};
