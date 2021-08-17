import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';


@Component({
  selector: 'app-root',
  template: `
    <div id="app" class="is-flex is-flex-direction-column">
      <div class="p-4 has-border-bottom">header</div>


      <!-- BODY      -->
      <div class="is-flex-grow-1 p-4 has-overflow-auto">
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-half" *ngFor="let character of dataSvc.characters$ | async">
              <app-character-card [character]="character"></app-character-card>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER      -->
      <div class="p-2 has-border-top">
        <div class="container">

          <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a class="pagination-previous">Previous</a>
            <a class="pagination-next">Next page</a>
            <ul class="pagination-list">
              <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Goto page 45">{{(dataSvc.currentPage$ | async) - 1}}</a></li>
              <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">{{(dataSvc.currentPage$ | async) || 1}}</a>
              </li>
              <li><a class="pagination-link" aria-label="Goto page 47">{{(dataSvc.currentPage$ | async) + 1}}</a></li>
              <li><span class="pagination-ellipsis">&hellip;</span></li>
              <li><a class="pagination-link" aria-label="Goto page 86">{{(dataSvc.pageInfo$ | async)?.pages}}</a></li>
            </ul>
          </nav>
        </div>
      </div>

    </div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rick-and-morty-cloud-accademy';


  constructor(public dataSvc: DataService) {
  }


  ngOnInit(): void {
    this.dataSvc.getCharacters().subscribe();
  }

  goTo(direction: 'next' | 'prev', currentPage: number): void {

  }


}
