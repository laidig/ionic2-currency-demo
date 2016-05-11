import {Page} from 'ionic-angular';
import {CurrencyService} from '../../providers/currency-service/currency-service'

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [CurrencyService]
})
export class HomePage {
    public currencies: any;
  public exchange: any;
    public dataLoaded: boolean;


  constructor(public CurrencyService: CurrencyService) {
    this.loadCurr();
  }

    loadCurr(){
        this.CurrencyService.loadCurrencies('USD','CAD,EUR')
            .then(data => {
                this.exchange = data;
                this.currencies = Object.keys(data.rates);
                this.dataLoaded = true;
                console.log(this.exchange);
            })
    }
}
