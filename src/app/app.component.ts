import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from './data.service';
import {Character} from './models';
import {take} from 'rxjs/operators';
import {HeaderComponent} from './components/header/header.component';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <!--  MODAL FOR LOCATION INFO  -->
    <app-modal-location-detail *ngIf="dataSvc.locationInfo$ | async"
                               [locationInfo]="dataSvc.locationInfo$ | async"
                               (closeModal)="dataSvc.locationInfo = null"
    ></app-modal-location-detail>

    <!--  MODAL FOR EPISODES INFO  -->
    <app-modal-episodes-detail *ngIf="dataSvc.characterDetails$ | async"
                               [character]="dataSvc.characterDetails$ | async"
                               (closeModal)="dataSvc.characterDetails = null"
    ></app-modal-episodes-detail>


    <!--  PAGE  -->
    <div id="app" class="is-flex is-flex-direction-column">
      <!--  HEADER  -->
      <app-header [totalCount]="(dataSvc.pageInfo$ | async)?.count"
                  (searchTerm)="search($event)"
      ></app-header>

      <!-- BODY  -->
      <div class="is-flex-grow-1 p-4 has-overflow-auto is-flex-direction-column"
           [class.is-flex]="!(dataSvc.characters$ | async)?.length">

        <!-- NO DATA ALERT        -->
        <div class="is-flex is-justify-content-center is-align-items-center is-flex-grow-1" *ngIf="!(dataSvc.characters$ | async)?.length">
          <div class="is-flex is-flex-direction-column is-align-items-center">
            <div class="is-size-1 has-text-grey">no characters found</div>
            <i class="mt-5 is-size-1 has-text-grey fas fa-frown"></i>
          </div>
        </div>

        <!-- CHARACTERS LIST  -->
        <div class="container" *ngIf="(dataSvc.characters$ | async)?.length">
          <div class="columns is-multiline">
            <div class="column is-half" *ngFor="let character of (dataSvc.characters$ | async)">
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
                         [totalPages]="(dataSvc.pageInfo$ | async)?.pages"
                         [totalCount]="(dataSvc.pageInfo$ | async)?.count"
          ></app-paginator>
        </div>
      </div>

    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rick and morty';
  alive = true;
  // searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @ViewChild(HeaderComponent) headerComponentRef: HeaderComponent;

  constructor(public dataSvc: DataService) {
  }

  ngOnInit(): void {
    // FIRST CALL
    this.dataSvc.getCharacters().subscribe();
  }

  ngOnDestroy(): void {
    // FOR UNSUBSCRIBE  THE SUBSCRIBERS USING TAKEWHILE
    this.alive = false;
  }

  // SEARCH BY CHARACTER NAME
  search(searchTerm): void {
    console.log(searchTerm);
    this.dataSvc.getCharacters(1, searchTerm).subscribe();
  }

  getLocationInfo(url: string): void {
    this.dataSvc.getLocations(url).subscribe();
  }

  getEpisodesInfo(character: Character, ids: number[]): void {
    this.dataSvc.getEpisodes(character, ids).subscribe();
  }

  // CHANGE PAGE
  goTo(page: number): void {
    // GET INFO FROM SEARCH VALUE IN THE HEADER COMPONENT
    this.headerComponentRef.searchTerm$.pipe(take(1)).subscribe(search => {
      this.dataSvc.getCharacters(page, search).subscribe();
    });
  }
}
