import type { AxiosResponse } from "axios"

const errorHandler = ({ response }: { response: AxiosResponse }) => {
    switch (response.status) {
        case 404:
            return 'Weather forecast not found'
        default:
            return 'Something went wrong'
    }
}

export default errorHandler
