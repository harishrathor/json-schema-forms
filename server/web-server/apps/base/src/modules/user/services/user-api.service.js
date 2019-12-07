
import AbstractService from '@coreModule/base/abstract.service';
import UserUsersCollection from '@jsonSchemaFormsDB/user/collections/users.collection';
import UserApiCollection from '@jsonSchemaFormsDB/api/collections/user_api.collection';
import cryptoService from '@coreModule/services/crypto.service';
import utils from '@shared/utils.class';
import { ObjectId } from 'mongodb';

export class UserApiService extends AbstractService {

    initialize() {
        super.initialize();
        this.userApiCollection = new UserApiCollection(this.CLIENT);
    }

    createUserAPIData(userId) {
        return new Promise((resolve, reject) => {
            const userCollection = new UserUsersCollection(this.CLIENT);
            const userObjectId = ObjectId(userId);
            userCollection.findOne({
                _id: userObjectId
            }).then(userData => {
                const username = userData.username;
                const email = userData.email;
                const secretString= utils.randomString(20);
                const apiKeyString = `${username}__${email}`;
                const secret = cryptoService.getMD5Hash(secretString);
                const apiKey = cryptoService.getMD5Hash(apiKeyString);
                const userApiData = {
                    userId: userObjectId,
                    apiKey,
                    secret,
                    apiKeyString,
                    secretString
                };
                this.userApiCollection.insertOne(userApiData).then(data => {
                    SERVER.LOGGER.logInfo('Created User API Data.');
                    resolve(data);
                },
                error => {
                    reject(error);
                });
            },
            error => {
                reject(error);
            } );
        });
    }

    validateAPI(clientApiKey, eApiKey) {
        return new Promise((resolve, reject) => {
            this.userApiCollection.findOne({apiKey: clientApiKey}).then(apiData => {
                if (apiData === null) {
                    resolve(false);
                } else {
                    const { apiKey, secret} = apiData;
                    const decryptedText = cryptoService.decrypt(eApiKey, secret);
                    let data = null;
                    if (apiKey === decryptedText) {
                        data = secret;
                    }
                    resolve(data)
                }
            }).catch(error => reject(error));
        });
    }

}

export default new UserApiService();
        