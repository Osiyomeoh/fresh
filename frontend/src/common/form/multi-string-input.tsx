import { PlusIcon, XIcon } from '@heroicons/react/outline';
import { useMemo } from 'react';
import { InputWithValidation } from './InputWithValidation';

export type InputItem = {
  str: string;
  err?: Error | null;
};

type Props = {
  canAddMore: boolean;
  inputItems: InputItem[];
  onEdit: (idx: number, val: string) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
  validateInput: (str: string) => boolean;
};

export const MultiStringInput = ({
  canAddMore,
  inputItems,
  onAdd,
  onEdit,
  onRemove,
}: Props) => {
  const existingElems = useMemo(
    () => (
      <>
        {inputItems.map((input, idx) => (
          <div className="flex flex-row items-center" key={`input.str${idx}`}>
            <InputWithValidation
              value={input.str}
              hideTooltip
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onTextChange={(val) => {
                onEdit(idx, val);
              }}
            />
            {canAddMore && (
              <XIcon
                className="w-6 h-6 ml-2 cursor-pointer"
                onClick={() => onRemove(idx)}
              />
            )}
          </div>
        ))}
      </>
    ),
    [canAddMore, inputItems, onEdit, onRemove]
  );

  return (
    <div className="flex flex-col w-full space-y-2">
      {existingElems}
      <div className="flex">
        <div
          className="inline-flex items-center flex-shrink pr-1 text-indigo-500 border-indigo-500 cursor-pointer bo rder-b"
          onClick={() => onAdd()}
        >
          <PlusIcon className="w-4 h-4" />
          <span className="text-sm">Add another</span>
        </div>
      </div>
    </div>
  );
};
