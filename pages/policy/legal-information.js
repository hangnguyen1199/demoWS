import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import dynamic from 'next/dynamic';

const url = process.env.API_URL;
const PolicyContainer = dynamic(() => import('@spo/containers/policy'));

const LegalInformation = ({ data }) => {
    return <PolicyContainer content={data?.LegalInformation} />;
};
LegalInformation.getInitialProps = async (context) => {
    const data = await axios
        .get(`${url}/master/settings/legal-information`)
        .then((res) => res.data)
        .catch((err) => {
            console.log('Error In Legal Information Page:', err);
            return {};
        });
    return {
        data,
    };
};
LegalInformation.Layout = SpoLayout;
export default LegalInformation;
