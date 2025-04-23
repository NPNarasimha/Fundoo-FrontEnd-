import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-icons',
  standalone: false,
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss'
})
export class IconsComponent {
  showPalette: boolean = false;
  colors: string[] = [
    '#f28b82', '#fbbc04', '#fff475',
    '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb'
  ];
  @ViewChild('noteCard', { static: true }) noteCard!: ElementRef;
  @Output() noteAdded = new EventEmitter<any>();
  isColorPickerVisible: boolean = false;

  toggleColorPicker(event: MouseEvent) {
    event.stopPropagation();  // Prevent click from propagating to document
    this.isColorPickerVisible = !this.isColorPickerVisible;
  }
  selectColor(color: string) {
    this.noteAdded.emit({ color });
    this.isColorPickerVisible = false;
  }
}
