import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}
  startDate = new Date().toISOString();
  segment: number = 0;

  filterName: string = 'Month';
  public pickerColumns = [
    {
      name: 'languages',
      options: [
        {
          text: 'Month',
          value: 'month',
        },
        {
          text: 'Year',
          value: 'year',
        },
      ],
    },
  ];

  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: any) => {
        this.filterName = value.languages.text
      },
    },
  ];

  dateFormat():string{
    return this.filterName === 'Month'?'MM/yyyy':'yyyy';
  }
}
