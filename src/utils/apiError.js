class apiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        error = [],
        stack = ""
    ) {
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.error = error
        this.stack = stack

        if (stack) {
            this.stack = stack
        } else { 
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export default apiError;