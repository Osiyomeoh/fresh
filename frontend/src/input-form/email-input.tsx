import { FormDefEmailInputField } from '../../@types/form-def';
import { TextInput } from './text-input';

type Props = {
  inputDef: FormDefEmailInputField;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
  validationError?: string;
  onBlur?: () => void;
  onFocus?: () => void;
};

export const EmailInput = ({
  inputDef,
  value,
  onChange,
  validationError,
  onBlur,
  onFocus,
  required,
}: Props) => {
  return (
    <TextInput
      inputDef={{ ...inputDef, type: 'text_input' }}
      required={required}
      value={value}
      onChange={onChange}
      validationError={validationError}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
