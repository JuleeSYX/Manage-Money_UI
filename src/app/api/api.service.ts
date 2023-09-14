import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  endPoin = 'http://localhost:8080/';
  imageUrl = 'http://localhost:8080/files/';

  login(model: { username: string, password: string }): Observable<any> {
    const loginUrl = this.endPoin + 'api-login/login';
    return this.http.post<any>(loginUrl, model, { withCredentials: true }).pipe(take(1));
  }

  getCate(): Observable<any> {
    const cateUrl = this.endPoin + 'api/category';
    return this.http.get<any>(cateUrl, { withCredentials: true }).pipe(take(1));
  }
  addCate(model:any): Observable<any> {
    const cateUrl = this.endPoin + 'api/category';
    return this.http.post<any>(cateUrl, model, { withCredentials: true }).pipe(take(1));
  }
  updateCate(model: {name:string, description:string, image:string, index:number}, id: string,): Observable<any> {
    const cateUrl = this.endPoin + `api/category?id=${id}`;
    return this.http.put<any>(cateUrl, model, { withCredentials: true }).pipe(take(1));
  }

  getAmount(): Observable<any> {
    const amountUrl = this.endPoin + 'api/price';
    return this.http.get<any>(amountUrl, { withCredentials: true }).pipe(take(1));
  }
  addAmount(model: {amount: number, index:number}): Observable<any> {
    const amountUrl = this.endPoin + 'api/price';
    return this.http.post<any>(amountUrl, model, { withCredentials: true }).pipe(take(1));
  }
  updateAmount(model: {amount: number, index:number}, id:string): Observable<any> {
    const amountUrl = this.endPoin + `api/price?id=${id}`;
    return this.http.put<any>(amountUrl, model, { withCredentials: true }).pipe(take(1));
  }
  addInv(model:{type:number, price:number, cateName: string}): Observable<any> {
    const invUrl = this.endPoin + 'api/invoice';
    return this.http.post<any>(invUrl, model, { withCredentials: true }).pipe(take(1));
  }
}
