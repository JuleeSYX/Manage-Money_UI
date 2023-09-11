import { Component, OnInit } from '@angular/core';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private subs = new SubSink();
  constructor(public api: ApiService, private router: Router, private cookieService: CookieService) { }
  username: string = '';
  password: string = '';
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
          this.router.navigateByUrl('/tabs/tab1');
        },
        error: (err) => {
          console.log(err);

        }
      })
    }else{
      alert('Username or Password invalid.');
    }
  }

}
