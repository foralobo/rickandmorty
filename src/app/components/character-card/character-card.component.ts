import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from '../../models';

@Component({
  selector: 'app-character-card',
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
            <img class="is-rounded" [src]="character.image" style="box-shadow: 2px 2px 4px -1px #a2a2a2" />
          </figure>

        </div>

        <div class="ml-6">
          <div>
            <ng-template #unknownLocation>
              <span class="is-italic is-size-7 has-text-grey">Unknown location</span>
            </ng-template>

            <div class="is-size-6 mb-2">
              <div class="is-bold is-size-7">Comes from</div>
              <div *ngIf="character.origin.name !== 'unknown' else unknownLocation"
                   [class.has-text-info]="!modalMode"
                   [class.has-cursor-pointer]="!modalMode"
                   (click)="!modalMode && locationInfo.emit(character.origin.url)"
              >{{character.origin.name}}</div>
            </div>

            <div class="is-size-6 mb-2">
              <div class="is-bold is-size-7">Last known location</div>
              <div *ngIf="character.location.name !== 'unknown' else unknownLocation"
                   [class.has-text-info]="!modalMode"
                   [class.has-cursor-pointer]="!modalMode"
                   (click)="!modalMode && locationInfo.emit(character.location.url)"
              >{{character.location.name}}</div>
            </div>
          </div>
        </div>

      </div>


      <div class="has-border-top pt-2 is-flex is-justify-content-space-between is-align-items-center">
        <div class="">Episodes: <span class="is-bold">{{character.episode.length}}</span></div>
        <div *ngIf="!modalMode" class="is-size-7 has-text-info has-cursor-pointer" (click)="detailsToggle()">See details</div>
      </div>
    </div>
  `,
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  readonly STATUS_ALIVE = 'Alive';
  readonly STATUS_DEAD = 'Dead';

  // readonly GENDER_MALE = 'Male';
  // readonly GENDER_FEMALE = 'Female';

  @Input() modalMode = false;

  @Input() character: Character;
  @Output() locationInfo: EventEmitter<string> = new EventEmitter<string>();
  @Output() episodesInfo: EventEmitter<number[]> = new EventEmitter<number[]>();

  constructor() {
  }

  ngOnInit(): void {
  }

  detailsToggle(): void {
    // GET IDS LIST OF EPISODES TO GET INFO ON THEM
    const episodeListIDs = this.character.episode.map(item => {
      const splitted = item.split('/');
      return parseInt(splitted[splitted.length - 1], 10);
    });
    this.episodesInfo.emit(episodeListIDs);
  }

}
