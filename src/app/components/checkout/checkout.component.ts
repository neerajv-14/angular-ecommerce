import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartServiceService } from '../../services/cart-service.service';
import { FormService } from '../../services/form.service';
import { Country } from '../../../common/country';
import { State } from '../../../common/state';
import { CustomValidators } from '../../validators/customValidators';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{


    checkoutFormGroup!: FormGroup;
    totalPrice: number =0;
    totalQuantity: number =0;
    creditCardYears: number [] = [];
    creditCardMonths: number [] = [];
    countries : Country [] = [];
    shippingAddressStates: State [] = [];
    billingAddressStates: State [] = [];

    constructor(private formBuilder: FormBuilder,private cartService: CartServiceService,private formService: FormService){

    }
    ngOnInit(): void {

      // we need mutliple forms and single submit button. So, grouping all those forms in one group and (ngSubmit) on that form 
      this.checkoutFormGroup = this.formBuilder.group({
        customer: this.formBuilder.group({
          // Initializing with empty strings and validations
          firstName: new FormControl('',[Validators.required, Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
          lastName: new FormControl('',[Validators.required, Validators.minLength(2),CustomValidators.notOnlyWhiteSpace]),
          email: new FormControl('',
            [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
          ),
        }),
        shippingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipCode: [''],
        }),
        billingAddress: this.formBuilder.group({
          street: [''],
          city: [''],
          state: [''],
          country: [''],
          zipCode: [''],
        }),
        creditCard: this.formBuilder.group({
          cardType: [''],
          nameOnCard: [''],
          cardNumber: [''],
          securityCode: [''],
          expirationMonth: [''],
          expirationYear: ['']
        })
      })

      // getting years, months for credit card info

      this.formService.getCreditCardMonths(new Date().getMonth() + 1).subscribe((data)=>{
        this.creditCardMonths = data;
      })

      this.formService.getCreditCardYears().subscribe((data)=>{
        this.creditCardYears = data;
      })

      // populate countries

      this.formService.getCountries().subscribe((data)=>{
        this.countries = data;
      })
    }

      onSubmit(){
        
        //console.log(this.checkoutFormGroup.get('customer')!.value);
        console.log(this.checkoutFormGroup.controls['customer'].value);
        
        if(this.checkoutFormGroup.invalid){
          // so it displays all error messages at once.
          this.checkoutFormGroup.markAllAsTouched();
        }
      }


      // to use in html: just write firstName with no paranthesis (as it is getter method)
      get firstName(){
        return this.checkoutFormGroup.get('customer.firstName');
      }

      get lastName(){
        return this.checkoutFormGroup.get('customer.lastName');
      }

      get email(){
        return this.checkoutFormGroup.get('customer.email');
      }

      copyShippingAddressToBillingAddress(event:any){
        if(event.target.checked){
          this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

          // copying all shipping address states to billing address states. as in billing html, it will go through billingAddressStates
          // as the object reference is different (though the content is same) , angular does not do auto copy. 
          // in country, it was same array, same reference, so copy works.
          this.billingAddressStates = this.shippingAddressStates;
        }
        else{
          this.checkoutFormGroup.controls['billingAddress'].reset();

          // resetting billing states
          this.billingAddressStates = [];
        }
      }


      // for current year: current month to december
      // for future years: all months
      handleMonthsAndYears(){
        const creditCardGroup = this.checkoutFormGroup.get('creditCard');
        const currentYear = new Date().getFullYear();
        const selectedYear =  creditCardGroup?.value.expirationYear;
        let startMonth!: number;
        if(currentYear == selectedYear){
          startMonth = new Date().getMonth() + 1;
        }
        else{
          startMonth = 1;
        }

        this.formService.getCreditCardMonths(startMonth).subscribe((data)=>{
          this.creditCardMonths = data;
        })
      }

      getStates(formGroupName: string){
        const formGroup = this.checkoutFormGroup.get(formGroupName);
        

        // in select of country, we wrote [ngValue] = country (saved as string). so fetching code from that object.
        const countryCode = formGroup?.value.country.code;

        this.formService.getStates(countryCode).subscribe((data)=>{
          if(formGroupName == 'shippingAddress'){
            this.shippingAddressStates = data;
          }
          else{
            this.billingAddressStates = data;
          }

          formGroup?.get('state')?.setValue(data[0]);
        })
    
      }

      

   
}
