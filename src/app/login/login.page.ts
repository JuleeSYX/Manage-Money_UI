import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  private subs = new SubSink();
  constructor(public api: ApiService, private router: Router, private cookieService: CookieService) { }
  username: string = '';
  password: string = '';
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  ngOnInit() {
    this.cookieService.deleteAll();
  }

  login():void{
    if(this.username && this.password){
      let model = {
        username: this.username,
        password: this.password
      }
      this.subs.sink = this.api.login(model).subscribe({
        next: (res) => {
          Swal.fire({
            // position: 'top-end',
            icon: 'success',
            text: 'Login success.',
            showConfirmButton: false,
            timer: 1800,
            heightAuto:false,
          })
          this.router.navigateByUrl('/tabs/tab1');
        },
        error: (err) => {
          console.log(err);
        }
      })
    }else{
      Swal.fire({
        icon: 'error',
        text: 'The username or password is incorrect.',
        showConfirmButton: false,
        timer: 1500,
        heightAuto:false,
      })
    }
  }

}
