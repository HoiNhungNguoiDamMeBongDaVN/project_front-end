import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ApiAccountAdminService } from 'src/app/services/api_account/api-account-admin.service';
import { OrderCustomerService } from 'src/app/services/api_order/order-customer.service';

@Component({
  selector: 'app-charts-admin',
  templateUrl: './charts-admin.component.html',
  styleUrls: ['./charts-admin.component.scss']
})
export class ChartsAdminComponent implements OnInit {

  constructor(private orderChart:OrderCustomerService, private account:ApiAccountAdminService,private httpAccount:ApiAccountAdminService) {
    Chart.register(...registerables);
   }

   arrayOrder:[]|any;

   arrayAccount:[]|any;

   totalOrder:any;

   totalRevenue:any;

   totalAccount:any;

   totalProductSell:any;

  ngOnInit(): void {
    this.loadOrder();
    this.loadAccount();
    this.pushTotalOrder();
    this.pushTotalRevenueOrder();
    this.pushTotalProductSell();
    // this.pushTotalAccount();
    this.chart();
  }
  ngOnChange(){
    
  }
  chart(){
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['Tổng đơn hàng', 'Tổng danh thu', 'Tổng sản phẩm được bán',],
          
          datasets: [{
              label:'Chỉ số',
              data: [this.totalOrder,this.totalRevenue,this.totalProductSell],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(93, 255, 42, 0.31)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
              ],
              hoverBorderColor:['rgba(88, 61, 145, 0.8)'],
              borderWidth: 2
          }]
          
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  loadOrder(){
    this.arrayOrder=this.orderChart.loadOrder();
  }

  loadAccount(){
    
    let total=0;
    let allTotal=0;
    this.httpAccount.getAllAccount().subscribe(data=>{
      this.arrayAccount=data;
      for (let x = 0; x < this.arrayAccount.length; x++) {
        total+=1;
      }
      allTotal=total;
      console.log(allTotal,"okok");
      this.pushTotalAccount(allTotal);
    });
    
  }

  pushTotalOrder(){
    let total=0;
    for (let x = 0; x < this.arrayOrder.length; x++) {
      total+=1;
    }
    this.totalOrder=total;
  }

  pushTotalRevenueOrder(){
    let total=0;
    for (let x = 0; x < this.arrayOrder.length; x++) {
      const element = this.arrayOrder[x].totalPriceProductSale;
      total+=element/1000000;
    }
    this.totalRevenue=total;
  }

  pushTotalProductSell(){
    let total=0;
    for (let x = 0; x < this.arrayOrder.length; x++) {
      const element = this.arrayOrder[x].totalAmount;
      total+=element;
    }
    this.totalProductSell=total;
  }

  pushTotalAccount(number:number){

    
    // let total=0;
    // for (let x = 0; x < this.arrayAccount.length; x++) {
    //   total+=1;
    // }
    this.totalAccount=number;
    console.log(this.totalAccount,"o day ne");
    
  }
}
