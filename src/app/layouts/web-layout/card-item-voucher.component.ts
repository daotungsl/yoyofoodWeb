import { Component } from '@angular/core';

@Component({
    selector: 'app-card-item-voucher',
    template: `
  <div>
  <ng-content select=".card-image"></ng-content>
  </div>
                    <!-- Card -->
                    <div class="card booking-card" style="height: 520px">

                        <!-- Card image -->
                        <div class="view overlay">
                            <img class="card-img-top" src="https://img.jamja.vn/jamja-prod/cov-tenmc-555.jpg" alt="Card image cap">
                            <a href="#!">
                                <div class="mask rgba-white-slight waves-effect waves-light"></div>
                            </a>
                        </div>
                        <div class="card-body">
                            <!-- Title -->
                            <h4 class="card-title font-weight-bold"><a>FoodHouse</a></h4>
                            <!-- Data -->
                            <ul class="list-unstyled list-inline rating mb-0">
                                <li class="list-inline-item mr-0"><i class="fas fa-star amber-text" aria-hidden="true"> </i></li>
                                <li class="list-inline-item mr-0"><i class="fas fa-star amber-text" aria-hidden="true"></i></li>
                                <li class="list-inline-item mr-0"><i class="fas fa-star amber-text" aria-hidden="true"></i></li>
                                <li class="list-inline-item mr-0"><i class="fas fa-star amber-text" aria-hidden="true"></i></li>
                                <li class="list-inline-item"><i class="fas fa-star-half-alt amber-text" aria-hidden="true"></i></li>
                                <li class="list-inline-item"><p class="text-muted">4.5 (413)</p></li>
                            </ul>
                            <p class="mb-2"># • Nhà hàng, quán ăn</p>
                            <!-- Text -->
                            <p class="card-text">Giảm giá chỉ còn 129K Buffet Lẩu UFO trong khung giờ 10h30 - 12h30 &amp; 17h30 - 18h30 (Giá Gốc 189K)</p>
                            <hr class="my-4">
                            <p class="lead"><strong>Khung giờ mở cửa</strong></p>
                            <ul class="list-unstyled list-inline d-flex justify-content-between mb-0">
                                <li class="list-inline-item mr-0">
                                    <div class="chip deep-purple white-text mr-0 waves-effect waves-effect">10h30</div>
                                </li>
                                <li class="list-inline-item mr-0">
                                    <div class="chip mr-0 waves-effect waves-effect">17h30</div>
                                </li>
                                <li class="list-inline-item mr-0">
                                    <div class="chip mr-0 waves-effect waves-effect">19h30</div>
                                </li>
                                <li class="list-inline-item mr-0">
                                    <div class="chip mr-0 waves-effect waves-effect">21h30</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- Card -->
  `,
    styleUrls: ['./web-layout.component.scss']

})
export class CardItemVoucherComponent { }
