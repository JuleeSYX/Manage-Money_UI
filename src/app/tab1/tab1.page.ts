import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VmService } from 'src/shared/service/vm.service';
import { ApiService } from '../api/api.service';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy{
  private subs = new SubSink();
  @ViewChild('cateInput') myInput: any ;
  invList: any[] = [];
  cateName: string = '';
  searchList: any[] = [];
  showList: boolean = false;

  amount!: number;
  constructor(public vm: VmService, private api: ApiService, private cookieService: CookieService) {}
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  ngOnInit(): void {
    this.getInvFunc();
  }
  getInvFunc():void{
    this.subs.sink = this.api.getInvToday('', 100, 0).subscribe({
      next: res => {
        this.invList = res;
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
    const token = this.cookieService.get('auth-token');
    const model = {
      type: type, //1 = receive, 0 = paid
      price: this.amount,
      cateName: this.cateName,
      token: token
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

        this.invList.push(
          {
            _id: res._id,
            type: res.type,
            price: res.price,
            createdAt: res.createdAt,
            category: {
                _id: res.cate_id,
                name: this.cateName,
                description: "",
                image: ""
            },
            store: {
                _id: res.store_id,
                name: ""
            },
            user: {
                _id: res.user_id,
                fullname: ""
            }
          }
        );
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
