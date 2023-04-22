const errorHandler = ({ response }) => {
    switch (response.status) {
        case 404:
            return 'Weather forecast not found'
        default:
            return 'Something went wrong'
    }
}

export default errorHandler
