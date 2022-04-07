import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import dynamic from 'next/dynamic';

const url = process.env.API_URL;
const PolicyContainer = dynamic(() => import('@spo/containers/policy'));

const SalesPolicy = ({ data }) => {
    return <PolicyContainer content={data?.SalesPolicy} />;
};
SalesPolicy.getInitialProps = async (context) => {
    const data = await axios
        .get(`${url}/master/settings/sales-policy`)
        .then((res) => res.data)
        .catch((err) => {
            console.log('Error In Sales Policy Page:', err);
            return {};
        });
    return {
        data,
    };
};
SalesPolicy.Layout = SpoLayout;
export default SalesPolicy;
