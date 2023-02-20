/**
 * Add any synchronous config inputs here
 */
type ConfigConstructorArgs = {
  isDev: boolean;
  env: string;
  clientID: string;
  aws: AWSConfig;
};

export class Config {
  private _isDev: boolean;
  private _env: string;
  private _clientID: string;
  private _aws: AWSConfig;

  // Optional values for data that is loaded async
  private _clientSecret?: string;

  constructor({ isDev, env, clientID, aws }: ConfigConstructorArgs) {
    this._isDev = isDev;
    this._env = env;
    this._clientID = clientID;
    this._aws = aws;
  }

  async init() {}

  get isDev(): boolean {
    return this._isDev;
  }

  get env(): string {
    return this._env;
  }

  get clientID(): string {
    return this._clientID;
  }

  get aws() {
    return this._aws;
  }

  get clientSecret() {
    if (!this._clientSecret) {
      throw new Error('uninitialized');
    }
    return this._clientSecret;
  }

  set clientSecret(input: string) {
    this._clientSecret = input;
  }
}

export type AWSConfig = {
  region: string;
  secretsID: string;
};
