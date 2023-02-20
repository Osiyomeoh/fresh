import { useSlashAuth } from '@slashauth/slashauth-react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LoggedOut } from '../../common/components/LoggedOut';
import { NotAuthorized } from '../../common/components/NotAuthorized';
import { BeatLoader } from '../../common/components/spinners/beat-loader';
import ContentLayout from '../../common/layout/content';
import { RoleNameMember } from '../../constants';
import { AppContext } from '../../context';
import TopBar from '../../features/top-bar';
import accountGradient from '../../common/gradients/account-gradient.png';
import { classNames } from '../../util/classnames';
import { Link, useParams } from 'react-router-dom';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { TEST_FILE_ID } from '../../providers/app-provider';

export const DataRoomPage = () => {
  const {
    files: { data, getPresignedURL, loading },
    roles,
  } = useContext(AppContext);

  const { isAuthenticated } = useSlashAuth();

  const { '*': fileID } = useParams();

  const [signedURL, setSignedURL] = useState<string>(null);
  const [numPages, setNumPages] = useState<number>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [showNav, setShowNav] = useState(false);

  const hasRole = useMemo(
    () =>
      isAuthenticated &&
      roles.data &&
      roles.data[RoleNameMember] &&
      roles.data[RoleNameMember].data,
    [isAuthenticated, roles.data]
  );

  useEffect(() => {
    setSignedURL(null);
    setNumPages(null);
    setPageNumber(1);
    if (fileID && fileID.length && !loading) {
      if (fileID === TEST_FILE_ID) {
        setSignedURL('/pdf/test-dataroom.pdf');
      } else {
        getPresignedURL(fileID).then(setSignedURL);
      }
    }
  }, [fileID, getPresignedURL, loading]);

  const onDocumentLoadSuccess = useCallback(({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
  }, []);

  const documentDiv = useMemo(() => {
    if (!signedURL) {
      return <div />;
    }
    return (
      <div className="flex items-center justify-center w-full h-full p-2 border border-gray-100 rounded-lg bg-gray-50">
        <Document
          className="pointer-none"
          file={signedURL}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
    );
  }, [onDocumentLoadSuccess, pageNumber, signedURL]);

  const fileDiv = useMemo(() => {
    if (!signedURL) {
      return (
        <div className="relative flex flex-col items-center justify-center w-full min-h-[600px]">
          <BeatLoader />;
        </div>
      );
    }
    try {
      return (
        <div className="relative flex flex-col items-center justify-center w-full min-h-[600px]">
          {documentDiv}
          <div
            className={classNames(
              'absolute z-10 p-2 -translate-x-1/2 bg-gray-200 shadow-md bottom-2 left-1/2 transition-opacity transition duration-250',
              !showNav ? 'opacity-0' : 'opacity-100'
            )}
          >
            <p>
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
            </p>
            <button
              type="button"
              disabled={pageNumber <= 1}
              className={classNames(
                'text-gray-500 focus:outline-none',
                pageNumber > 1 &&
                  'hover:text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-700'
              )}
              onClick={() => setPageNumber((curr) => curr - 1)}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              className={classNames(
                'text-gray-500 focus:outline-none',
                pageNumber < numPages &&
                  'hover:text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-700'
              )}
              onClick={() => setPageNumber((curr) => curr + 1)}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    } catch (err) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-red-200">
          <div className="text-red-500">File not found</div>
        </div>
      );
    }
  }, [documentDiv, numPages, pageNumber, showNav, signedURL]);

  const filesContent = useMemo(() => {
    if (!isAuthenticated) {
      return <LoggedOut roleNameRequired={RoleNameMember} />;
    }

    if (
      !roles.data ||
      !roles.data[RoleNameMember] ||
      roles.data[RoleNameMember].loading
    ) {
      return <BeatLoader />;
    }

    if (!roles.data[RoleNameMember].data) {
      return <NotAuthorized roleNameRequired={RoleNameMember} />;
    }

    if (!data) {
      return <BeatLoader />;
    }

    return (
      <div className="flex flex-col flex-grow px-4 sm:px-0">
        <div className="grid h-full grid-cols-4 gap-4 py-4">
          <div className="h-full col-span-1">
            {Object.keys(data).length === 0 ? (
              <>
                <div className="w-full text-[18px] text-center text-primary text-bold">
                  No files yet
                </div>
                <div className="w-full text-[16px] text-center text-primary text-regular">
                  Add files in the admin tab
                </div>
              </>
            ) : (
              Object.keys(data).map((fileID) => (
                <ul key={fileID} className="w-full text-left">
                  <li className="list-disc">
                    <Link
                      to={`/files/${fileID}`}
                      className="text-blue-500 hover:text-blue-600 focus:text-blue-700"
                    >
                      {data[fileID].name}
                    </Link>
                  </li>
                </ul>
              ))
            )}
          </div>
          <div
            className="flex justify-center h-full col-span-3 border border-gray-200 rounded-md min-h-[600px] "
            onMouseEnter={() => setShowNav(true)}
            onMouseLeave={() => setShowNav(false)}
          >
            {fileID && fileID.length ? (
              fileDiv
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100">
                <span className="text-gray-700">
                  Select a file on the left to view it
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [isAuthenticated, roles.data, data, fileID, fileDiv]);

  return (
    <>
      <TopBar />
      <div className="relative w-full h-[300px] bg-green">
        <img
          src={accountGradient}
          className={classNames(
            'absolute inset-0 h-[300px] w-full object-cover z-0',
            !hasRole && 'grayscale'
          )}
          alt="Home Gradient"
        />
        <div className="absolute inset-0 flex flex-col">
          <ContentLayout fullHeight>
            <div className="flex flex-col items-start justify-center w-full h-full px-2 sm:w-2/3 sm:px-0 md: xl:w-2/5 text-banner">
              <h1 className="text-[36px] font-semibold">Jobs</h1>
              <p className="text-[21px]">
                Check-out jobs 
              </p>
            </div>
          </ContentLayout>
        </div>
      </div>
      <ContentLayout fullHeight additionalClassnames="mt-8">
        <main className="text-center text-primary">
          <div className="px-4 mt-8">{filesContent}</div>
        </main>
      </ContentLayout>
    </>
  );
};
