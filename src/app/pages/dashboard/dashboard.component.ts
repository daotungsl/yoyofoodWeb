import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DashboardService } from './dashboard.service';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  countOrder : any;
  countProduct : any;
  countAccount : any;
  totalMoney : any;

  constructor(
    private dashboardService: DashboardService
  ) {
    
   }

  ngOnInit() {
    this.getCountOrder();
    this.getCountProduct();
    this.getCountAccount();
    this.getTotalMoney();

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }





  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
  getCountOrder() {
    this.dashboardService.getOrderCount()
      .subscribe({
        next: value => {
          console.log(value)
          this.countOrder = value.data;
        },
        error: err => {
          console.log(err)
        }
      });
  }
  getCountProduct() {
    this.dashboardService.getProductCount()
      .subscribe({
        next: value => {
          console.log(value)

          this.countProduct = value.data;
        },
        error: err => {
          console.log(err)
        }
      });
  }
  getCountAccount() {
    this.dashboardService.getAcountCount()
      .subscribe({
        next: value => {
          console.log(value)

          this.countAccount = value.data;
        },
        error: err => {
          console.log(err)
        }
      });
  }
  getTotalMoney() {
    this.dashboardService.getTotalMoney()
      .subscribe({
        next: value => {
          console.log(value)

          this.totalMoney = value.data;
        },
        error: err => {
          console.log(err)
        }
      });
  }
}
