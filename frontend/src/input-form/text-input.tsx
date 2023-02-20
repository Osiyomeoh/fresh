import { FormDefTextInputField } from '../../@types/form-def';
import { InputWithValidation } from '../../common/form/InputWithValidation';
import { InputTitle } from './input-title';

type Props = {
  inputDef: FormDefTextInputField;
  value: string;
  onChange: (value: string) => void;
  validationError?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  required?: boolean;
};

export const TextInput = ({
  inputDef,
  value,
  onChange,
  validationError,
  onBlur,
  onFocus,
  required,
}: Props) => {
  return (
    <div className="flex flex-col items-center w-full space-y-2">
      <InputTitle
        title={inputDef.name}
        description={inputDef.description}
        required={required}
        validationError={validationError}
      />
      <div className="w-full">
        <InputWithValidation
          value={value}
          onTextChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          hideTooltip
        />
      </div>
    </div>
  );
};
