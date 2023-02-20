import { AccountButton } from '../../features/account/AccountButton';

type Props = {
  roleNameRequired: string;
};

export const LoggedOut = ({ roleNameRequired }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-8 py-24 bg-gray-100 rounded-lg">
      <h2 className="text-[24px] font-semibold text-center text-primary mb-6">
        This page is only viewable to those with {roleNameRequired} privileges.
      </h2>
      <AccountButton />
    </div>
  );
};
