let validateRequest = function(response, error = '', customOutput = []) {
    let output = {
        error: true,
        message: error ? error : 'An error occurred while processing the request',
        output: []
    };    

    if (customOutput) {
        output.output = customOutput;
    }

    if (response) {
        output.error = false;
        output.message = 'Success';
        output.output = response;
    }
    return output;
}

export default validateRequest;
