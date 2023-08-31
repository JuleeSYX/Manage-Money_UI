import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent  implements OnInit {

  constructor() { }
  days: any[] = [];
  ngOnInit() {
    for (let index = 1; index < 31; index++) {
      this.days.push(index)
    }
    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: this.days,
        datasets: [{
          label: 'Paid',
          data: [65, 59, 80, 81, 56, 70, 40,67, 70, 80, 81, 56, 55, 47,20, 59, 80, 81, 10, 55, 80,65, 59, 80, 81, 56, 55, 30, 50, 80],
          fill: false,
          borderColor: '#ff4747',
          tension: 0.1
        },
        {
          label: 'Received',
          data: [20, 0, 40, 90, 0, 25, 60, 27, 70, 40, 0, 20, 0, 40, 0, 0, 0, 60, 27, 70, 40, 0, 20, 0, 40, 40, 0, 25, 30, 10, 27],
          fill: false,
          borderColor: '#00CD08',
          tension: 0.1
        }]
      },
    });

    var doughnutChart = new Chart("doughnutChart",{
      type: 'doughnut',
      data: {
        labels: ['1','2','3','4','5','6','7','8','9','10'],
        datasets: [{
          label: 'Paid',
          data: [800, 290, 280, 260, 230, 220, 210, 190, 50, 20],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 262, 235)',
            'rgb(255, 305, 86)',
            'rgb(155, 20, 132)',
            'rgb(54, 162, 235)',
            'rgb(55, 205, 86)',
            'rgb(25, 99, 132)',
            'rgb(514, 162, 235)',
            'rgb(305, 05, 86)',
            'rgb(203, 205, 86)',
          ],
          hoverOffset: 4
        },
        // {
        //   label: 'Recieved',
        //   data: [400, 190, 180],
        //   backgroundColor: [
        //     'rgb(55, 99, 132)',
        //     'rgb(40, 62, 235)',
        //     'rgb(563, 05, 186)'
        //   ],
        //   hoverOffset: 4
        // }
      ]
      }
    })
  }


}
