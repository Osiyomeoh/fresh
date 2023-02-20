import { classNames } from '../../util/classnames';
import { UnstyledInput } from './unstyled-input';

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  validationError?: string;
  onTextChange: (val: string) => void;
  onBlur: () => void;
  onFocus: () => void;
};

export const InputWithBottomBorder = ({
  label,
  placeholder,
  value,
  validationError,
  onTextChange,
  onBlur,
  onFocus,
}: Props) => (
  <UnstyledInput
    label={label}
    placeholder={placeholder}
    value={value}
    validationError={validationError}
    outerClassName={classNames(
      'border-b border-solid focus-within:border-indigo-600 dark:focus-within:border-indigo-400 relative',
      validationError
        ? 'border-red-600 dark:border-red-400'
        : 'border-gray-300 dark:border-gray-700'
    )}
    innerClassName={classNames(
      'block w-full border-0 border-b bg-gray-50 dark:bg-pale-sky-900 focus:border-indigo-600 dark:focus:border-indigo-200 focus:ring-0 sm:text-sm',
      validationError
        ? 'border-red-600 dark:border-red-400'
        : 'border-transparent'
    )}
    onTextChange={onTextChange}
    onBlur={onBlur}
    onFocus={onFocus}
  />
);
