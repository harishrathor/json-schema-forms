
import AbstractController from '@coreModule/base/abstract.controller';
import UserUsersCollection from '@jsonSchemaFormsDB/user/collections/users.collection';
import userApiService from '@userModule/services/user-api.service';

// My user name : harish_6104, Password: harishrathor
export default class AuthController extends AbstractController {

    initialize() {
        super.initialize();
    }

    loginAction() {
        const usersCollection = new UserUsersCollection();
        usersCollection
        .validateUsingUsernamePassword(this.reqParams.username, this.reqParams.password)
        .then(count => {
            if(count === 1) {
                this.request.session.username = this.reqParams.username;
             //   userApiService.createUserAPIData("5ce44ba5cea47279e855b255");//Copy from NoSQLBooster for MongoDB free edition. This message does not appear if you are using a registered version.
                this.response.end('Logged In successfully.');
            } else if (count > 1) {
                this.response.end( 'More than one user exist.');
            } else {
                this.response.end('User does not exists.');
            }
        }) 
        .catch(error => {
            SERVER.LOGGER.logError(error);
            this.response.end( 'Error in validating user.');
        }) 
        ;
      /*   const id = parseInt(Math.random() * 10000);
        const phone = parseInt(Math.random() * 10000000000);
        usersCollection.createUser({
            name: `Harish Rathor `,
            email: `harishrathor${id}@gmail.com`,
            gender: `M`,
            username: `harish_${id}`,
            password: `harishrathor`,
            phone: phone
        }).then((user) => {
            usersCollection.find().count().then((count) => {
                this.response.end( 'Logged In successfully. Total insertion count: ' + count);
                SERVER.LOGGER.logInfo('User count:', count);
            }).catch((err) => {
                SERVER.LOGGER.logInfo('Error in fetching count').logError(err);
                this.response.end( 'Error in counting user.');
            });
        }).catch((err) => {
            SERVER.LOGGER.logError(err);
            this.response.end( 'Error in creating user.');
        }); */
    }

    logoutAction() {
        this.request.session.destroy();
        this.response.end( 'Logged Out successfully');
    }

    testAction() {
        //this.response.end( 'Test Action.');
        const responseJson = {
            "user": {
                "ID": 2,
                "username": "rj",
                "email": "rj@naehas.com"
            },
            "smartTaskId": 1,
            "proofHistoryId": 3193,
            "proof": {
                "ID": 3193,
                "bucketName": "naehastest",
                "copyFromStorageKey": "dashboard/smarttasks/task1/proofAttachments/TPS 1787 FINAL Email copy.pdf",
                "version": "u5ES_9bdBhQf2PEtEu16sq4H4QOnkLq7",
                "filename": "TPS 1787 FINAL Email copy.pdf",
                "displayName": "TPS 1787 FINAL Email copy"
            },
            "assets": [
                {
                    "ID": 6518,
                    "bucketName": "naehastest",
                    "copyFromStorageKey": "dashboard/smarttasks/task1/proofAttachments/TPS 1787 FINAL Email copy.pdf",
                    "version": "u5ES_9bdBhQf2PEtEu16sq4H4QOnkLq7",
                    "filename": "TPS 1787 FINAL Email copy.pdf",
                    "displayName": "TPS 1787 FINAL Email copy"
                }
            ],
            "services": [
                {
                    "name": "dashboard",
                    "baseURL": "http://localhost:8001/dashboard/naehas/rs",
                    "fullURL": null
                },
                {
                    "name": "rules",
                    "baseURL": null,
                    "fullURL": null
                }
            ]
        };
        this.response.json(responseJson).end();
    }

    contextAction() {
        //this.response.end( 'Test Action.');
        console.log('Client Name', SERVER.APP.get('clientName'));
        const responseJson = {
            "user": {
              "ID": 6,
              "username": "kaushlendras",
              "email": "kaushlendras@naehas.com"
            },
            "smartTaskId": 1,
            "proofHistoryId": 11,
            "proof": {
              "ID": 11,
              "bucketName": "naehasuat",
              "copyFromStorageKey": "marketingcomplianceuat-dashboard/robertj@naehas.com-rjmarketingcompliance.naehaslp.com/rjmarketingcompliance-rjmc/proofs/TPS 1787 FINAL Email copy 2.html",
              "version": "PHHamB1atwLGpuo7rhbB3P_Zc6tGaxfs",
              "filename": "TPS 1787 FINAL Email copy 2.pdf",
              "displayName": "TPS 1787 FINAL Email copy 2"
            },
            "assets": [
              {
                "ID": 17,
                "bucketName": "naehasuat",
                "copyFromStorageKey": "marketingcomplianceuat-dashboard/robertj@naehas.com-rjmarketingcompliance.naehaslp.com/rjmarketingcompliance-rjmc/proofs/TPS 1787 FINAL Email copy 2.pdf",
                "version": "PHHamB1atwLGpuo7rhbB3P_Zc6tGaxfs",
                "filename": "TPS 1787 FINAL Email copy 2.pdf",
                "displayName": "TPS 1787 FINAL Email copy 2"
              },
              {
                "ID": 17,
                "bucketName": "naehasuat",
                "copyFromStorageKey": "marketingcomplianceuat-dashboard/robertj@naehas.com-rjmarketingcompliance.naehaslp.com/rjmarketingcompliance-rjmc/proofs/TPS 1787 FINAL Email copy 2.pdf",
                "version": "PHHamB1atwLGpuo7rhbB3P_Zc6tGaxfs",
                "filename": "TPS 1787 FINAL Email copy 2.pdf",
                "displayName": "TPS 1787 FINAL Email copy 2"
              }
            ],
            "services": [
              {
                "name": "dashboard",
                "baseURL": "https://uat.naehas.com/MarketingComplianceUATDashboard/naehas/rs",
                "fullURL": null
              },
              {
                "name": "rules",
                "baseURL": null,
                "fullURL": null
              }
            ]
          };
        this.response.json(responseJson).end();
    }

}

export {
    AuthController
};
        