import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../common/components/Buttons';
import DatePicker from 'react-datepicker';
import { InputWithValidation } from '../../common/form/InputWithValidation';
import { H1 } from '../../common/styles/typography';
import { ModalContext } from '../../context';

type Props = {
  onSave: (
    name: string,
    description: string,
    link: string | null,
    date: Date
  ) => Promise<void>;
};

export const AddEventModalContents = ({ onSave }: Props) => {
  const modalContext = useContext(ModalContext);

  const [nameValue, setNameValue] = useState('');
  const [nameValidationError, setNameValidationError] = useState<string>(null);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [linkValue, setLinkValue] = useState('');
  const [linkValidationError, setLinkValidationError] = useState<string>(null);
  const [dateValue, setDateValue] = useState<Date>(new Date(Date.now()));

  const validateName = () => {
    if (nameValue.length === 0) {
      setNameValidationError('Name is required');
      return false;
    }
    setNameValidationError(null);
    return true;
  };

  const validateLink = () => {
    if (linkValue.length === 0) {
      setLinkValidationError(null);
      return true;
    }

    try {
      new URL(linkValue);
      setLinkValidationError(null);
      return true;
    } catch (err) {
      setLinkValidationError('Invalid URL');
      return false;
    }
  };

  const validateInput = () => {
    return validateName() && validateLink();
  };

  return (
    <div className="flex flex-col divide-y divide-gray-100 w-[420px]">
      <div className="flex flex-col flex-grow w-full space-y-4">
        <H1>Add Event</H1>
        <InputWithValidation
          value={nameValue}
          validationError={nameValidationError}
          label="Event Name"
          onTextChange={setNameValue}
          onFocus={() => setNameValidationError(null)}
          onBlur={validateName}
        />
        <InputWithValidation
          value={descriptionValue}
          label="Description"
          onTextChange={setDescriptionValue}
        />
        <InputWithValidation
          value={linkValue}
          validationError={linkValidationError}
          label="Link"
          onTextChange={setLinkValue}
          onFocus={() => setLinkValidationError(null)}
          onBlur={validateLink}
        />
        <DatePicker
          selected={dateValue}
          onChange={(date: Date) => setDateValue(date)}
        />
      </div>
      <div className="flex flex-row items-center justify-end flex-shrink-0 pt-8 mt-8 space-x-2">
        <SecondaryButton onClick={modalContext.hide}>Cancel</SecondaryButton>
        <PrimaryButton
          onClick={async () => {
            if (validateInput()) {
              try {
                await onSave(nameValue, descriptionValue, linkValue, dateValue);
                modalContext.hide();
              } catch (err) {
                console.error('Error creating role: ', err);
                toast.error(
                  'Error creating event. Check the console for more information',
                  {
                    duration: 3000,
                    id: 'role-error',
                  }
                );
              }
            }
          }}
        >
          Add Event
        </PrimaryButton>
      </div>
    </div>
  );
};
