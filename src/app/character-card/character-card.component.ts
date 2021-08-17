import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../models';

@Component({
  selector: 'app-character-card',
  template: `

    <div class="box p-3">


      <div class="is-flex is-justify-content-space-between is-align-items-center">
        <div class="is-size-4 is-flex is-align-items-center">{{character.name}}
          <span class="is-size-6 ml-3">{{character.gender}}</span>
        </div>

        <div>
          <div class="mr-4  is-size-6">Species <span class="is-bold">{{character.species}}</span></div>
          <div class="is-size-6">
            Status <span class="is-bold">{{character.status}}</span>
            <i *ngIf="character.status === STATUS_DEAD" class="ml-2 fas fa-frown has-text-danger"></i>
            <i *ngIf="character.status === STATUS_ALIVE" class="ml-2 fas fa-smile has-text-success"></i>
          </div>
        </div>
      </div>

      <div class="is-flex is-align-items-center my-2">

        <div class="is-flex is-flex-direction-column is-align-items-center">
          <figure class="image is-128x128">
            <img class="is-rounded" [src]="character.image"/>
          </figure>

        </div>

        <div class="ml-6">
          <div class="">
            <div class="is-size-6 mb-2">
              <div class="is-bold">Comes from</div>
              <div class="has-text-info has-cursor-pointer">{{character.origin.name}}</div>
            </div>

            <div class="is-size-6 mb-2">
              <div class="is-bold">Last known location</div>
              <div class="has-text-info has-cursor-pointer">{{character.location.name}}</div>
            </div>
          </div>
        </div>

      </div>


      <div class="has-border-top py-2 is-flex is-justify-content-space-between is-align-items-center">
        <div class="">Episodes: {{character.episode.length}}</div>
        <div class="is-size-7 has-text-info has-cursor-pointer">See details</div>
      </div>
    </div>
  `,
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  STATUS_ALIVE = 'Alive';
  STATUS_DEAD = 'Dead';

  @Input() character: Character;

  constructor() {
  }

  ngOnInit(): void {
  }

}
