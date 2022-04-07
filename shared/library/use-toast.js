import { toast } from 'react-toastify';
import constants from '@spo/config/constants';
/**
 * ****************************************************************************
 * DUNGNT UseAlert CODE
 * use-alert.js
 *
 * description		:
 * created at		:	2020-11-27
 * created by		:	DungNT
 * package			:	spo\shared\library\use-alert.js
 * copyright			:	Copyright (c) DungNT
 * version			:	1.0.0
 * ****************************************************************************
 */
export const useToast = (msg = 'Outfiz', status = 'success', option = {}) => {
    switch (status) {
        case constants.TOAST_TYPE.SUCCESS:
            toast.success(msg, option);
            break;
        case constants.TOAST_TYPE.ERROR:
            toast.error(msg, option);
            break;
        case constants.TOAST_TYPE.WARNING:
            toast.warn(msg, option);
            break;
        default:
            toast(msg, option);
            break;
    }
};
export default useToast;
