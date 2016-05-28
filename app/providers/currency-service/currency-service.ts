import {Injectable} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";

/*
  Generated class for the CurrencyService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CurrencyService {
  data: any;
  http: any;

  static get parameters(){
    return [[Http]]
  }  

  constructor(http: Http) {
    this.http = http;
    this.data = null;
  }

  loadCurrencySymbols(){
    var symbols: string[] =
        ["AUD","BGN","BRL","CAD","CHF","CNY","CZK","DKK","EUR","GBP","HKD","HRK","HUF","IDR","ILS","INR","JPY","KRW",
          "MXN","MYR","NOK","NZD","PHP","PLN","RON","RUB","SEK","SGD","THB","TRY","USD","ZAR"]
    return symbols;
  }

  loadCurrencies(base: string, symbols: string[]) {
    let params: URLSearchParams = new URLSearchParams();
    var symbolString: string = symbols.join(',');

    params.set('base', base);
    params.set('symbols', symbolString);

    
    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('http://api.fixer.io/latest', {
        search: params
      })
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

