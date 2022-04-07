import SpoLayout from '@spo/containers/layout/spo-layout';
import axios from 'axios';
import dynamic from 'next/dynamic';

const url = process.env.API_URL;

const PolicyContainer = dynamic(() => import('@spo/containers/policy'));

const MemberPolicy = ({ data }) => {
    console.log(data);
    return <PolicyContainer content={data?.MemberPolicy} />;
};
MemberPolicy.getInitialProps = async (context) => {
    const data = await axios
        .get(`${url}/master/settings/member-policy`)
        .then((res) => res.data)
        .catch((err) => {
            console.log('Error In Member Policy Page:', err);
            return {};
        });
    return {
        data,
    };
};
MemberPolicy.Layout = SpoLayout;
export default MemberPolicy;
