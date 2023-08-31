import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor() {}
  amountList: any[] = [5000,10000,15000,20000,25000,30000,35000,40000,50000,60000];
  ngOnInit(): void {
  }

}
