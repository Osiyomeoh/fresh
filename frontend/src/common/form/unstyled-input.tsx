import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { useUUID } from '../hooks/use-uuid';
import { classNames } from '../../util/classnames';

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  validationError?: string | null;
  outerClassName: string | null;
  innerClassName: string | null;
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

export const UnstyledInput = ({
  label,
  placeholder,
  value,
  validationError,
  outerClassName,
  innerClassName,
  hideTooltip,
  readOnly,
  noGrow,
  shrink,
  disabled,
  onTextChange,
  onBlur,
  onFocus,
  onSubmit,
}: Props) => {
  const uuid = useUUID();

  const tooltipRef = useRef<HTMLDivElement>(null);

  const [isFocused, setFocused] = useState(false);

  useEffect(() => {
    if (validationError && !isFocused && tooltipRef.current) {
      ReactTooltip.show(tooltipRef.current);
    } else if ((!validationError || isFocused) && tooltipRef.current) {
      ReactTooltip.hide(tooltipRef.current);
    }
  }, [validationError, isFocused]);

  return (
    <div
      className={classNames(
        'relative',
        !noGrow && 'flex-grow',
        shrink && 'flex-shrink'
      )}
    >
      {label && (
        <label
          htmlFor="name"
          className="block text-sm font-light text-typography-inputlabel"
        >
          {label}
        </label>
      )}
      <div
        className={classNames(outerClassName, !!label && 'mt-1')}
        ref={tooltipRef}
        data-for={uuid}
        data-tip={' '}
      >
        <input
          type="text"
          disabled={disabled}
          className={innerClassName || undefined}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onTextChange(e.target.value)}
          onBlur={() => {
            setFocused(false);
            onBlur && onBlur();
          }}
          onFocus={() => {
            setFocused(true);
            onFocus && onFocus();
          }}
          onKeyDown={(e) => {
            if (
              onSubmit &&
              (e.code.toLowerCase() === 'return' ||
                e.code.toLowerCase() === 'enter')
            ) {
              onSubmit();
            }
          }}
          readOnly={readOnly}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        {validationError && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ExclamationCircleIcon
              className="w-5 h-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {!hideTooltip && (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <ReactTooltip
          type="error"
          effect="solid"
          id={uuid}
          getContent={() => {
            if (!validationError || isFocused) {
              return null;
            }
            return validationError;
          }}
        />
      )}
    </div>
  );
};
