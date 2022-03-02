import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { KingsClosetFormService } from 'src/app/services/kings-closet-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
 

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];
  

  constructor(private formBuilder: FormBuilder,
              private kingsClosetFormService: KingsClosetFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });


    //populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth:" + startMonth);

    this.kingsClosetFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months:" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
    
      //populate countries
      this.kingsClosetFormService.getCountries().subscribe(
        data => {
          console.log("Retrieved countries:" + JSON.stringify(data));
          this.countries = data;
        }
      )

    //populate credit card years
    this.kingsClosetFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years:" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )



  }

  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value);

    console.log("The email Address is" + this.checkoutFormGroup.get('customer').value.email);

    console.log("The shipping Address country is" + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping Address country is" + this.checkoutFormGroup.get('shippingAddress').value.state.name);
  }

  copyShippingAddressToBillingAddress(event) {
 
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
 
      // bug fix for states
      this.billingAddressStates = this.shippingAddressStates;
 
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
 
      // bug fix for states
      this.billingAddressStates = [];
    }
    
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');


    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    //if the current year equals the selected year,then start with current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.kingsClosetFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit Card months:" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  };

  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    

    console.log(`${formGroupName} country code: ${countryCode}`);

    this.kingsClosetFormService.getStates(countryCode).subscribe(
      data => {

        if(formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        //select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

}
