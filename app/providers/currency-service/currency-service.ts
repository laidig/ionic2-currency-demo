import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';

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

  loadCurrencies(base: string, symbol: string) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('base', base);
    params.set('symbols', symbol);

    if (this.data) {
      return Promise.resolve(this.data);
    }

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

