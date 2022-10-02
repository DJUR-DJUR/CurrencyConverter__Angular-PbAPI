import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { map, Observable } from "rxjs";
import { Currency } from "../shared/interfaces";

@Injectable({providedIn: 'root'})
export class CurrencyService {

  private API_URL = 'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';

  constructor(private http: HttpClient) {}

  getCurrency(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.API_URL)
    .pipe(map(currencies => currencies
      .filter((item: Currency) =>
        item.ccy === 'USD' || item.ccy === 'EUR')
    ))
  }

}
