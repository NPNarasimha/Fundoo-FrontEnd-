import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSidenavOpen = false;
  selectedItem: string = 'notes'; 
  
  constructor(private router: Router) {}

  
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  
  setActive(item: string) {
    this.selectedItem = item;
    if(item==='notes'){
    this.router.navigate(['/dashboard/createnote']); 
    }
    // else if (item === 'reminders') {
    //   this.router.navigate(['/dashboard/reminders']); 
    // }
    // else if (item === 'edit') {
    //   this.router.navigate(['/dashboard/edit']); 
    // }
    // else if (item === 'archive') {
    //   this.router.navigate(['/dashboard/archive']); 
    // }
    // else if (item === 'trash') {
    //   this.router.navigate(['/dashboard/trash']); 
    // }
  }
}
