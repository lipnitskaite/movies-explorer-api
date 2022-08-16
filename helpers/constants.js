const regexURL = /^(https?:\/\/\w+[.\-\w]*)+(\.[a-z]{1,3})+(\/[\w\-.~:\\/?#[\]@!$&'()*+,;=]*)*#?$/i;

const MONGO_DUPLICATE_ERROR_CODE = 11000;

module.exports = { regexURL, MONGO_DUPLICATE_ERROR_CODE };
