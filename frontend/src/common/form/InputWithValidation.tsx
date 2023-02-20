import { classNames } from '../../util/classnames';
import { UnstyledInput } from './unstyled-input';

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  validationError?: string | null;
  outerClassNames?: string | null;
  innerClassNames?: string | null;
  hideTooltip?: boolean;
  readOnly?: boolean;
  noGrow?: boolean;
  shrink?: boolean;
  disabled?: boolean;
  onTextChange: (val: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSubmit?: () => void;
};

export const InputWithValidation = ({
  label,
  placeholder,
  value,
  validationError,
  innerClassNames,
  outerClassNames,
  hideTooltip,
  readOnly,
  noGrow,
  shrink,
  disabled,
  onTextChange,
  onBlur,
  onFocus,
  onSubmit,
}: Props) => (
  <UnstyledInput
    label={label}
    disabled={disabled}
    placeholder={placeholder}
    value={value}
    validationError={validationError}
    outerClassName={classNames(
      outerClassNames || 'mt-1 rounded-md',
      'relative'
    )}
    innerClassName={classNames(
      innerClassNames ||
        'block w-full pr-6 focus:outline-none sm:text-sm rounded-md dark:bg-pale-sky-900',
      validationError
        ? 'border-solid border-red-300 dark:border-red-700 text-red-900 dark:text-coral-red-100 placeholder-red-300 dark:placeholder-red-700 focus:ring-red-500 focus:border-red-500'
        : 'border-solid focus:ring-indigo-500 focus:border-indigo-500 border-gray-100 dark:border-gray-700'
    )}
    hideTooltip={hideTooltip}
    readOnly={readOnly}
    noGrow={noGrow}
    shrink={shrink}
    onTextChange={onTextChange}
    onBlur={onBlur}
    onFocus={onFocus}
    onSubmit={onSubmit}
  />
);

export default InputWithValidation;
