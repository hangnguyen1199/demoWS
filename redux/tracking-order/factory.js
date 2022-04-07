import axios from 'axios'

let URL = process.env.API_URL
const factories = {
    getTrackingOrder: (payload) => {
        return axios({
            method: 'GET',
            url: `${URL}/online/order/tracking`,
            params: payload
        })
    },
}

export default factories
