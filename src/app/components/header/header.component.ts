import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from 'src/app/services/currency.service'
import { Currency } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public currencies!: Currency[];
  private sub!: Subscription;

  constructor(private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.sub = this.currencyService.getCurrency()
      .subscribe(response => {
        this.currencies = response
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}
