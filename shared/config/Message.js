export const GetMsg = (msgNo) => {
    let index = Message.findIndex((x) => x.Id == msgNo);
    if (index == -1) {return "";}
    return Message[index]["Content"];
};
const Message = [
    {
        "Id": "C001",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có thực sự muốn lưu dữ liệu này không?"
    },
    {
        "Id": "C002",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có thực sự muốn xóa dữ liệu này không?"
    },
    {
        "Id": "C003",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Đã lưu dữ liệu thành công, bạn có muốn trở về trang danh sách không?"
    },
    {
        "Id": "C004",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Đã xóa dữ liệu thành công, bạn có muốn trở về trang danh sách không?"
    },
    {
        "Id": "C005",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có thật sự muốn reset mật khẩu cho tài khoản này không?"
    },
    {
        "Id": "C006",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn thay đổi mật khẩu không?"
    },
    {
        "Id": "C007",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Việc nhắc nhở sẽ được thực hiện tự động bởi hệ thống. Bạn có chắc chắn muốn tiếp tục nhắc nhở thủ công không?"
    },
    {
        "Id": "C008",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn xác nhận đã thanh toán cho đơn hàng này không?"
    },
    {
        "Id": "C009",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn mở khóa tài khoản này không?"
    },
    {
        "Id": "C010",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn gửi thông báo cho tất cả khách hàng?"
    },
    {
        "Id": "C011",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn gửi thông tin đã nhập đến khách hàng không?"
    },
    {
        "Id": "C012",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn đã thực hiện hoạt động này 1 lần rồi, bạn có muốn thực hiện lại 1 lần nữa không?"
    },
    {
        "Id": "C013",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Đã gửi đến tất cả khách hàng thành công, bạn có muốn download kết quả gửi không?"
    },
    {
        "Id": "C014",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn xác thực cho tài khoản này không?"
    },
    {
        "Id": "C015",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn khoá tài khoản này không?"
    },
    {
        "Id": "C016",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn đưa tài khoản này vào blacklist hay không?"
    },
    {
        "Id": "C017",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn xoá tài khoản này khỏi blacklist hay không?"
    },
    {
        "Id": "C018",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn gửi thông báo tin tức khuyến mãi này đến khách hàng đã chọn không?"
    },
    {
        "Id": "C019",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn đã thực hiện hoạt động này 1 lần rồi, bạn có muốn thực hiện lại 1 lần nữa không?"
    },
    {
        "Id": "C020",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có thực sự muốn reset số lần đã gọi API về 0 hay không? Khi reset về 0, batch sẽ tự động gọi lại API này."
    },
    {
        "Id": "C021",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có thực sự muốn reset việc gửi mail này không? Khi reset, batch sẽ tự động gửi lại email này."
    },
    {
        "Id": "C022",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có thực sự muốn reset việc gửi thông báo này không? Khi reset, batch sẽ tự động gửi lại thông báo này."
    },
    {
        "Id": "C023",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có muốn tiếp nhận hỗ trợ này không?"
    },
    {
        "Id": "C024",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có muốn thoát khỏi hội thoại này không?"
    },
    {
        "Id": "C025",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có  muốn kết thúc lần hỗ trợ này không?"
    },
    {
        "Id": "C026",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có thực sự muốn kết thúc phản hồi/góp ý/khiếu nại này không?"
    },
    {
        "Id": "C027",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có thực sự muốn thay đổi loại của cuộc hội thoại này không?"
    },
    {
        "Id": "C028",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Sau khi xác nhận, đơn hàng sẽ không thể thay đổi dược nữa, bạn có muốntiếp tục không?"
    },
    {
        "Id": "C029",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Sau khi xác nhận thanh toán, đơn hàng sẽ tự động được xác nhận và không thể thay đổi dược nữa, bạn có muốntiếp tục không?"
    },
    {
        "Id": "C030",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn huỷ đơn hàng này không?"
    },
    {
        "Id": "C031",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Sau khi xác nhận đơn hàng đã hoàn thành, hệ thống sẽ tiến hành tích luỹ điểm cho khách hàng, bạn có muốn tiếp tục không?"
    },
    {
        "Id": "C032",
        "Type": 1,
        "Title": "Confirm",
        "Content": "Bạn có chắc chắn muốn thay đổi trạng thái của đơn hàng này không?"
    },
    {
        "Id": "E001",
        "Type": 4,
        "Title": "Error",
        "Content": "Nội dung này không được để trống."
    },
    {
        "Id": "E002",
        "Type": 4,
        "Title": "Error",
        "Content": "Email không đúng định dạng."
    },
    {
        "Id": "E003",
        "Type": 4,
        "Title": "Error",
        "Content": "Ngày tháng không đúng định dạng."
    },
    {
        "Id": "E004",
        "Type": 4,
        "Title": "Error",
        "Content": "Đường dẫn sai định dạng."
    },
    {
        "Id": "E005",
        "Type": 4,
        "Title": "Error",
        "Content": "Bạn không được phép nhập quá {0} kí tự."
    },
    {
        "Id": "E006",
        "Type": 4,
        "Title": "Error",
        "Content": "Bạn phải nhập tối thiểu {1} kí tự."
    },
    {
        "Id": "E007",
        "Type": 4,
        "Title": "Error",
        "Content": "Giá trị này phải lớn hơn hoặc bằng {2}."
    },
    {
        "Id": "E008",
        "Type": 4,
        "Title": "Error",
        "Content": "Giá trị này phải nhỏ hơn hoặc bằng {3}."
    },
    {
        "Id": "E009",
        "Type": 4,
        "Title": "Error",
        "Content": "Số điện thoại sai định dạng."
    },
    {
        "Id": "E010",
        "Type": 4,
        "Title": "Error",
        "Content": "Thời gian bắt đầu phải bé hơn thời gian kết thúc."
    },
    {
        "Id": "E011",
        "Type": 4,
        "Title": "Error",
        "Content": "Giá trị này đang bị trùng lặp."
    },
    {
        "Id": "E012",
        "Type": 4,
        "Title": "Error",
        "Content": "Tài khoản không tồn tại."
    },
    {
        "Id": "E013",
        "Type": 4,
        "Title": "Error",
        "Content": "Mật khẩu không chính xác."
    },
    {
        "Id": "E014",
        "Type": 4,
        "Title": "Error",
        "Content": "Số điện thoại hoặc mật khẩu không chính xác, vui lòng nhập lại."
    },
    {
        "Id": "E015",
        "Type": 4,
        "Title": "Error",
        "Content": "Tên đăng nhập này đã được đăng ký. Vui lòng sử dụng Tên đăng nhập khác!"
    },
    {
        "Id": "E016",
        "Type": 4,
        "Title": "Error",
        "Content": "Hệ thống phải tồn tại ít nhất 1 tài khoản để sử dụng."
    },
    {
        "Id": "E017",
        "Type": 4,
        "Title": "Error",
        "Content": "Mật khẩu phải chứa ít nhất 8 ký tự, có chứa chữ hoa, chữ thường và ký tự đặc biệt."
    },
    {
        "Id": "E018",
        "Type": 4,
        "Title": "Error",
        "Content": "Mật khẩu xác nhận không trùng khớp, vui lòng kiểm tra lại."
    },
    {
        "Id": "E019",
        "Type": 4,
        "Title": "Error",
        "Content": "Tên đăng nhập phải có ít nhất 4 ký tự, chỉ được nhập các ký tự chữ cái, chữ số và các dấu chấm (.), gạch nối (-), gạch dưới (_)."
    },
    {
        "Id": "E020",
        "Type": 4,
        "Title": "Error",
        "Content": "File vượt quá dung lượng cho phép."
    },
    {
        "Id": "E021",
        "Type": 4,
        "Title": "Error",
        "Content": "File không đúng định dạng."
    },
    {
        "Id": "E022",
        "Type": 4,
        "Title": "Error",
        "Content": "Không thể upload quá {0} file cùng lúc."
    },
    {
        "Id": "E023",
        "Type": 4,
        "Title": "Error",
        "Content": "Có lỗi trong quá trình tải file, vui lòng thử lại."
    },
    {
        "Id": "E024",
        "Type": 4,
        "Title": "Error",
        "Content": "Vui lòng chọn file tải lên."
    },
    {
        "Id": "E025",
        "Type": 4,
        "Title": "Error",
        "Content": "Kích thước hình ảnh không đúng yêu cầu."
    },
    {
        "Id": "E026",
        "Type": 4,
        "Title": "Error",
        "Content": "Không thể thực hiện thao tác này, vì số item hiển thị trên trang chủ đã đạt mức tối thiểu."
    },
    {
        "Id": "E027",
        "Type": 4,
        "Title": "Error",
        "Content": "Link này chỉ có thể chứa chuỗi không dấu bao gồm chữ thường, chữ hoa & dấu gạch nối (-)."
    },
    {
        "Id": "E028",
        "Type": 4,
        "Title": "Error",
        "Content": "Lưu dữ liệu không thành công, vui lòng thử lại."
    },
    {
        "Id": "E029",
        "Type": 4,
        "Title": "Error",
        "Content": "Xóa dữ liệu không thành công, vui lòng thử lại."
    },
    {
        "Id": "E030",
        "Type": 4,
        "Title": "Error",
        "Content": "Không thể hiển thị số lượng kết quả quá lớn."
    },
    {
        "Id": "E031",
        "Type": 4,
        "Title": "Error",
        "Content": "Có lỗi trong quá trình tạo file, vui lòng thử lại."
    },
    {
        "Id": "E032",
        "Type": 4,
        "Title": "Error",
        "Content": "Dữ liệu này đã tồn tại trong hệ thống"
    },
    {
        "Id": "E033",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã của thông báo đã tồn tại trong hệ thống"
    },
    {
        "Id": "E034",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã của chức năng đã tồn tại trong hệ thống"
    },
    {
        "Id": "E035",
        "Type": 4,
        "Title": "Error",
        "Content": "Đang có tài khoản thuộc nhóm này, nên không thể xóa, hãy xóa hết tài khoản của nhóm này trước"
    },
    {
        "Id": "E036",
        "Type": 4,
        "Title": "Error",
        "Content": "Không có dữ liệu export"
    },
    {
        "Id": "E037",
        "Type": 4,
        "Title": "Error",
        "Content": "Chức năng này hiện không hoạt động trên mobile"
    },
    {
        "Id": "E038",
        "Type": 4,
        "Title": "Error",
        "Content": "Email này không tồn tại"
    },
    {
        "Id": "E039",
        "Type": 4,
        "Title": "Error",
        "Content": "Quá hạn để thay đổi mật khẩu"
    },
    {
        "Id": "E040",
        "Type": 4,
        "Title": "Error",
        "Content": "Email này đã được đăng ký. Vui lòng sử dụng email khác!"
    },
    {
        "Id": "E041",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã của nhóm tài khoản đã tồn tại trong hệ thống"
    },
    {
        "Id": "E042",
        "Type": 4,
        "Title": "Error",
        "Content": "Số tiền chuyển khoản không chính xác"
    },
    {
        "Id": "E043",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã OTP không chính xác hoặc hết hạn"
    },
    {
        "Id": "E044",
        "Type": 4,
        "Title": "Error",
        "Content": "Email hoặc số điện thoại không đúng"
    },
    {
        "Id": "E045",
        "Type": 4,
        "Title": "Error",
        "Content": "Bạn đã yêu cầu OTP quá nhiều lần, vui lòng thử lại sau"
    },
    {
        "Id": "E046",
        "Type": 4,
        "Title": "Error",
        "Content": "Số điện thoại này đã được đăng ký. Vui lòng sử dụng số điện thoại khác!"
    },
    {
        "Id": "E047",
        "Type": 4,
        "Title": "Error",
        "Content": "Chúng tôi đã nhận được đánh giá của tài khoản này trước đó rồi"
    },
    {
        "Id": "E048",
        "Type": 4,
        "Title": "Error",
        "Content": "Hoá đơn không tồn tại"
    },
    {
        "Id": "E049",
        "Type": 4,
        "Title": "Error",
        "Content": "Câu hỏi bảo mật đang được sử dụng"
    },
    {
        "Id": "E050",
        "Type": 4,
        "Title": "Error",
        "Content": "Yêu cầu nhập Captcha"
    },
    {
        "Id": "E051",
        "Type": 4,
        "Title": "Error",
        "Content": "Vượt quá số ký tự cho phép"
    },
    {
        "Id": "E052",
        "Type": 4,
        "Title": "Error",
        "Content": "Captcha không hợp lệ"
    },
    {
        "Id": "E053",
        "Type": 4,
        "Title": "Error",
        "Content": "Vượt quá số lần có thể đăng ký tài khoản trong 1 ngày"
    },
    {
        "Id": "E054",
        "Type": 4,
        "Title": "Error",
        "Content": "Tài khoản đã bị tạm khoá, vui lòng liên hệ ngay với bộ phận Chăm Sóc Khách Hàng của chúng tôi theo số điện thoại 090.1800.888  (Bấm số 8) để được hỗ trợ."
    },
    {
        "Id": "E055",
        "Type": 4,
        "Title": "Error",
        "Content": "Vượt quá số lần cho phép chỉnh sửa trong ngày"
    },
    {
        "Id": "E056",
        "Type": 4,
        "Title": "Error",
        "Content": "Vui lòng nhập nhận xét đánh giá khi từ chối xác minh tài khoản."
    },
    {
        "Id": "E057",
        "Type": 4,
        "Title": "Error",
        "Content": "Không thể gửi thông báo lúc này do trạng thái chương trình khuyến mãi đang \"Ẩn\", vui lòng chuyển sang trạng thái \"Hiển thị\" và thử lại."
    },
    {
        "Id": "E058",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã quét được đã hết hạn hoặc không chính xác"
    },
    {
        "Id": "E059",
        "Type": 4,
        "Title": "Error",
        "Content": "Không thể tặng nhiều hơn số điểm bạn sở hữu. Vui lòng kiểm tra lại!"
    },
    {
        "Id": "E060",
        "Type": 4,
        "Title": "Error",
        "Content": "Số điện thoại nhận không đúng hoặc không sử dụng FM Plus!"
    },
    {
        "Id": "E061",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã số mua hàng đã được sử dụng hoặc không thuộc sở hữu của bạn"
    },
    {
        "Id": "E062",
        "Type": 4,
        "Title": "Error",
        "Content": "Không có khách hàng nào được gửi"
    },
    {
        "Id": "E063",
        "Type": 4,
        "Title": "Error",
        "Content": "Giá trị bắt đầu phải bé hơn giá trị kết thúc."
    },
    {
        "Id": "E064",
        "Type": 4,
        "Title": "Error",
        "Content": "Tài khoản của bạn đã bị đưa vào blacklist, vui lòng liên hệ ngay với bộ phận Chăm Sóc Khách Hàng của chúng tôi theo số điện thoại 090.1800.888  (Bấm số 8) để được hỗ trợ"
    },
    {
        "Id": "E065",
        "Type": 4,
        "Title": "Error",
        "Content": "Giá trị này không liên tiếp nhau"
    },
    {
        "Id": "E066",
        "Type": 4,
        "Title": "Error",
        "Content": "Phản ánh, khiếu nại của bạn đang được nhân viên chắm sóc khách hàng xử lý, nên không thể chỉnh sửa được"
    },
    {
        "Id": "E067",
        "Type": 4,
        "Title": "Error",
        "Content": "Phản ánh,khiếu nại của bạn đang được nhân viên chắm sóc khách hàng xử lý, nên không thể  xoá được"
    },
    {
        "Id": "E068",
        "Type": 4,
        "Title": "Error",
        "Content": "Góp ý của bạn đang được nhân viên chắm sóc khách hàng xử lý, nên không thể chỉnh sửa được"
    },
    {
        "Id": "E069",
        "Type": 4,
        "Title": "Error",
        "Content": "Góp ý của bạn đang được nhân viên chắm sóc khách hàng xử lý, nên không thể xoá được"
    },
    {
        "Id": "E070",
        "Type": 4,
        "Title": "Error",
        "Content": "Không tìm thấy yêu cầu chăm sóc khách hàng"
    },
    {
        "Id": "E071",
        "Type": 4,
        "Title": "Error",
        "Content": "Yêu cầu chắm sóc khách hàng đang được xử lý bởi nhân viên chăm sóc kách hàng khác"
    },
    {
        "Id": "E072",
        "Type": 4,
        "Title": "Error",
        "Content": "Yêu cầu chắm sóc khách hàng đã hoàn thành"
    },
    {
        "Id": "E073",
        "Type": 4,
        "Title": "Error",
        "Content": "Không tồn tại đánh giá cho đơn hàng này"
    },
    {
        "Id": "E074",
        "Type": 4,
        "Title": "Error",
        "Content": "Không tồn tại góp ý, phản ảnh, khiếu nại"
    },
    {
        "Id": "E075",
        "Type": 4,
        "Title": "Error",
        "Content": "Không tồn tại đánh giá cho góp ý, phản ảnh, khiếu nại này"
    },
    {
        "Id": "E076",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã nhân viên đã tồn tại trong hệ thống"
    },
    {
        "Id": "E077",
        "Type": 4,
        "Title": "Error",
        "Content": "Đã vượt quá số lần chỉnh sửa tên đăng nhập trong ngày"
    },
    {
        "Id": "E078",
        "Type": 4,
        "Title": "Error",
        "Content": "Đã vượt quá số lần chỉnh sửa giới tính trong ngày"
    },
    {
        "Id": "E079",
        "Type": 4,
        "Title": "Error",
        "Content": "Đã vượt quá số lần chỉnh sửa ngày sinh trong ngày"
    },
    {
        "Id": "E080",
        "Type": 4,
        "Title": "Error",
        "Content": "Đã vượt quá số lần chỉnh sửa địa chỉ trong ngày"
    },
    {
        "Id": "E081",
        "Type": 4,
        "Title": "Error",
        "Content": "Không thể xoá nội dung đã được đăng"
    },
    {
        "Id": "E082",
        "Type": 4,
        "Title": "Error",
        "Content": "Không thể chỉnh sửa nội dung đã được đăng"
    },
    {
        "Id": "E083",
        "Type": 4,
        "Title": "Error",
        "Content": "Đã vượt quá số lần đăng cho phép"
    },
    {
        "Id": "E084",
        "Type": 4,
        "Title": "Error",
        "Content": "Thời gian đã chọn phải lớn hơn thời gian hiện tại"
    },
    {
        "Id": "E085",
        "Type": 4,
        "Title": "Error",
        "Content": "Tài khoản đã bị tạm khoá, vui lòng liên hệ quản trị hệ thống để mở lại tài khoản."
    },
    {
        "Id": "E086",
        "Type": 4,
        "Title": "Error",
        "Content": "Dữ liệu không tồn tại"
    },
    {
        "Id": "E087",
        "Type": 4,
        "Title": "Error",
        "Content": "Đơn hàng không được phép hủy"
    },
    {
        "Id": "E088",
        "Type": 4,
        "Title": "Error",
        "Content": "Giá của sản phẩm đã thay đổi, vui lòng cập nhật lại giỏ hàng"
    },
    {
        "Id": "E089",
        "Type": 4,
        "Title": "Error",
        "Content": "Đã có lỗi xảy ra trong quá trình mua hàng"
    },
    {
        "Id": "E090",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã SKU đã tồn tại trong hệ thống, vui lòng kiểm tra lại."
    },
    {
        "Id": "E091",
        "Type": 4,
        "Title": "Error",
        "Content": "Bạn phải nhập thông tin số lượng sản phẩm"
    },
    {
        "Id": "E092",
        "Type": 4,
        "Title": "Error",
        "Content": "Không đủ điểm để thực hiện đơn hàng này, vui lòng kiểm tra lại"
    },
    {
        "Id": "E093",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã giảm giá đang sử dụng trong đơn hàng này đã được sử dụng hoặc đã hết hạn, vui lòng kiểm tra lại"
    },
    {
        "Id": "E094",
        "Type": 4,
        "Title": "Error",
        "Content": "Không tìm thấy đơn hàng đang xử lý, có thể đơn hàng đã bị xoá, vui lòng kiểm tra lại"
    },
    {
        "Id": "E095",
        "Type": 4,
        "Title": "Error",
        "Content": "Không thể thay đổi trạng thái của đơn hàng này"
    },
    {
        "Id": "E096",
        "Type": 4,
        "Title": "Error",
        "Content": "Mã miễn phí vận chuyển đang sử dụng trong đơn hàng này đã được sử dụng hoặc đã hết hạn, vui lòng kiểm tra lại"
    },
    {
        "Id": "E097",
        "Type": 4,
        "Title": "Error",
        "Content": "Trong đơn hàng có sản phẩm không còn đủ trong kho, vui lòng kiểm tra lại"
    },
    {
        "Id": "E098",
        "Type": 4,
        "Title": "Error",
        "Content": "Giá khuyến mãi phải nhỏ hơn giá hiện tại"
    },
    {
        "Id": "E099",
        "Type": 4,
        "Title": "Error",
        "Content": "Số lượng sản phẩm khuyến mãi phải nhỏ hơn số lượng sản phẩm hiện tại"
    },
    {
        "Id": "E100",
        "Type": 4,
        "Title": "Error",
        "Content": "Khung giờ bạn chọn đã có chương trình khuyến mãi khác diễn ra"
    },
    {
        "Id": "E101",
        "Type": 4,
        "Title": "Error",
        "Content": "Đã có giao diện khác hiển thị trong khoảng thời gian đã chọn"
    },
    {
        "Id": "E402",
        "Type": 4,
        "Title": "Error",
        "Content": "Bạn cần đăng nhập để thực hiện hành động này"
    },
    {
        "Id": "E403",
        "Type": 4,
        "Title": "Error",
        "Content": "Bạn không có quyền để thực hiện hành động này"
    },
    {
        "Id": "E404",
        "Type": 4,
        "Title": "Error",
        "Content": "Không tìm thấy"
    },
    {
        "Id": "E500",
        "Type": 4,
        "Title": "Error",
        "Content": "Hệ thống bị lỗi, vui lòng thử lại sau."
    },
    {
        "Id": "S001",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã lưu dữ liệu thành công."
    },
    {
        "Id": "S002",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã xóa dữ liệu thành công."
    },
    {
        "Id": "S003",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã tạo file javascript thành công"
    },
    {
        "Id": "S004",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã build lại file chức năng hệ thống thành công"
    },
    {
        "Id": "S005",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã khôi phục mật khẩu thành công"
    },
    {
        "Id": "S006",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã nhắc nhở chuyển khoản cho đơn hàng thành công"
    },
    {
        "Id": "S007",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã xác nhận đơn hàng đã thanh toán thành công"
    },
    {
        "Id": "S008",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã sao chép dữ liệu thành công"
    },
    {
        "Id": "S009",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã gửi thông báo thành công đến khách hàng"
    },
    {
        "Id": "S010",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã gửi đến tất cả khách hàng thành công"
    },
    {
        "Id": "S011",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã xác nhận đơn hàng thành công"
    },
    {
        "Id": "S012",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã xác nhận thanh toán đơn hàng thành công"
    },
    {
        "Id": "S013",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã huỷ đơn hàng thành công"
    },
    {
        "Id": "S014",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã xác nhận hoàn thành đơn hàng thành công"
    },
    {
        "Id": "S015",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã thay đổi trạng thái đơn hàng thành công"
    },
    {
        "Id": "S016",
        "Type": 2,
        "Title": "Success",
        "Content": "Đã import dữ liệu từ file đã chọn thành công"
    },
    {
        "Id": "W001",
        "Type": 3,
        "Title": "Warning",
        "Content": "Việc tạo lại file javascript này có thể gây ra một số thay đổi không mong muốn cho hệ thống, bạn có muốn tiếp tục không?"
    },
    {
        "Id": "W002",
        "Type": 3,
        "Title": "Warning",
        "Content": "Việc build lại file chức năng của hệ thống có thể gây ra một số thay đổi không mong muốn, và phải tiến hành build lại toàn bộ project, bạn có muốn tiếp tục không?"
    },
    {
        "Id": "W003",
        "Type": 3,
        "Title": "Warning",
        "Content": "Bạn đã thay đổi link SEO của chương trình khuyến mãi này, nếu tiếp tục lưu tất cả dữ liệu SEO của chương trình này sẽ bị mất, bạn có muốn tiếp tục không ?"
    },
    {
        "Id": "W004",
        "Type": 3,
        "Title": "Warning",
        "Content": "Mã giảm giá của bạn giảm trên 50%, bạn có muốn tiếp tục tạo mã giảm giá này không?"
    },
    {
        "Id": "W005",
        "Type": 3,
        "Title": "Warning",
        "Content": "Dữ liệu sẽ được import từ file đã chọn, vui lòng đảm bảo dữ liệu trong file đống với file mẫu đã được cung cấp. Tiếp tục?"
    }
]
export default Message