

class UtilsClass {
    
    randomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        if (!length) {
            length = 20;
        }
        text += possible.charAt(Math.floor(Math.random() * (possible.length - 10)));
        text += possible.charAt(Math.floor(Math.random() * (possible.length - 10)));
        for (var i = 2; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };
    
    toCamelCase(str, separater) {
        try {
            let strArr = '';
            if (!separater) {
                strArr = [str];
            } else {
                strArr = str.split(separater);
            }
            var newStr = '';
            for(var i = 0; i < strArr.length; i++) {
                newStr += strArr[i][0].toUpperCase() + strArr[i].substr(1);
            }
            return newStr;
        } catch (error) {
            console.log(error);
            return '';
        }
    }

    toClassName(str, separater) {
        return this.toCamelCase(str, separater);
    }

    toMethodName(str, separater) {
        try {
            let strArr = '';
            if (!separater) {
                strArr = [str];
            } else {
                strArr = str.split(separater);
            }
            var newStr = strArr[0];
            for(var i = 1; i < strArr.length; i++) {
                newStr += strArr[i][0].toUpperCase() + strArr[i].substr(1);
            }
            return newStr;
        } catch (error) {
            console.log(error);
            return '';
        }
    }

    
    getFullUrl(req) {
        const headers = req.headers;
        let protocol = req.protocol;
        if (!protocol) {
            protocol = 'http';
        } 
        return protocol + '://' + headers.host + req.url;
    }
}

const utils = new UtilsClass();
export default utils;