import axios from 'axios';

const url = process.env.API_URL;
const Factories = {
    getOrderByStatus: async (data) => {
        return axios.get(`${url}/online/order/get-by-status`, {
            params: data,
        });
    },
    cancelOrder: async (data) => {
        return axios.post(`${url}/online/order/cancel`, {
            ...data,
        });
    },
    getReviewDetail: async (data) => {
        return axios.get(`${url}/user/reviews/${data?.Id}`);
    },
    getOrderDetail: async (data) => {
        return axios.get(`${url}/online/order/order-info/`, {
            params: data,
        });
    },
    reviewOrder: async (data) => {
        const formData = new FormData();
        formData.append('OrderId', data.OrderId);
        data.ReviewId != undefined &&
            formData.append('ReviewId', data.ReviewId);
        formData.append('RateService', data.RateService);
        formData.append('RateShipment', data.RateShipment);

        if (data?.Files && data?.Files?.length > 0) {
            data.Files?.map((item, index) => {
                formData.append('Files', item);
                return item;
            });
        }

        if (data?.OrderDetailReviews?.length > 0) {
            data.OrderDetailReviews.forEach((item, index) => {
                formData.append(
                    `OrderDetailReviews[${index}][OrderDetailId]`,
                    item.OrderDetailId,
                );
                if (item.OrderDetailReviewId) {
                    formData.append(
                        `OrderDetailReviews[${index}][OrderDetailReviewId]`,
                        item.OrderDetailReviewId,
                    );
                }
                formData.append(
                    `OrderDetailReviews[${index}][Rate]`,
                    item.Rate,
                );
                formData.append(
                    `OrderDetailReviews[${index}][Content]`,
                    item.Content,
                );
                if (item?.FileIndexes) {
                    item.FileIndexes.map((fileIdx, i) => {
                        formData.append(
                            `OrderDetailReviews[${index}][FileIndexes][${i}]`,
                            fileIdx,
                        );
                        return fileIdx
                    });
                }

                if (item?.Attachments) {
                    item?.Attachments.map((file, idx) => {
                        formData.append(
                            `OrderDetailReviews[${index}][Attachments][${idx}][Id]`,
                            file.Id,
                        );
                        return file
                    });
                }
            });
        }
        return axios({
            method: 'POST',
            url: `${url}/user/reviews/order`,
            data: formData,
        });
    },
    receivedOrder: async (data) => {
        return axios.get(`${url}/online/order/product-received/`, {
            params: data,
        });
    },
    refundOrderRequest: async (data) => {
        const formData = new FormData();
        formData.append('OrderCode', data?.OrderCode);
        formData.append('RefundReason', data?.RefundReason);
        data?.Files?.map((file, index) => {
            formData.append('Files', file);
            return file
        });
        return axios({
            method: 'POST',
            url: `${url}/online/order/order-refund-request`,
            data: formData,
        });
    },
    getCancelReason: async () => {
        return axios.get(`${url}/master/library/cancel-reason/`);
    },
    onReOrder: async (data) => {
        return axios.get(`${url}/online/order/buy-again`, {
            params: data,
        });
    },
};
export default Factories;
