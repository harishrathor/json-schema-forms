let hostname = 'utron.com';
if (process.env.NODE_ENV === 'development') {
    hostname = 'localhost';
}
export const CLIENTS_INFO = {
    utron: {
        name    : 'utron',
        url     : `${hostname}`
    },
    forms: {
        name    : 'json-schema-forms',
        url     : `forms.${hostname}`
    },
    mailer: {
        name    : 'mailer',
        url     : `mailer.${hostname}`
    }
};

let mapping = {};
for (let clientName in CLIENTS_INFO) {
    mapping[CLIENTS_INFO[clientName].url] = CLIENTS_INFO[clientName];
}

export const CLIENTS_URL_MAPPING = mapping;