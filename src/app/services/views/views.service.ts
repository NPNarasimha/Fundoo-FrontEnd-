import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewsService {
  private isListViewSubject = new BehaviorSubject<boolean>(false);
  isListView$ = this.isListViewSubject.asObservable();

  setViewMode(isListView: boolean) {
    this.isListViewSubject.next(isListView);
  }

  toggleViewMode() {
    this.isListViewSubject.next(!this.isListViewSubject.getValue());
  }

  getCurrentViewMode(): boolean {
    return this.isListViewSubject.getValue();
  }
}
