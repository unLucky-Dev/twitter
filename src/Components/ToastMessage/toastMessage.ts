import { ToastOptions, toast } from 'react-toastify';
import { toastTypes } from '../../Constants/constants';

const tsConfig: ToastOptions = {
    position: "bottom-left",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
};

const showMessageToast = (type: string, message: string, timeout: number = 1000) => {
    toast.dismiss();
    setTimeout(() => {
        switch (type) {
            case toastTypes.INFO: toast.info(message, { ...tsConfig, autoClose: timeout });
                break;
            case toastTypes.SUCCESS: toast.success(message, { ...tsConfig, autoClose: timeout });
                break;
            case toastTypes.ERROR: toast.error(message, { ...tsConfig, autoClose: timeout });
                break;
            default: console.log('No such toast Type');
        }
    },250);
}
export default showMessageToast;