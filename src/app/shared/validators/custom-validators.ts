import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static soloNumeros(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return null

        const regex = /^[0-9]+$/;
        return regex.test(control.value) ? null : { soloNumeros: true }

    }

    static soloLetras(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return null

        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(control.value) ? null : { soloLetras: true }
    }

    static direcciones(control: AbstractControl): ValidationErrors | null {
        if (!control.value) return null

        const regex = /^[a-zA-Z0-9\s]+$/;
        return regex.test(control.value) ? null : { direcciones: true }
    }

}