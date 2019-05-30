import AbstractCollection from '@jsonSchemaFormsDB/core/base/abstract.collection';
import cryptoService from '@coreModule/services/crypto.service';


export default class UserUsersCollection extends AbstractCollection {

    initialize() {
        super.initialize();
        this.collectionName = 'jsf_user_users';
        this.encryptionKey = '__DeqtfNDotuSBDXRGm4aX__';
        this.postInit();
    }

    _encryptPassword(userDataArr) {
        userDataArr.forEach(userData => {
            if (userData.password) {
                userData.password = cryptoService.getMD5Hash(userData.password);
            }
        });
    }

    createUser(userDetails) {
        this._encryptPassword([userDetails]);
        return this.insertOne(userDetails);
    }

    createUsers(userDetailsArr) {
        this._encryptPassword([userDetails]);
        return this.insertMany(userDetailsArr);
    }

    getUserDetails() {
        return this.find.apply(this, arguments);
    }

    getUserCount() {
        return this.count.apply(this, arguments);
    }

    validateUsingUsernamePassword(username, password) {
        const encryptedPassword = cryptoService.getMD5Hash(password);
        const query = {
            username,
            password: encryptedPassword
        };
        return this.getUserCount(query);
    }

}

export {
    UserUsersCollection
};

/* ------------------- Validator 
    db.runCommand({
    collMod: 'jsf_user_users',
    "validator" : {
		"$jsonSchema" : {
			"bsonType" : "object",
			"required" : [
				"name",
				"gender",
				"username",
				"password"
			],
			"properties" : {
				"name" : {
					"bsonType" : "string",
					"pattern" : "[A-Za-z]",
					"description" : "Must be a string and is required"
				},
				"gender" : {
					"enum" : [
						"M",
						"F"
					],
					"description" : "Can only be one of the enum values and is required"
				},
				"email" : {
					"bsonType" : "string",
					"description" : "Must be a valid email and is required."
				},
				"username" : {
					"bsonType" : "string",
					"pattern" : "^[A-Za-z0-9_-]{6,15}$",
					"description" : "Can contain alphbet, number and _. Min length 6 and max length 15. And required."
				},
				"password" : {
					"bsonType" : "string",
					"description" : "Encrypted Password and is required."
				}
			}
		}
	},
	"validationLevel" : "strict",
	"validationAction" : "error"
})

*/