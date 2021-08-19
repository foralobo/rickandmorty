import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character, Episode, Location} from '../../models';

@Component({
  selector: 'app-character-card-all-inclusive',
  template: `
    <div class="p-3" *ngIf="character"
         [class.box]="!modalMode"
    >
      <nav class="level mb-2">
        <div class="level-left">
          <div class="level-item">
            <div class="is-size-5 is-flex is-align-items-centers is-flex-direction-column">
              <div>{{character.name}}</div>
              <div class="is-size-6 has-text-grey">{{character.gender}}</div>
            </div>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item has-text-centered">
            <div>
              <div class="is-size-6">
                Species <span class="is-bold">{{character.species}}</span>
              </div>
              <div class="is-size-6">
                Status <span class="is-bold">{{character.status}}</span>
                <i *ngIf="character.status === STATUS_DEAD" class="ml-2 fas fa-frown has-text-danger"></i>
                <i *ngIf="character.status === STATUS_ALIVE" class="ml-2 fas fa-smile has-text-success"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>


      <div class="is-flex is-align-items-center my-2">

        <div class="is-flex is-flex-direction-column is-align-items-center">
          <figure class="image is-128x128">
            <img class="is-rounded" [src]="character.image" style="box-shadow: 2px 2px 4px -1px #a2a2a2"/>
          </figure>
        </div>

        <div class="ml-4 is-flex-grow-1">

          <app-location-detail title="Comes from" [location]="locationsInfo[character.origin.url]"></app-location-detail>
          <div class="has-border-bottom my-3"></div>
          <app-location-detail title="Last know location" [location]="locationsInfo[character.location.url]"></app-location-detail>
        </div>

      </div>

      <div class="has-border-bottom">Episodes list (<span class="is-bold">{{character.episode.length}}</span>)</div>

      <div class="pt-2 has-overflow-auto is-flex is-flex-wrap-wrap"
           [style.max-height.px]="105">

        <div *ngFor="let episode of character.episode" class="is-bold is-size-7 "
             [style.width.%]="50">

          <div class="is-ellipsis" [title]="episodesInfo[episode].name">
            <span class="tag is-info my-1 mr-2"
                  [style.width.px]="65"
            >{{episodesInfo[episode].episode}}</span>
            <span>{{episodesInfo[episode].name}}</span>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./character-card-all-inclusive.component.scss']
})
export class CharacterCardAllInclusiveComponent implements OnInit {

  readonly STATUS_ALIVE = 'Alive';
  readonly STATUS_DEAD = 'Dead';

  @Input() modalMode = false;
  @Input() character: Character;
  @Input() locationsInfo: { [key: string]: Location };
  @Input() episodesInfo: { [key: string]: Episode };

  constructor() {
  }

  ngOnInit(): void {
  }

}
