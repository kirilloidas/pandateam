const errorHandler = ({ response }) => {
    switch (response.status) {
        case 404:
            return 'Package doesn\'t exist'
        default:
            return 'Something went wrong'
    }
}

export default errorHandler
