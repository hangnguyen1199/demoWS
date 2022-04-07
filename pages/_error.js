import { useRouter } from 'next/router';

function Error({ statusCode }) {
    const router = useRouter();
    const onBack = () => {
        router.back();
    };
    return (
        <div className="_error ">
            <div className="container">
                <div className="statusCode col-12">{statusCode}</div>
                <div className="col-12">
                    <div className="title">
                        Lỗi! Trang này là không tìm thấy.
                    </div>
                    <div className="sub_title">
                        Chúng tôi không thể tìm thấy trang này. Bạn có thể{' '}
                        <span
                            className="font-weight-bold link-hover"
                            onClick={onBack}>
                            quay trở lại trang trước
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
