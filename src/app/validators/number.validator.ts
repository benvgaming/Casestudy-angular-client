import { AbstractControl } from '@angular/forms';
export function ValidateNumber(control: AbstractControl): { invalidNumber: boolean } | null {
    const NUMBER_REGEXP = /^\d+$/;
    return !NUMBER_REGEXP.test(control.value) ? { invalidNumber: true } : null;
} // ValidatePhone