import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { ReportService } from '../../service/report.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent implements OnInit, OnDestroy{
  private subs = new SubSink();
  @Input() startOfMonth = new Date();
  @Input() endOfMonth = new Date();
  invList: any[] = [];
  constructor( private api: ApiService, private vm: ReportService) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  ngOnInit(): void {
    this.getInvFunc();
  }
  getInvFunc():void{
    this.subs.sink = this.api.getInv('', this.startOfMonth, this.endOfMonth, 100, 0).subscribe({
      next: res => {
        this.invList = res;
        this.vm.paidTotal = this.invList.filter(f => f.type == 0 && f.status === 1).reduce((s, c) => s += c.price, 0);
        this.vm.receiveTotal = this.invList.filter(f => f.type == 1 && f.status === 1).reduce((s, c) => s += c.price, 0);
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          text: err.error?.message,
          heightAuto:false,
        })
      },
    })
  }

}
