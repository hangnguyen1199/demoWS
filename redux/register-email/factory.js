import Axios from 'axios'

const url = process.env.API_URL
const Factories = {
    registerEmail: async (data) => {
        return await Axios({
            method: 'POST',
            url: `${url}/users/notifications/received-register`,
            data: data,
        })
        
    },
}
export default Factories
