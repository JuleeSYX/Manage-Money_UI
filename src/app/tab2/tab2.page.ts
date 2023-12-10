import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { ApiService } from '../api/api.service';
import { VmService } from 'src/shared/service/vm.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  private subs = new SubSink();
  categoryList: any[] = [];
  cateTab: boolean = false;
  invList: any[] = [];
  kw: string = '';
  constructor(private api: ApiService, public vm: VmService) {}
  ngOnInit(): void {
    this.categoryList = this.vm.cateList;
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

  async addFunc(id: string, value: string, add: boolean){
    Swal.fire({
      text: `${add?'Add Category':'Edit Category'}`,
      input: 'text',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save',
      showCancelButton: true,
      heightAuto: false,
      inputValue: value,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        return;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const model = {
          description:"",
          image:"",
          index: 0,
          name: result.value
        }
        this.subs.sink = (add?this.api.addCate(model):this.api.updateCate(model, id)).subscribe({
          next: res => {
            Swal.fire({
              icon: 'success',
              text: `${add?'Category Added.':'Category Updated.'}`,
              showConfirmButton: false,
              timer: 1000,
              heightAuto:false,
            })
            if(add){
              this.vm.cateList.unshift(res)
            }else{
              this.vm.cateList.find(f => f._id == id).name = model.name;
            }
          },
          error: err => {
            Swal.fire({
              text: err.error,
              heightAuto: false,
            })
          }
        })
      }
    })
  }

  async addAmount(id:string, value:number, index:number, add:boolean){
    Swal.fire({
      text: `${add?'Add Amount':'Edit Amount'}`,
      input: 'number',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save',
      showCancelButton: true,
      heightAuto: false,
      inputValue: value,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
        return;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const model = {
          amount: Number(result.value),
          index: index || 0,
        }
        this.subs.sink = (add?this.api.addAmount(model):this.api.updateAmount(model, id)).subscribe({
          next: res => {
            Swal.fire({
              icon: 'success',
              text: `${add?'Amount Added.':'Amount Updated.'}`,
              showConfirmButton: false,
              timer: 1000,
              heightAuto:false,
            })
            if(add){
              this.vm.amountList.unshift(res)
            }else{
              this.vm.amountList.find(f => f._id == id).amount = model.amount;
            }
          },
          error: err => {
            Swal.fire({
              text: err.error,
              heightAuto: false,
            })
          }
        })
      }
    })
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }
  searchFunc(value: any): void{
    this.categoryList = this.vm.cateList.filter(f => f.name.includes(value));
  }
}
