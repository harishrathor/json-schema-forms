import session from 'express-session';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);


const sessionConfig = {
    secret: 'yC9GEfKs57ythfgdfdsisdf5MTPhpzXLs45ytyjgjTDQ3UBzdHiRCTbi',
    resave: false,
    saveUninitialized: true,
    name: '__uCTN',
    cookie: { 
        maxAge: 60000
    }
};

export default sessionConfig;

export { sessionConfig };