import type { AxiosResponse } from "axios"

const errorHandler = ({ response }: { response: AxiosResponse }) => {
    switch (response.status) {
        case 404:
            return 'Weather forecast not found'
        default:
            return response.data.message
    }
}

export default errorHandler
