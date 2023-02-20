import { useCallback, useContext, useMemo, useState } from 'react';
import { FormDefField, FormDefinition } from '../../@types/form-def';
import { EmailInput } from './email-input';
import { SelectInput } from './select-input';
import { TextAreaInput } from './text-area-input';
import { TextInput } from './text-input';
import orangeLogo from '../../assets/images/orange-logo.png';
import TextContent from '../../common/components/TextContent';
import { PrimaryButton } from '../../common/components/Buttons';
import { BeatLoader } from '../../common/components/spinners/beat-loader';
import { useSlashAuth } from '@slashauth/slashauth-react';
import toast from 'react-hot-toast';
import { API, SubmitFormInput } from '../../api';
import { ConfigContext } from '../../context';

type Props = {
  formDef: FormDefinition;
};

type SubmittingState = {
  submitting: boolean;
  success: boolean;
  error?: string;
};

export const InputForm = ({ formDef }: Props) => {
  const config = useContext(ConfigContext);
  const { isAuthenticated, getAccessTokenSilently, logout } = useSlashAuth();
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [submittingState, setSubmittingState] = useState<SubmittingState>({
    submitting: false,
    success: false,
  });

  const validateFieldWithID = useCallback(
    (field: FormDefField): string | null => {
      if (
        field.required &&
        (!inputValues[field.id] || inputValues[field.id] === '')
      ) {
        setValidationErrors((curr) => ({
          ...curr,
          [field.id]: 'Field is required',
        }));
        return 'Input is required';
      } else {
        setValidationErrors((curr) => ({
          ...curr,
          [field.id]: null,
        }));
        return null;
      }
    },
    [inputValues]
  );

  const validateForms = useCallback(() => {
    let success = true;
    formDef.fields.forEach((field) => {
      const validationError = validateFieldWithID(field);
      if (validationError) {
        success = false;
      }
    });
    return success;
  }, [formDef.fields, validateFieldWithID]);

  const handleSubmit = useCallback(async () => {
    if (submittingState.submitting || !isAuthenticated) {
      return;
    }
    if (!validateForms()) {
      toast.error('Please fill in required fields');
      return;
    }
    setSubmittingState({ success: false, submitting: true });
    const token = await getAccessTokenSilently();
    if (!token) {
      toast.error('An error occurred. Please login again.', {
        duration: 5000,
      });
      logout();
      setSubmittingState({ submitting: false, success: false });
      return;
    }
    try {
      const api = new API(config, token);
      const response = await api.submitFormData(
        formDef.id,
        inputValues as SubmitFormInput
      );
      if (!response) {
        toast.error('Failed to submit form data. Please try again', {
          duration: 5000,
        });
        setSubmittingState({ submitting: false, success: false });
        return;
      }

      toast.success('Successfully submitted form data', { duration: 1000 });
      setSubmittingState({ submitting: false, success: true });
    } catch (err) {
      console.error(err);
      toast.error('Caught an error submitting form data. Please try again', {
        duration: 5000,
      });
      setSubmittingState({ submitting: false, success: false });
    }
  }, [
    config,
    formDef.id,
    getAccessTokenSilently,
    inputValues,
    isAuthenticated,
    logout,
    submittingState.submitting,
    validateForms,
  ]);

  const formFields = useMemo(
    () =>
      formDef.fields.map((field) => {
        switch (field.type) {
          case 'text_input':
            return (
              <TextInput
                inputDef={field}
                key={field.id}
                required={field.required}
                value={inputValues[field.id] || ''}
                validationError={validationErrors[field.id]}
                onChange={(val) =>
                  setInputValues((curr) => ({ ...curr, [field.id]: val }))
                }
                onBlur={() => validateFieldWithID(field)}
                onFocus={() =>
                  setValidationErrors((curr) => ({ ...curr, [field.id]: null }))
                }
              />
            );
          case 'email_input':
            return (
              <EmailInput
                inputDef={field}
                key={field.id}
                required={field.required}
                value={inputValues[field.id] || ''}
                validationError={validationErrors[field.id]}
                onChange={(val) =>
                  setInputValues((curr) => ({ ...curr, [field.id]: val }))
                }
                onBlur={() => validateFieldWithID(field)}
                onFocus={() =>
                  setValidationErrors((curr) => ({ ...curr, [field.id]: null }))
                }
              />
            );
          case 'text_area':
            return (
              <TextAreaInput
                inputDef={field}
                key={field.id}
                required={field.required}
                value={inputValues[field.id] || ''}
                validationError={validationErrors[field.id]}
                onChange={(val) =>
                  setInputValues((curr) => ({ ...curr, [field.id]: val }))
                }
                onBlur={() => validateFieldWithID(field)}
                onFocus={() =>
                  setValidationErrors((curr) => ({ ...curr, [field.id]: null }))
                }
              />
            );
          default:
            return (
              <SelectInput
                inputDef={field}
                key={field.id}
                required={field.required}
                value={inputValues[field.id] || ''}
                onChange={(val) => {
                  setInputValues((curr) => ({ ...curr, [field.id]: val }));
                  setValidationErrors((curr) => ({
                    ...curr,
                    [field.id]: null,
                  }));
                }}
              />
            );
        }
      }),
    [formDef.fields, inputValues, validateFieldWithID, validationErrors]
  );

  const contents = useMemo(() => {
    if (submittingState.submitting) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50">
          <img src={orangeLogo} className="mb-8 w-36 h-36" alt={'logo'} />
          <div className="text-[24px] font-bold text-primary mb-6 w-full">
            Submitting
          </div>
          <p className="text-[16px] text-secondary w-full mb-6">
            Give us a second. We're technically sending your information into
            space.
          </p>
          <BeatLoader />
        </div>
      );
    }

    if (submittingState.success) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50">
          <img src={orangeLogo} className="mb-8 w-36 h-36" alt={'logo'} />
          <div className="text-[24px] font-bold text-primary mb-6 w-full">
            Success!
          </div>
          <p className="text-[16px] text-secondary w-full mb-6">
            Your data has been submitted! Have a Juicy Day.
          </p>
          <span className="mt-8 text-[14px] text-primary">
            Want to build your own token gated form?{' '}
            <a
              href="https://www.slashauth.xyz/features/forms"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 hover:text-indigo-600 focus:text-indigo-700"
            >
              Join our Beta!
            </a>
          </span>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center text-left">
        <div className="flex flex-col items-start w-full p-8 bg-gray-50">
          <img src={orangeLogo} className="mb-8 w-36 h-36" alt={'logo'} />
          <h1 className="text-[24px] font-bold text-primary mb-6 w-full">
            {formDef.name}
          </h1>
          <TextContent
            text={formDef.description}
            additionalClassNames="text-[16px] font-medium text-secondary w-full"
          />
        </div>
        <div className="pb-2 mt-12 space-y-8">{formFields}</div>
        <div className="flex items-start w-full mt-4">
          <PrimaryButton
            disabled={submittingState.submitting}
            onClick={handleSubmit}
          >
            Submit
          </PrimaryButton>
        </div>
      </div>
    );
  }, [
    formDef.description,
    formDef.name,
    formFields,
    handleSubmit,
    submittingState.submitting,
    submittingState.success,
  ]);

  return (
    <div className="relative w-full px-2 overflow-x-hidden md:w-2/3 lg:w-1/2">
      {contents}
    </div>
  );
};
