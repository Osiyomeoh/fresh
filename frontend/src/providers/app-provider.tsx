import { useSlashAuth } from '@slashauth/slashauth-react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { API, CreateFileInput, PatchFileInput } from '../api';
import { RoleNameAdmin, RoleNameMember } from '../constants';
import { AppContext, ConfigContext } from '../context';
import { AppMetadata } from '../model/app-metadata';
import { SlashauthEvent } from '../model/event';
import { User } from '../model/user';
import { SlashauthFile } from '../model/file';

type Props = {
  children: React.ReactNode;
};

type FetchedData<T> = {
  data: T | null;
  loading: boolean;
};

export const TEST_FILE_ID = 'file.testpdf';

const AppProvider = ({ children }: Props) => {
  const [appMetadata, setAppMetadata] = useState<FetchedData<AppMetadata>>({
    data: undefined,
    loading: false,
  });

  const [events, setEvents] = useState<FetchedData<SlashauthEvent[]>>({
    data: undefined,
    loading: false,
  });

  const [roles, setRoles] = useState<{
    [roleName: string]: FetchedData<boolean>;
  }>({});

  const [me, setMe] = useState<FetchedData<User>>({
    data: undefined,
    loading: false,
  });

  const [files, setFiles] = useState<
    FetchedData<Record<string, SlashauthFile>>
  >({
    data: {
      [TEST_FILE_ID]: new SlashauthFile({
        id: TEST_FILE_ID,
        blobID: 'blob.12345',
        clientID: '',
        organizationID: null,
        wallet: '',
        name: 'Dataroom example',
        description: '',
        rolesRequired: [RoleNameMember],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    },
    loading: false,
  });

  const { getTokens, isAuthenticated, hasRole } = useSlashAuth();
  const config = useContext(ConfigContext);

  const [lastRoleDataAdmin, setLastRoleDataAdmin] = useState(false);
  const [lastRoleDataMember, setLastRoleDataMember] = useState(false);

  if (!isAuthenticated && events.data !== undefined) {
    setEvents({ data: undefined, loading: false });
  }

  if (!isAuthenticated && roles && Object.keys(roles).length !== 0) {
    setRoles({});
  }

  if (!isAuthenticated && me.data !== undefined) {
    setMe({ data: undefined, loading: false });
  }

  const addRole = useCallback((roleName: string, response: boolean) => {
    setRoles((existing) => ({
      ...existing,
      [roleName]: {
        data: response,
        loading: false,
      },
    }));
  }, []);

  const fetchRoleData = useCallback(
    async (roleName: string): Promise<boolean> => {
      if (!isAuthenticated) {
        return false;
      }
      setRoles((existing) => ({
        ...(existing || {}),
        [roleName]: {
          data: undefined,
          loading: true,
        },
      }));
      try {
        const roleResponse = await hasRole(roleName);
        addRole(roleName, roleResponse);
        return roleResponse;
      } catch (err) {
        console.error('Failed to fetch role', err);
        addRole(roleName, false);
        return false;
      }
    },
    [addRole, hasRole, isAuthenticated]
  );

  const fetchRoles = async () => {
    await fetchRoleData(RoleNameMember);
    await fetchRoleData(RoleNameAdmin);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setRoles(undefined);
    } else {
      fetchRoles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const fetchMe = useCallback(async (): Promise<User | null> => {
    setTimeout(
      () =>
        setMe({
          ...me,
          loading: true,
        }),
      0
    );
    return getTokens().then((token) => {
      const api = new API(config, token);
      return api
        .getMe()
        .then((user) => {
          setMe({
            data: user,
            loading: false,
          });
          return user;
        })
        .catch((err) => {
          console.error('Error fetching me', err);
          setMe({
            data: null,
            loading: false,
          });
          return null;
        });
    });
  }, [config, getTokens, me]);

  const patchMe = useCallback(
    async (nickname: string): Promise<User | null> => {
      return getTokens().then((token) => {
        const api = new API(config, token);
        return api
          .patchMe(nickname)
          .then((user) => {
            setMe({
              data: user,
              loading: false,
            });
            return user;
          })
          .catch((err) => {
            console.error('Error fetching me', err);
            return null;
          });
      });
    },
    [config, getTokens]
  );

  const addEvent = useCallback(
    async (ev: SlashauthEvent): Promise<SlashauthEvent | null> => {
      return getTokens().then((token) => {
        const api = new API(config, token);
        return api
          .addEvent(ev)
          .then((ev) => {
            return ev;
          })
          .catch((err) => {
            console.error('Error adding event', err);
            return null;
          });
      });
    },
    [config, getTokens]
  );

  const fetchAppMetadata =
    useCallback(async (): Promise<AppMetadata | null> => {
      setTimeout(
        () =>
          setAppMetadata({
            ...appMetadata,
            loading: true,
          }),
        0
      );
      return getTokens().then((token) => {
        const api = new API(config, token);
        return api
          .getAppMetadata()
          .then((metadata) => {
            setAppMetadata({
              data: metadata,
              loading: false,
            });
            return metadata;
          })
          .catch((err) => {
            console.error('Error fetching app metadata', err);
            setAppMetadata({
              data: null,
              loading: false,
            });
            return null;
          });
      });
    }, [appMetadata, config, getTokens]);

  const fetchEvents = useCallback(async (): Promise<
    SlashauthEvent[] | null
  > => {
    if (!isAuthenticated) {
      return null;
    }
    setEvents({
      ...events,
      loading: true,
    });

    return getTokens().then((token) => {
      const api = new API(config, token);
      return api
        .getEvents()
        .then((events) => {
          setEvents({
            data: events,
            loading: false,
          });
          return events;
        })
        .catch((err) => {
          console.error('Error fetching events: ', err);
          setEvents({
            data: null,
            loading: false,
          });
          return null;
        });
    });
  }, [config, events, getTokens, isAuthenticated]);

  const listFiles = useCallback(async () => {
    if (!isAuthenticated) {
      return null;
    }
    setFiles({
      ...files,
      loading: true,
    });

    return getTokens().then((token) => {
      const api = new API(config, token);
      return api
        .listFiles()
        .then((incomingFiles) => {
          const fileMap = incomingFiles.reduce((acc, file) => {
            acc[file.id] = file;
            return acc;
          }, files.data || {});
          setFiles({
            data: fileMap,
            loading: false,
          });
          return incomingFiles;
        })
        .catch((err) => {
          console.error('Error listing files: ', err);
          setFiles({
            ...files,
            loading: false,
          });
          return null;
        });
    });
  }, [config, files, getTokens, isAuthenticated]);

  const getSignedFileURL = useCallback(
    async (fileID: string) => {
      if (!isAuthenticated) {
        return null;
      }

      return getTokens().then((token) => {
        const api = new API(config, token);
        return api.getPresignedURLForFile(fileID).catch((err) => {
          console.error('Error getting presigned URL for file: ', err);

          return null;
        });
      });
    },
    [config, getTokens, isAuthenticated]
  );

  const getFile = useCallback(
    async (fileID: string) => {
      if (!isAuthenticated) {
        return null;
      }
      setFiles({
        ...files,
        loading: true,
      });

      return getTokens().then((token) => {
        const api = new API(config, token);
        return api
          .getFile(fileID)
          .then((file) => {
            const fileMap = files.data || {};
            fileMap[fileID] = file;
            setFiles({
              data: fileMap,
              loading: false,
            });
            return files;
          })
          .catch((err) => {
            console.error('Error getting file: ', err);
            setFiles({
              ...files,
              loading: false,
            });
            return null;
          });
      });
    },
    [config, files, getTokens, isAuthenticated]
  );

  const createFile = useCallback(
    async (input: CreateFileInput) => {
      if (!isAuthenticated) {
        return null;
      }
      setFiles({
        ...files,
        loading: true,
      });

      return getTokens().then((token) => {
        const api = new API(config, token);
        return api
          .createFile(input)
          .then((file) => {
            const fileMap = files.data || {};
            fileMap[file.id] = file;
            setFiles({
              data: fileMap,
              loading: false,
            });
            return files;
          })
          .catch((err) => {
            console.error('Error creating file: ', err);
            setFiles({
              ...files,
              loading: false,
            });
            return null;
          });
      });
    },
    [config, files, getTokens, isAuthenticated]
  );

  const patchFile = useCallback(
    async (id: string, input: PatchFileInput) => {
      if (!isAuthenticated) {
        return null;
      }
      setFiles({
        ...files,
        loading: true,
      });

      return getTokens().then((token) => {
        const api = new API(config, token);
        return api
          .patchFile(id, input)
          .then((file) => {
            const fileMap = files.data || {};
            fileMap[file.id] = file;
            setFiles({
              data: fileMap,
              loading: false,
            });
            return file;
          })
          .catch((err) => {
            console.error('Error patching file: ', err);
            setFiles({
              ...files,
              loading: false,
            });
            return null;
          });
      });
    },
    [config, files, getTokens, isAuthenticated]
  );

  const deleteFile = useCallback(
    async (id: string) => {
      if (!isAuthenticated) {
        return null;
      }
      setFiles({
        ...files,
        loading: true,
      });

      return getTokens().then((token) => {
        const api = new API(config, token);
        return api
          .deleteFile(id)
          .then((file) => {
            const fileMap = files.data || {};
            if (fileMap[id]) {
              fileMap[id] = undefined;
            }
            setFiles({
              data: fileMap,
              loading: false,
            });
            return file;
          })
          .catch((err) => {
            console.error('Error deleting file: ', err);
            setFiles({
              ...files,
              loading: false,
            });
            return null;
          });
      });
    },
    [config, files, getTokens, isAuthenticated]
  );

  if (
    roles &&
    roles[RoleNameAdmin] &&
    !roles[RoleNameAdmin].loading &&
    roles[RoleNameAdmin].data !== undefined &&
    lastRoleDataAdmin !== roles[RoleNameAdmin].data
  ) {
    if (roles[RoleNameAdmin].data && isAuthenticated) {
      fetchEvents();
      listFiles();
    }
    setLastRoleDataAdmin(roles[RoleNameAdmin].data);
  }

  if (
    roles &&
    roles[RoleNameMember] &&
    !roles[RoleNameMember].loading &&
    roles[RoleNameMember].data !== undefined &&
    lastRoleDataMember !== roles[RoleNameMember].data
  ) {
    if (roles[RoleNameMember].data && isAuthenticated) {
      fetchEvents();
      fetchMe();
    }
    setLastRoleDataMember(roles[RoleNameMember].data);
  }

  return (
    <AppContext.Provider
      value={{
        appMetadata: {
          ...appMetadata,
          fetch: fetchAppMetadata,
        },
        events: {
          ...events,
          fetch: fetchEvents,
          addEvent: (event: SlashauthEvent) => {
            addEvent(event);
            setEvents({
              ...events,
              data: [...(events.data || []), event],
            });
          },
        },
        roles: {
          data: {
            ...roles,
          },
          fetch: fetchRoleData,
          fetchRoles,
        },
        me: {
          ...me,
          fetch: fetchMe,
          patch: patchMe,
        },
        files: {
          ...files,
          list: listFiles,
          get: getFile,
          getPresignedURL: getSignedFileURL,
          create: createFile,
          patch: patchFile,
          delete: deleteFile,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
