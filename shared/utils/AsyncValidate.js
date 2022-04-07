import CommonFactory from '../../redux/common/factory';

const AsyncValidate = async (values, dispatch, props, field) => {
    let err = {};
    let requests = Object.keys(values).map((type) => {
        return CommonFactory.checkInput({
            Type: type,
            Value: values[type],
        }).then((res) => {
            if (res?.data?.Data?.IsExisted == 1) {
                if (type == 'Phone') {
                    err[type] = 'Số điện thoại đã tồn tại';
                }
                if (type == 'Email') {
                    err[type] = 'Email đã tồn tại';
                }
                if (type == 'Username') {
                    err[type] = 'Tên đăng nhập đã tồn tại';
                }
            } else if (type == 'InviteCode') {
                err[type] = 'Mã giới thiệu không hợp lệ';
            }
        });
    });
    return Promise.all(requests).then((res) => {
        if (Object.keys(err).length > 0) {
            throw err;
        }
    });
};

export default AsyncValidate;
