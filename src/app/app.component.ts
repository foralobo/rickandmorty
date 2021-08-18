import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {Character} from './models';
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, take, takeWhile} from 'rxjs/operators';


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
      <div class="p-4 has-shadow has-background-white">
        <div class="is-flex is-justify-content-space-between">
          <img id="img-logo" src="assets/logo.png" alt="">

          <div class="is-flex is-align-items-center">

            <div class="mr-5">Characters found <span class="is-bold">{{(dataSvc.pageInfo$ | async)?.count}}</span></div>
            <div class="field">
              <!--            is-loading-->
              <div class="control has-icons-left has-icons-right">
                <input class="input is-rounded"
                       type="text"
                       placeholder="Search fo characters"
                       [value]="searchTerm$ | async"
                       (input)="searchTerm$.next($event.target['value'])"
                >
                <div class="icon is-left">
                  <i class="fas fa-search"></i>
                </div>
                <div class="icon is-right"
                     *ngIf="searchTerm$ | async">
                  <i (click)="searchTerm$.next('')"
                     class="fas fa-times-circle has-cursor-pointer"></i>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- BODY  -->
      <div class="is-flex-grow-1 p-4 has-overflow-auto is-flex-direction-column"
           [class.is-flex] = "!(dataSvc.characters$ | async)?.length"
      >

        <div class="is-flex is-justify-content-center is-align-items-center is-flex-grow-1" *ngIf="!(dataSvc.characters$ | async)?.length">
          <div class="is-flex is-flex-direction-column is-align-items-center">
            <div class="is-size-1 has-text-grey">no characters found</div>
            <i class="mt-5 is-size-1 has-text-grey fas fa-frown"></i>
          </div>
        </div>

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
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(public dataSvc: DataService) {
  }

  ngOnInit(): void {

    // -- ATTENTION: THIS RUN THE FIRST CALL
    // OPTIMIZATION FOR SEARCH
    // CALL API ONLY IF CHANGE SEARCH TERM
    this.searchTerm$.pipe(
      takeWhile(() => this.alive),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(search => {
      this.dataSvc.getCharacters(1, search).subscribe();
    });
  }

  ngOnDestroy(): void {
    // FOR UNSUBSCRIBE  THE SUBSCRIBERS USING TAKEWHILE
    this.alive = false;
  }

  goTo(page: number): void {
    console.log(page);
    this.searchTerm$.pipe(take(1)).subscribe(search => {
      this.dataSvc.getCharacters(page, search).subscribe();
    });
  }

  getLocationInfo(url: string): void {
    this.dataSvc.getLocations(url).subscribe();
  }

  getEpisodesInfo(character: Character, ids: number[]): void {
    this.dataSvc.getEpisodes(character, ids).subscribe();
  }


}
