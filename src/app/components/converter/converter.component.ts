import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { uah } from 'src/app/shared/constants';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {

  public currencies!: Currency[];
  public form!: FormGroup;
  public toAmount!: number;
  public fromAmount!: number;
  private rate!: number;
  private sub!: Subscription;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.sub = this.currencyService.getCurrency()
      .subscribe(response => {
        this.currencies = response;
        this.currencies.push(uah)
        this.getRate();
      });

    this.form = new FormGroup({
      fromAmount: new FormControl(),
      fromCurrency: new FormControl('USD'),
      toAmount: new FormControl(),
      toCurrency: new FormControl('UAH')
    });
  }

  private getRate(): void {
    const koeff = new Map;
    this.currencies.forEach(item => koeff.set(item.ccy, ((+item.buy + +item.sale)/2)));
    const inputCur = this.form.controls['fromCurrency'].value;
    const outputCur = this.form.controls['toCurrency'].value;
    this.rate = koeff.get(inputCur) / koeff.get(outputCur);
  }

  public fromAmountChange(): void {
    this.getRate();
    this.toAmount = +(this.form.controls['fromAmount'].value * this.rate).toFixed(2);
    this.form.patchValue({'toAmount': this.toAmount});
  }

  public toAmountChange(): void {
    this.getRate();
    this.fromAmount = +(this.form.controls['toAmount'].value / this.rate).toFixed(2);
    this.form.patchValue({'fromAmount': this.fromAmount});
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
