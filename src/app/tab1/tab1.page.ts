import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VmService } from 'src/shared/service/vm.service';
import { ApiService } from '../api/api.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  private subs = new SubSink();
  @ViewChild('cateInput') myInput: any ;
  cateName: string = '';
  searchList: any[] = [];
  showList: boolean = false;

  amount!: number;
  constructor(public vm: VmService, private api: ApiService) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  ngOnInit(): void {
  }

  searchFunc():void{
    this.searchList = this.cateName.length > 0?this.vm.cateList.filter(f => f.name.includes(this.cateName)): [];
  }
  show():void{
    this.showList = true;
    setTimeout(() => {
      this.myInput.setFocus();
    }, 200);

  }
  showFunc():void{
    this.showList = true;
    this.searchFunc();
  }
  selectCate(value:string):void{
    this.cateName = value;
    this.showList = false;
  }
  selectAmount(value: number):void{
    this.amount = value;
  }
  saveFunc(type:number):void{
    if(!this.amount || !this.cateName?.length){
      Swal.fire({
        icon: 'error',
        text: 'ກະລຸນາປ້ອນຂໍ້ມູນ',
        showConfirmButton: false,
        timer: 1500,
        heightAuto:false,
      })
      return;
    }
    const model = {
      type: type,
      price: this.amount,
      cateName: this.cateName,
    }
    this.subs.sink = this.api.addInv(model).subscribe({
      next: res => {
        Swal.fire({
          icon: 'success',
          text: 'Add success.',
          showConfirmButton: false,
          timer: 1000,
          heightAuto:false,
        })
        this.amount = 0;
        this.cateName = '';
      },
      error: err => {
        Swal.fire({
          text: err.error,
          heightAuto: false,
        })
      }
    })
  }
}
