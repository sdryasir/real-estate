export const error = (err, req, res, next) => {
    
    let error = { ...err }

     error.message = err.message;


     if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error.message = message
        // error = new ErrorHandler(message, 400)
    }


    if (err.name == 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`
        error.message = message
    }

    if (err.code == 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error.message = message
    }

    res.json({
        success:false,
        message:error.message || 'Something went wrong'
    })

}