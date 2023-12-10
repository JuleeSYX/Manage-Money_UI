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
  startDate = new Date();
  endDate = new Date();
  @ViewChild('cateInput') myInput: any ;
  invList: any[] = [];
  cateName: string = '';
  searchList: any[] = [];
  showList: boolean = false;

  amount!: number;

  paidTotal: number = 0;
  receiveTotal: number = 0;
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
        this.summary();
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
  summary():void{
    this.paidTotal = this.invList.filter(f => f.type == 0 && f.status == 1).reduce((s, c) => s += c.price, 0);
    this.receiveTotal = this.invList.filter(f => f.type == 1 && f.status == 1).reduce((s, c) => s += c.price, 0);
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
    const token = localStorage.getItem('auth-token');
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
        this.summary();
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

  cancelFunc(invId:any):void{
    Swal.fire({
      text: 'ຍົກເລິກໃບບີນ',
      input: 'text',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ຕົກລົງ',
      cancelButtonText: 'ປິດ',
      showCancelButton: true,
      heightAuto: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem('auth-token');
        const model = {
          id: invId,
          remark: result.value,
          token: token,
        }
        this.subs.sink = this.api.cancelInv(model).subscribe({
          next: res => {
            this.invList.find(f => f._id === res._id).status = res.status;
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
    })
  }
}
