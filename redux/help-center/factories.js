import axios from 'axios';

const url = process.env.API_URL;

const Factories = {
    getFaq: async (keyword) => {
        return await axios
            .get(`${url}/master/faq`, {
                params: {
                    Search: keyword,
                },
            })
            .then((res) => res)
            .catch((err) => {
                return {};
            });
    },
};

export default Factories;
