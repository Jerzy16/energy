import { Component } from '@angular/core';
import { ChartComponent } from "./ui/chart/chart.component";

@Component({
  selector: 'app-dashboard',
  imports: [ChartComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 
}
