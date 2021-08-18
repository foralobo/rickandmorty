import {Component, Input, OnInit} from '@angular/core';
import {Episode} from '../../models';

@Component({
  selector: 'app-episodes-detail',
  template: `
    <div class="mx-3">
      <div class="has-overflow-auto has-border-top has-border-bottom"
           [style.max-height.px]="300"
      >

        <div *ngFor="let episode of episodesInfo" class="py-1 px-2 my-1 has-border has-radius episode-wrap">
          <div class="is-bold is-size-7 badge px-2 py-1 has-background-info1 has-text-white1">{{episode.episode}}</div>
          <div class="is-size-5">{{episode.name}}</div>

          <div class="is-flex is-justify-content-space-between">

            <div class="is-size-7">Characters in this episode: <span class="is-bold">{{episode.characters.length}}</span></div>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./episodes-detail.component.scss']
})
export class EpisodesDetailComponent {

  @Input() episodesInfo: Episode[] = [];

  constructor() {
  }

}
