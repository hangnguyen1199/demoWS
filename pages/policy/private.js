import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import dynamic from 'next/dynamic';

const url = process.env.API_URL;
const PolicyContainer = dynamic(() => import('@spo/containers/policy'));

const PrivatePolicy = ({ data }) => {
    return <PolicyContainer content={data?.PrivacyPolicy} />;
};
PrivatePolicy.getInitialProps = async (context) => {
    const data = await axios
        .get(`${url}/master/settings/private-policy`)
        .then((res) => res.data)
        .catch((err) => {
            console.log('Error In Private Policy Page:', err);
            return {};
        });
    return {
        data,
    };
};
PrivatePolicy.Layout = SpoLayout;
export default PrivatePolicy;
