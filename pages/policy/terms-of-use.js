import dynamic from 'next/dynamic';
import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';

const url = process.env.API_URL;
const PolicyContainer = dynamic(() => import('@spo/containers/policy'));

const TermsOfUse = ({ data }) => {
    return <PolicyContainer content={data?.TermsOfUse} />;
};

TermsOfUse.Layout = SpoLayout;
TermsOfUse.getInitialProps = async (context) => {
    const data = await axios.get(`${url}/master/settings/terms-of-use`)
        .then((res) => res.data)
        .catch((err) => {
            console.log('Error In Term Of Use Policy Page:', err);
            return {};
        });
    return {
        data,
    };
};
export default TermsOfUse;
