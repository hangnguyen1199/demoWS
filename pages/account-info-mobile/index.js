import SpoLayout from '@spo/containers/layout/spo-layout';
import dynamic from 'next/dynamic';
import { routeGuard } from '../../shared/library/helper';

const AccountInfoMobileContainer = dynamic(() =>
    import('@spo/containers/account-info-mobile'),
);

const AccountInfoMobile = (props) => {
    return <AccountInfoMobileContainer />;
};

AccountInfoMobile.Layout = SpoLayout;

export default AccountInfoMobile;
