import {Notify} from "notiflix/build/notiflix-notify-aio";
import {Confirm} from 'notiflix/build/notiflix-confirm-aio';

export default new class AlertService {

    success(message){
        Notify.success(message, {
            position: "center-top"
        });
    }

    failure(message){
        Notify.failure(message, {
            position: "center-top"
        });
    }

    info(message){
        Notify.info(message, {
            position: "center-top"
        });
    }

    warning(message){
        Notify.warning(message, {
            position: "center-top"
        });
    }


    confirm(titleTxt, messageTxt, yesTxt, noTxt, successCallback, errorCallback, options){
        Confirm.show(
            titleTxt,
            messageTxt,
            yesTxt,
            noTxt,
            successCallback,
            errorCallback,
            {
                width: '500px',
                titleFontSize: '18px',
                messageFontSize: '18px',
                buttonFontSize: "17px",
                titleColor: '#2269f4',
                okButtonColor: '#fffff',
                okButtonBackground: '#2269f4'
            }
        );
    }
}
