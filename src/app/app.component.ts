import { Component, OnChanges, OnInit} from '@angular/core';
import { DropdownOption } from './model/dropdown-option';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    countrydata: DropdownOption[] = [];
    chooseOpt: DropdownOption;
    chooseOptName: string;
    constructor() {}
    ngOnInit() {
      this.countrydata = [{
          'name': 'Alberta',
          'abbreviation': 'AB'
        },
        {
          'name': 'British Columbia',
          'abbreviation': 'BC'
        },
        {
          'name': 'Manitoba',
          'abbreviation': 'MB'
        },
        {
          'name': 'New Brunswick',
          'abbreviation': 'NB'
        },
        {
          'name': 'Newfoundland and Labrador',
          'abbreviation': 'NL'
        },
        {
          'name': 'Nova Scotia',
          'abbreviation': 'NS'
        },
        {
          'name': 'Northwest Territories',
          'abbreviation': 'NT'
        },
        {
          'name': 'Nunavut',
          'abbreviation': 'NU'
        },
        {
          'name': 'Ontario',
          'abbreviation': 'ON'
        },
        {
          'name': 'Prince Edward Island',
          'abbreviation': 'PE'
        },
        {
          'name': 'Quebec',
          'abbreviation': 'QC'
        },
        {
          'name': 'Saskatchewan',
          'abbreviation': 'SK'
        },
        {
          'name': 'Yukon',
          'abbreviation': 'YT'
        }
      ];
        console.log('countrydata => ', this.countrydata);
    }
    setChooseOption(opt: DropdownOption) {
      this.chooseOpt = opt;
      this.chooseOptName = opt.name;
      console.log('setChooseOption => ', opt);
    }
    fetchSelectedValue(event: DropdownOption) {
      this.chooseOpt = event;
      this.chooseOptName = event.name;
      // console.log('fetchSelectedValue => ', this.chooseOpt);
    }
}
