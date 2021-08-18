import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {Character} from './models';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <div class="modal"
         [class.is-active]="dataSvc.locationInfo$ | async">
      <div class="modal-background" (click)="dataSvc.locationInfo = null"></div>
      <div class="modal-content has-background-white p-4 has-radius is-flex is-flex-direction-column">
        <!-- Any other Bulma elements you want -->
        <div class="title">{{(dataSvc.locationInfo$ | async)?.name}}</div>

        {{dataSvc.locationInfo$ | async | json}}

        <button class="button is-rounded is-info is-small is-align-self-flex-end" aria-label="close"
                (click)="dataSvc.locationInfo = null">OK
        </button>
      </div>
      <button class="modal-close is-large" aria-label="close"
              (click)="dataSvc.locationInfo = null"></button>
    </div>

    <app-modal-episodes-detail *ngIf="dataSvc.characterDetails$ | async"
                               [character]="dataSvc.characterDetails$ | async"
                               (close)="dataSvc.characterDetails = null"
    ></app-modal-episodes-detail>


    <div id="app" class="is-flex is-flex-direction-column">
      <div class="p-4 has-shadow has-background-white">
        <img id="img-logo" src="assets/logo.png" alt="">
      </div>

      <!-- BODY      -->
      <div class="is-flex-grow-1 p-4 has-overflow-auto">
        <div class="container">
          <div class="columns is-multiline">
            <div class="column is-half" *ngFor="let character of dataSvc.characters$ | async">
              <app-character-card [character]="character"
                                  (locationInfo)="getLocationInfo($event)"
                                  (episodesInfo)="getEpisodesInfo(character, $event)"
              ></app-character-card>
            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER      -->
      <div class="p-4 has-shadow has-background-white">
        <div class="container">
          <app-paginator (changePage)="goTo($event)"
                         [isLoading]="dataSvc.isLoading$ | async"
                         [currentPage]="dataSvc.currentPage$ | async"
                         [totalPages]="(dataSvc.pageInfo$  |async)?.pages"
          ></app-paginator>
        </div>
      </div>

    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rick and morty';


  constructor(public dataSvc: DataService) {
  }

  ngOnInit(): void {
    this.dataSvc.getCharacters().subscribe();
  }

  goTo(page: number): void {
    console.log(page);
    this.dataSvc.getCharacters(page).subscribe();
  }

  getLocationInfo(url: string): void {
    this.dataSvc.getLocations(url).subscribe();
  }

  getEpisodesInfo(character: Character, ids: number[]): void {
    this.dataSvc.getEpisodes(character, ids).subscribe();
  }


}
