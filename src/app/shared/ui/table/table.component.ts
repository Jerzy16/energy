import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActionButtonComponent } from "../action-button/action-button.component";
import { PaginatorComponent } from "../paginator/paginator.component";

interface Header {
  key: string;
  label: string;
}

interface DataItem {
  [key: string]: any;
}

@Component({
  selector: 'app-table',
  imports: [FontAwesomeModule, ActionButtonComponent, PaginatorComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true
})
export class TableComponent {
  @Input() headers: Header[] = [];
  @Input() data: DataItem[] = [];
  @Input() keyField: string = 'id';

  @Output() actionClicked = new EventEmitter<{ action: string; id: any }>();

  currentPage = 1;
  itemsPerPage = 5;

  faEdit = faEdit;
  faEye = faEye;
  faTrash = faTrash;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  get paginatedData(): DataItem[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  openModal(event: { action: string; id: any }): void {
    this.actionClicked.emit(event);
  }
}
