"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAWSSecrets = void 0;
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
const getAWSSecrets = async (conf) => {
    let client = new client_secrets_manager_1.SecretsManagerClient({ region: conf.region });
    // input
    const secretParams = {
        SecretId: conf.secretsID,
    };
    try {
        const secretData = await client.send(new client_secrets_manager_1.GetSecretValueCommand(secretParams));
        // fetch secret string from results
        let secretString;
        if (secretData.SecretString) {
            secretString = secretData.SecretString;
        }
        else if (secretData.SecretBinary) {
            const buff = Buffer.from(secretData.SecretBinary);
            secretString = buff.toString();
        }
        else {
            throw new Error('Secrets Manager did not return any secrets');
        }
        return JSON.parse(secretString);
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
exports.getAWSSecrets = getAWSSecrets;
//# sourceMappingURL=secrets-manager.js.map