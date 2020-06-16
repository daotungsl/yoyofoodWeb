import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { WebLayoutService } from 'src/app/layouts/web-layout/web-layout.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
  datasVoucher: any;
  datasProduct: any;
  constructor(
    private route: ActivatedRoute,
    private webService : WebLayoutService


  ) { }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //  this.getAllVoucherByType(params.get('url'));
    // });
    // this.webService.scrollView(0,1000);

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.getAllProductByType(params.get('url'));
     });
     this.webService.scrollView(0,1000);
  }

  getAllVoucherByType(value){
    this.webService.getAllVoucherByType(value)
    .subscribe({
      next: value => {
        console.log(value)
        this.datasVoucher = value.data
      },
      error: err => {
        console.log(err.error)
  
      }
    })
  }
  getAllProductByType(value){
    this.webService.getAllProductByType(value)
    .subscribe({
      next: value => {
        console.log(value)
        this.datasProduct = value.data
      },
      error: err => {
        console.log(err.error)
  
      }
    })
  }
}
