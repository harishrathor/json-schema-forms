let domain = 'utron';
let hostname = `${domain}.com`;
if (process.env.NODE_ENV === 'development') {
    hostname = 'localhost';
}
export const CLIENTS_CONFIG = {
    [domain]: {
        id          : 1,
        master      : true,
        active      : true,
        name        : 'utron',
        url         : `${hostname}`,
        config      : {
            development: {
                db: {
                    PORT: 27017,
                    HOSTNAME: 'localhost',
                    PROTOCOL: 'mongodb',
                    DB_NAME: domain
                }
            },
            production: {
                db: {
                    PORT: 27017,
                    HOSTNAME: 'localhost',
                    PROTOCOL: 'mongodb',
                    DB_NAME: domain
                }
            }

        }
    },
    forms: {
        id          : 2,
        active      : true,
        name    : 'forms',
        url     : `forms.${hostname}`,
        config      : {
            development: {
                db: {
                    PORT: 27017,
                    HOSTNAME: 'localhost',
                    PROTOCOL: 'mongodb',
                    DB_NAME: 'forms'
                }
            },
            production: {
                db: {
                    PORT: 27017,
                    HOSTNAME: 'localhost',
                    PROTOCOL: 'mongodb',
                    DB_NAME: 'forms'
                }
            }

        }
    },
    mailer: {
        id          : 3,
        active      : true,
        name    : 'mailer',
        url     : `mailer.${hostname}`,
        config      : {
            development: {
                db: {
                    PORT: 27017,
                    HOSTNAME: 'localhost',
                    PROTOCOL: 'mongodb',
                    DB_NAME: 'mailer'
                }
            },
            production: {
                db: {
                    PORT: 27017,
                    HOSTNAME: 'localhost',
                    PROTOCOL: 'mongodb',
                    DB_NAME: 'mailer'
                }
            }

        }
    }
};


let mapping = {};
let activeClientsNameArr = [];
for (let clientName in CLIENTS_CONFIG) {
    const clientConfig = CLIENTS_CONFIG[clientName];
    if (clientConfig.active) {
        activeClientsNameArr.push(clientName);
    }
    mapping[clientConfig.url] = clientConfig;
}

export const CLIENTS_NAME_ARR = Object.keys(CLIENTS_CONFIG);

export function clientExists(clientName) {
    return CLIENTS_CONFIG[clientName];
}

export function isActiveClient(clientName) {
    return (clientExists(clientName) && CLIENTS_CONFIG[clientName].active);
}

export const ACTIVE_CLIENTS_NAMES_ARR = activeClientsNameArr;

export const CLIENTS_URL_MAPPED_CONFIG = mapping;

export const MASTER_CLIENT_NAME = domain;

export default {
    CLIENTS_CONFIG,
    CLIENTS_NAME_ARR,
    clientExists,
    isActiveClient,
    ACTIVE_CLIENTS_NAMES_ARR,
    CLIENTS_URL_MAPPED_CONFIG,
    MASTER_CLIENT_NAME
};