import { FormControl } from '@angular/forms';
export default class CustomValidators {

    static validateDateFormat(control: FormControl): {[key: string]: boolean} {
        const date = new Date(control.value as Date);
        const minDate = new Date(Date.now());
        if (date && date > minDate) {
            return null;
        }
        return {dateNotCorrected: true};
    }
}
