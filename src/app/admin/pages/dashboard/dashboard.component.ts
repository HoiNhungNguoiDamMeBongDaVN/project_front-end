import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { areaChartOption } from 'src/app/chart/areaChartOption';
import { pieChartOption } from 'src/app/chart/pieChartOption';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  piechart = new Chart(pieChartOption);
 
  areaChart= new Chart(areaChartOption)


}
