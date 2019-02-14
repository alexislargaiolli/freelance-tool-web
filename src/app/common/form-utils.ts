import { FormGroup, FormArray, FormControl } from '@angular/forms';

export function validateAllFormFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
            validateAllFormFields(control);
        }
    });
}

export function getModifiedFields(formGroup: FormGroup | FormArray, attributes = {}) {
    for (const [name, control] of Object.entries(formGroup.controls)) {
        if (control instanceof FormControl && control.dirty) {
            attributes[name] = control.value;
        } else if (control instanceof FormGroup) {
            const subAttributes = getModifiedFields(control, {});
            if (Object.values(subAttributes).length > 0) {
                attributes[name] = subAttributes;
            }
        } else if (control instanceof FormArray) {
            const subAttributes = getModifiedFields(control, {});
            attributes[name] = Object.values(subAttributes);
        }
    }
    return attributes;
}
