import React from 'react';
import TextContent from '../../common/components/TextContent';

type Props = {
  title: string;
  description?: string;
  required?: boolean;
  validationError?: string;
};

export const InputTitle = React.memo(
  ({ title, description, required, validationError }: Props) => (
    <div className="flex flex-col items-start justify-center w-full">
      <div className="flex justify-between w-full">
        <span
          className={
            validationError
              ? 'text-[20px] font-bold text-red-600'
              : 'text-[18px] font-semibold'
          }
        >
          {title}
        </span>
        {required && (
          <span className="text-red-400 text-[18px] font-bold">*</span>
        )}
      </div>
      {description && (
        <TextContent
          additionalClassNames="text-[16px] text-secondary"
          text={description}
        />
      )}
    </div>
  )
);
