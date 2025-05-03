import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CreatelabelComponent } from '../createlabel/createlabel.component';
import { MatDialog } from '@angular/material/dialog';
import { LabelService } from '../../services/label/label.service';
import { SearchService } from '../../services/search/search.service';
import { ViewsService } from '../../services/views/views.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSidenavOpen = false;
  selectedItem: string = 'notes';
  notesList: any[] = [];
  filteredNotesArray: any[] = [];
  isLoading = false;
  activeItem: string = 'Notes';
  showReminders: boolean = false;
  labels: string[] = [];
  searchQuery: string = '';
  currentRoute: string = '';
  isListView: boolean = false;
  constructor(private router: Router, private viewservice: ViewsService, private dialog: MatDialog,
    private searchservice: SearchService, private labelService: LabelService) {
    this.viewservice.isListView$.subscribe(view => {
      this.isListView = view;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    // this.loadLabels(); 
  }
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  toggleView() {
    this.viewservice.toggleViewMode();
  }

  onSearchChange() {
    this.searchservice.updateSearch(this.searchQuery);
  }
  clearSearch() {
    this.searchQuery = '';
    this.searchservice.updateSearch('');
  }

  logout() {
    localStorage.removeItem('Token');
    console.log('User logged out !!!!');
    this.router.navigate(['']);
  }
  setActive(item: string) {
    this.selectedItem = item;
    if (item === 'notes') {
      this.router.navigate(['/dashboard']);
      this.filteredNotesArray = this.getAllNotes();
    } else if (item === 'reminders') {
      this.router.navigate(['/dashboard/reminders']);
      this.showReminders = true;
    }
    else if (item === 'edit') {
      this.router.navigate(['/dashboard/label']);
    }
    else if (item === 'archive') {
      this.router.navigate(['/dashboard/archive']);
    }
    else if (item === 'trash') {
      this.router.navigate(['/dashboard/trash']);
    }
  }
  refreshPage() {
    this.isLoading = true;
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  getAllNotes() {
    return [...this.notesList];
  }
  getReminderNotes() {
    return this.notesList.filter(note => note.reminder);
  }
  openLabelDialog(): void {
    const dialogRef = this.dialog.open(CreatelabelComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.labels = result;
      } else {
        this.loadLabels();
      }
    });
  }
  loadLabels(): void {
    this.labelService.displayLabels().subscribe({
      next: (res: any) => {
        console.log(res)
        this.labels = res.labels || [];
      },
      error: (err) => {
        console.error('Error loading labels:', err);
      }
    });
  }
  getPageTitle(route: string): string {
    if (route.includes('archive')) return 'Archive';
    if (route.includes('trash')) return 'Trash';
    if (route.includes('reminders')) return 'Reminders';
    return 'Keep';
  }
}

