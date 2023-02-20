import { FormDefSelectField } from '../../@types/form-def';
import { InputTitle } from './input-title';

type Props = {
  inputDef: FormDefSelectField;
  required?: boolean;
  value: string;
  validationError?: string;
  onChange: (value: string) => void;
};
export const SelectInput = ({
  inputDef,
  value,
  required,
  validationError,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-col items-start w-full space-y-2">
      <InputTitle
        title={inputDef.name}
        description={inputDef.description}
        required={required}
        validationError={validationError}
      />
      <select
        className="block w-1/2 py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value}
        placeholder="Select..."
        onChange={(e) => {
          onChange(e.target.value);
        }}
      >
        <option key={'empty-str'} value={''} />
        {inputDef.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
