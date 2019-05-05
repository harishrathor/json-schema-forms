//import CurlRequest from "curl-request";

const curl = new (require( 'curl-request' ))();

console.log();

var reqCounter = 0;
var maxRequest = 1000;
function request() {
    curl
    .get('http://localhost:4000/form-def/FRM0000000001.json')
    .then(({statusCode, body, headers}) => {
        console.log(statusCode);
        if (reqCounter <=  maxRequest) {
            request();
        }   
    })
    .catch((e) => {
        console.log(e);
    });
}
/* 
while(reqCounter <=  maxRequest) {
    request();
} */
request();