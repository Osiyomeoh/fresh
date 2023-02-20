import {
  GetSecretValueCommand,
  GetSecretValueCommandInput,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager';
import { Secrets } from '../@types/aws';
import { AWSConfig } from '../@types/config';

export const getAWSSecrets = async (conf: AWSConfig): Promise<Secrets> => {
  let client = new SecretsManagerClient({ region: conf.region });

  // input
  const secretParams: GetSecretValueCommandInput = {
    SecretId: conf.secretsID,
  };

  try {
    const secretData = await client.send(
      new GetSecretValueCommand(secretParams)
    );

    // fetch secret string from results
    let secretString: string;
    if (secretData.SecretString) {
      secretString = secretData.SecretString;
    } else if (secretData.SecretBinary) {
      const buff = Buffer.from(secretData.SecretBinary);
      secretString = buff.toString();
    } else {
      throw new Error('Secrets Manager did not return any secrets');
    }

    return JSON.parse(secretString) as Secrets;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
