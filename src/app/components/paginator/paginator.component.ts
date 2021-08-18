import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  template: `
    <nav class="pagination is-rounded is-small" role="navigation" aria-label="pagination">

      <!--      <a class="pagination-previous" (click)="changePage.emit(currentPage - 1)">Previous</a>-->
      <button *ngIf="currentPage > 1"
              class="pagination-next button"
              [class.is-loading]="isLoading"
              (click)="changePage.emit(currentPage - 1)">Previous Page
      </button>
      <button class="pagination-next button is-info"
              [class.is-loading]="isLoading"
              (click)="changePage.emit(currentPage + 1)">Next Page
      </button>

      <ul class="pagination-list">
        <ng-container *ngIf="currentPage > 2">
          <li><a class="pagination-link" aria-label="Goto page 1"
                 (click)="changePage.emit(1)">1</a></li>
          <li><span class="pagination-ellipsis">&hellip;</span></li>
        </ng-container>
        <li *ngIf="currentPage > 1">
          <a class="pagination-link" aria-label="Goto page 45"
             (click)="changePage.emit(currentPage - 1)">{{currentPage - 1}}</a></li>
        <li><a class="pagination-link is-current" aria-label="Page" aria-current="page">{{currentPage || 1}}</a>
        </li>
        <li><a class="pagination-link" aria-label="Goto page" (click)="changePage.emit(currentPage + 1)">{{currentPage + 1}}</a></li>
        <li><span class="pagination-ellipsis">&hellip;</span></li>
        <li><a class="pagination-link" aria-label="Goto page" (click)="changePage.emit(totalPages)">{{totalPages}}</a></li>
      </ul>
    </nav>`,
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  constructor() {
  }

  @Input() isLoading = false;
  @Input() totalPages = 1;
  @Input() currentPage = 1;
  @Output() changePage: EventEmitter<number> = new EventEmitter();


  ngOnInit(): void {
  }

}
