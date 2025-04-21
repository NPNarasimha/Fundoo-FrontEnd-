import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isSidenavOpen = false;
  selectedItem: string = 'notes';
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  setActive(item: string) {
    this.selectedItem = item;
  }

}