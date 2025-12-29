import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators{
    // whitespace validation
    // check pass: return null otherwise return validation error
    static notOnlyWhiteSpace(control: FormControl): ValidationErrors | null{
        if(control.value.trim().length==0){
            return {'notOnlyWhiteSpace':true};
        }

        return null;
    }
}