import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import dynamic from 'next/dynamic';

const url = process.env.API_URL;
const PolicyContainer = dynamic(() => import('@spo/containers/policy'));

const PrivacyPolicy = ({ data }) => {
    return <PolicyContainer content={data?.Privacy} />;
};
PrivacyPolicy.getInitialProps = async (context) => {
    const data = await axios
        .get(`${url}/master/settings/privacy`)
        .then((res) => res.data)
        .catch((err) => {
            console.log('Error In Privacy Policy Page:', err);
            return {};
        });
    return {
        data,
    };
};
PrivacyPolicy.Layout = SpoLayout;
export default PrivacyPolicy;
