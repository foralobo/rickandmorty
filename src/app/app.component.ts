import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from './services/data.service';
import {Character, VersionType} from './models';
import {mergeMap, switchMap, take, takeWhile} from 'rxjs/operators';
import {HeaderComponent} from './components/header/header.component';
import {combineLatest, of} from 'rxjs';


@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

    <!-- LOADING    -->
    <app-loading *ngIf="(dataSvc.isLoading$ | async)"></app-loading>

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
                  [selectedOption]="dataSvc.selectedVersion$ | async"
                  (changeVersion)="changeVersion($event)"
      ></app-header>

      <!-- BODY  -->
      <div class="is-flex-grow-1 p-4 has-overflow-auto is-flex-direction-column"
           [class.is-flex]="!(dataSvc.characters$ | async)?.length">

        <!-- NO DATA ALERT        -->
        <div class="is-flex is-justify-content-center is-align-items-center is-flex-grow-1"
             *ngIf="(dataSvc.isLoading$ | async) === false && !(dataSvc.characters$ | async)?.length"
        >
          <div class="is-flex is-flex-direction-column is-align-items-center">
            <div class="is-size-1 has-text-grey">no characters found</div>
            <i class="mt-5 is-size-1 has-text-grey fas fa-frown"></i>
          </div>
        </div>

        <!-- CHARACTERS LIST  -->
        <div class="container" *ngIf="(dataSvc.characters$ | async)?.length">
          <div class="columns is-multiline">
            <div class="column is-half" *ngFor="let character of (dataSvc.characters$ | async)">


              <!-- CARD CHARACTER IN ALL INCLUSIVE VERSION TYPE -->
              <app-character-card-all-inclusive *ngIf="(dataSvc.selectedVersion$ | async) === VERSION_TYPE_ALL_INCLUSIVE"
                                                [character]="character"
                                                [locationsInfo]="dataSvc.locationsInfoAllInclusive"
                                                [episodesInfo]="dataSvc.episodesInfoAllInclusive"
              ></app-character-card-all-inclusive>

              <!-- CARD CHARACTER IN ALTERNATIVE VERSION TYPE -->
              <app-character-card *ngIf="(dataSvc.selectedVersion$ | async) === VERSION_TYPE_ALTERNATIVE"
                                  [character]="character"
                                  (locationInfo)="getLocationInfo($event)"
                                  (episodesInfo)="getEpisodesInfo(character, $event)"
              ></app-character-card>

            </div>
          </div>
        </div>
      </div>

      <!-- FOOTER      -->
      <div id='footer' class="p-4 has-shadow has-background-white">
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

  VERSION_TYPE_ALTERNATIVE: VersionType = 'alternative';
  VERSION_TYPE_ALL_INCLUSIVE: VersionType = 'all';

  // HEADER COMPONENT REF
  @ViewChild(HeaderComponent) headerComponentRef: HeaderComponent;

  constructor(public dataSvc: DataService) {
  }

  ngOnInit(): void {

    // FIRST CALL RUN FROM IT
    this.dataSvc.selectedVersion$.pipe(
      takeWhile(() => this.alive),
      switchMap(versionType => {

        // MANAGE CHANGE VERSION WITH ACTIVE FILTER
        // ASK FOR CHARACTERS CONSIDERING ALSO THE FILTER
        if (this.headerComponentRef) {
          this.goTo(1);
          return of(null);
        } else {
          // FIST TIME ON APP RUN
          return this.dataSvc.getCharacters();
        }

      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    // FOR UNSUBSCRIBE  THE SUBSCRIBERS USING TAKEWHILE
    this.alive = false;
  }

  // SEARCH BY CHARACTER NAME
  search(searchTerm): void {
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


  changeVersion(versionType: VersionType): void {
    this.dataSvc.selectedVersion = versionType;
  }

}
