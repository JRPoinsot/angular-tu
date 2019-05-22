import { FormControl } from '@angular/forms';

export class CustomValidators {

    /**
     * Function to control email with custom validator
     *
     * @param control
     *
     * @returns {{customEmail: boolean}}
     */
    static customEmail(control: FormControl) {
        // email regex
        const regex = /^\w+\.\w+@custom\.com$/;

        // returns control
        return regex.test(control.value) ? null : {
            customEmail: true
        };
    }
}
