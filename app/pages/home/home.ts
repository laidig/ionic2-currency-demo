import {Page} from 'ionic-angular';
import {CurrencyService} from '../../providers/currency-service/currency-service'
import {Input, Output} from '@angular/core';

@Page({
    templateUrl: 'build/pages/home/home.html',
    providers: [CurrencyService]
})
export class HomePage {
    currenciesLoaded: any;
    supportedCurrencies: string[];
    exchangeRates: any;
    public dataLoaded: boolean;

    base: string = 'USD';
    symbols: string[] = ['EUR','RUB'];

    constructor(public CurrencyService: CurrencyService) {
        var base: string = this.base;
        var symbols: string[] = this.symbols;
        this.loadCurrencyList();
        this.loadCurrencyExchange();
    }
    
    loadCurrencyList(){
        this.supportedCurrencies =this.CurrencyService.loadCurrencySymbols();
    }

    loadCurrencyExchange(){
        this.CurrencyService.loadCurrencies(this.base, this.symbols)
            .then(data => {
                console.log(this.base + ' to ' + this.symbols);
                this.exchangeRates = data;
                this.currenciesLoaded = Object.keys(data.rates);
                this.dataLoaded = true;
            })
    }
}
