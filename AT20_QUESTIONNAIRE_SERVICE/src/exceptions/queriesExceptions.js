class QueriesExceptions extends Error {
    constructor (message, errorCode, type) {
        super(message);
        this.errorCode = errorCode;
        this.type = type;
    }

    get getErrorCode () {
        return this.errorCode;
    }

    get getType () {
        return this.type;
    }
}

module.exports = QueriesExceptions;
