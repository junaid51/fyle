import { Component } from '@angular/core';
import { BankService } from './bank.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bank } from './bank';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Banks';
  p: number = 1;
  cities: string[] = ['Bengaluru','Mumbai','Chennai','Hyderabad','Pune'];
  selectedBranch: string = null;
  banks: Bank[];
  filteredBanks: Bank[];
  _search: string = '';

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
    this.filteredBanks = this.search? this.performFilter(this.search): this.banks;

  }

  constructor(private bankService: BankService,
    private spinner: NgxSpinnerService) {}

  getBanks(branch: string): void {
    
    console.log(branch.toUpperCase());
    this.selectedBranch = branch;
    this.spinner.show();

    this.bankService.getBanks(branch.toUpperCase()).subscribe(
      banks => {
        this.banks = banks;
        this.filteredBanks = banks;
        this.spinner.hide();
      }
    )
  }

  performFilter(value: string) {
    value = value.toLocaleLowerCase();
    return this.banks.filter((bank: Bank) =>

    
    bank.ifsc.toLocaleLowerCase().indexOf(value) > -1 ||
    bank.address.toLocaleLowerCase().indexOf(value) > -1 ||
    bank.district.toLocaleLowerCase().indexOf(value) > -1 ||
    bank.city.toLocaleLowerCase().indexOf(value) > -1 ||
    bank.state.toLocaleLowerCase().indexOf(value) > -1 ||
    bank.branch.toLocaleLowerCase().indexOf(value) > -1 ||
    bank.bank_name.toLocaleLowerCase().indexOf(value) > -1
    )
  }

}
