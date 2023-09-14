import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VmService } from 'src/shared/service/vm.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  data: any;
  constructor(private route: ActivatedRoute, private vm: VmService) {}

  ngOnInit(): void {
    this.data = this.route.snapshot.data;
    this.vm.cateList = this.data.category;
    this.vm.amountList = this.data.amount;
  }

}
