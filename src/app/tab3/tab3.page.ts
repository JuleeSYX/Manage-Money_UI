import { Component, OnInit } from '@angular/core';
import { ReportService } from './service/report.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(public vm: ReportService) {}
  startDate = new Date().toISOString();
  startOfMonth = new Date();
  endOfMonth = new Date();

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
  ngOnInit(): void {
    const today = new Date(this.startDate);
    this.startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  }
  logDate():void{
    const today = new Date(this.startDate);
    this.startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    console.log(this.startOfMonth, ',', this.endOfMonth, ',', this.startDate);
  }
  dateFormat():string{
    return this.filterName === 'Month'?'MM/yyyy':'yyyy';
  }
}
