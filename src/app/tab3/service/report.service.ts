import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }
  paidTotal: number = 0;
  receiveTotal: number = 0;
}
