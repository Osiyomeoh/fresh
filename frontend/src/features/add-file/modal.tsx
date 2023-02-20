import { useCallback, useContext, useState } from 'react';
import {
  PrimaryButton,
  SecondaryButton,
} from '../../common/components/Buttons';
import { InputWithValidation } from '../../common/form/InputWithValidation';
import { H1 } from '../../common/styles/typography';
import { ModalContext } from '../../context';
import { useDropzone } from 'react-dropzone';
import { classNames } from '../../util/classnames';
import { toast } from 'react-hot-toast';

type Props = {
  onSave: (input: {
    name: string;
    description: string | null;
    rolesRequired: string[];
    file: File;
  }) => Promise<void>;
};

export const AddFileModalContents = ({ onSave }: Props) => {
  const modalContext = useContext(ModalContext);

  const [nameValue, setNameValue] = useState('');
  const [nameValidationError, setNameValidationError] = useState<string>(null);
  const [descriptionValue, setDescriptionValue] = useState('');

  const [selectedFiles, setSelectedFiles] = useState<File[]>(null);

  const [loading, setLoading] = useState(false);

  const validateName = useCallback(() => {
    if (nameValue.length === 0) {
      setNameValidationError('Name is required');
      return false;
    }
    setNameValidationError(null);
    return true;
  }, [nameValue.length]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setSelectedFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5e6,
    accept: { 'application/pdf': ['.pdf'] },
    disabled: selectedFiles?.length > 0,
    maxFiles: 1,
    onDropRejected: () => {
      toast.error('File must be a PDF <= 5 MB');
    },
  });

  const validate = useCallback(() => {
    return validateName() && selectedFiles?.length;
  }, [selectedFiles?.length, validateName]);

  const handleUpload = useCallback(async () => {
    if (!validate()) {
      return;
    }

    await onSave({
      name: nameValue,
      description: descriptionValue || null,
      rolesRequired: [],
      file: selectedFiles[0],
    });
    modalContext.hide();
  }, [
    descriptionValue,
    modalContext,
    nameValue,
    onSave,
    selectedFiles,
    validate,
  ]);

  return (
    <div className="flex flex-col divide-y divide-gray-100 w-[420px]">
      <div className="flex flex-col flex-grow w-full space-y-4">
        <H1>Add File</H1>
        <InputWithValidation
          value={nameValue}
          validationError={nameValidationError}
          label="File Name"
          onTextChange={setNameValue}
          onFocus={() => setNameValidationError(null)}
          onBlur={validateName}
        />
        <InputWithValidation
          value={descriptionValue}
          label="Description"
          onTextChange={setDescriptionValue}
        />
        {/* Add role selector */}
        <div
          {...getRootProps()}
          className={classNames(
            'flex items-center justify-center w-full h-16 px-4 text-sm bg-gray-100 border border-gray-100',
            !selectedFiles?.length && 'cursor-pointer'
          )}
        >
          {selectedFiles?.length > 0 ? (
            <ul className="flex flex-col w-full pl-2">
              <div className="font-bold text-md">Selected File</div>
              {selectedFiles.map((selectedFile, idx) => (
                <li className="text-sm list-disc" key={idx}>
                  {selectedFile.name}
                </li>
              ))}
            </ul>
          ) : (
            <>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop your PDF here...</p>
              ) : (
                <p>Drop a PDF here or click to select one</p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center justify-end flex-shrink-0 pt-8 mt-8 space-x-2">
        <SecondaryButton onClick={modalContext.hide}>Cancel</SecondaryButton>
        <PrimaryButton
          onClick={async () => {
            if (loading || !validate()) {
              return;
            }
            try {
              setLoading(true);
              await handleUpload();
              modalContext.hide();
            } catch (err) {
              console.error('Error creating file', err);
              toast.error(
                'Error creating file. Check the console for more information',
                {
                  duration: 3000,
                  id: 'file-error',
                }
              );
            } finally {
              setLoading(false);
            }
          }}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </PrimaryButton>
      </div>
    </div>
  );
};
