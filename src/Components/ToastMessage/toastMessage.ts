import { ToastOptions, toast } from 'react-toastify';
import { toastTypes } from '../../Constants/constants';

const tsConfig: ToastOptions = {
    position: "bottom-left",
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
};

const showMessageToast = (type: string, message: string, timeout: number = 1500) => {
    toast.dismiss();
    setTimeout(() => {
        switch (type) {
            case toastTypes.INFO: toast.info(message, { ...tsConfig, autoClose: timeout });
                break;
            case toastTypes.SUCCESS: toast.success(message, { ...tsConfig, autoClose: timeout });
                break;
            case toastTypes.ERROR: toast.error(message, { ...tsConfig, autoClose: timeout });
                break;
            case toastTypes.WARN: toast.warn(message, { ...tsConfig, autoClose: timeout });
                break;
            default: console.log('No such toast Type');
        }
    },250);
}
export default showMessageToast;