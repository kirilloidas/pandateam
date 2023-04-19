import axios from 'axios'
// import store from '@/store'
// import * as config from '../assets/config.json'
import errorHandler from '@/api/errorHandler'
import { useErrorStore } from '@/stores/error'


// console.dir(useErrorStore)

// const { setErrorMsg } = useErrorStore()

export const api = () => {
    console.log(import.meta.env.VITE_AXIOS_BASE_URL)
    const instance = axios.create({
        baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
    })
    instance.interceptors.response
        .use((response) => {
            // store.commit('decrementLoader')
            return response
        },
            (error) => {
                console.log()
                useErrorStore().setErrorMsg(errorHandler(error))
                // store.commit('setMessage', errorHandler(error))
                // store.commit('decrementLoader')
                return Promise.reject(error)
            }
        )
    return instance
}

