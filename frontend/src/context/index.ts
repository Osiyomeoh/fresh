/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { CreateFileInput, PatchFileInput } from '../api';
import { Config, emptyConfig } from '../config';
import { AppMetadata } from '../model/app-metadata';
import { SlashauthEvent } from '../model/event';
import { User } from '../model/user';
import { NavigationState } from '../providers/navigation-provider';
import { SlashauthFile } from '../model/file';

export type ModalActionType = string;

export const ModalActionTypeOpen = 'open';
export const ModalActionTypeClose = 'close';

export type ModalListenerFn = (action: ModalActionType) => void;
export type UnlistenFn = () => void;

export type ModalType = string;
export const ModalTypeAddEvent: ModalType = 'addEvent';
export const ModalTypeAddFile: ModalType = 'addFile';

export type ModalContextType = {
  contents: React.ReactNode;
  isShowing: boolean;
  show: () => void;
  hide: () => void;
  setContents: (
    type: ModalType,
    contents: React.ReactNode,
    show?: boolean
  ) => void;
  addListener: (type: ModalType, fn: ModalListenerFn) => UnlistenFn;
};

export type AppContextType = {
  appMetadata: {
    data: AppMetadata | null;
    loading: boolean;
    fetch: () => Promise<AppMetadata>;
  };
  events: {
    data: SlashauthEvent[] | null;
    loading: boolean;
    fetch: () => Promise<SlashauthEvent[] | null>;
    addEvent: (event: SlashauthEvent) => void;
  };
  roles: {
    data: {
      [roleName: string]: {
        data: boolean;
        loading: boolean;
      };
    };
    fetch: (roleName: string) => Promise<boolean>;
    fetchRoles: () => Promise<void>;
  };
  me: {
    data: User | null;
    loading: boolean;
    fetch: () => Promise<User | null>;
    patch: (nickname: string) => Promise<User | null>;
  };
  files: {
    data: Record<string, SlashauthFile> | null;
    loading: boolean;
    list: () => Promise<SlashauthFile[] | null>;
    get: (fileID: string) => Promise<SlashauthFile | null>;
    getPresignedURL: (fileID: string) => Promise<string | null>;
    create: (file: CreateFileInput) => Promise<SlashauthFile | null>;
    patch: (id: string, input: PatchFileInput) => Promise<SlashauthFile>;
    delete: (id: string) => Promise<SlashauthFile>;
  };
};

export const emptyAppContext = {
  appMetadata: {
    data: undefined,
    loading: false,
    fetch: async () => null,
  },
  events: {
    data: undefined,
    loading: false,
    fetch: async () => null,
    addEvent: (event: SlashauthEvent) => {},
  },
  roles: {
    data: {},
    fetch: async () => false,
    fetchRoles: async () => {},
  },
  users: {
    data: undefined,
    loading: false,
    fetch: async () => null,
  },
  me: {
    data: undefined,
    loading: false,
    fetch: async () => null,
    patch: async (nickname: string) => null,
  },
  files: {
    data: undefined,
    loading: false,
    list: async () => null,
    get: async (id: string) => null,
    getPresignedURL: async (id: string) => null,
    create: async (file: CreateFileInput) => null,
    patch: async (id: string, input: PatchFileInput) => null,
    delete: async (id: string) => null,
  },
};

export const NavigationContext = createContext<NavigationState>({
  navigationItems: [],
  selectedID: null,
  showSignInButton: false,
  setShowSignInButton: () => {},
});

export const ConfigContext = createContext<Config>(emptyConfig);
export const ModalContext = createContext<ModalContextType>({
  contents: null,
  isShowing: false,
  show: () => {},
  hide: () => {},
  setContents: () => {},
  addListener: (type: ModalType, fn: ModalListenerFn) => () => {},
});

export const AppContext = createContext<AppContextType>(emptyAppContext);
