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
}
