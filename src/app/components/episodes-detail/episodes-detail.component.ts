import {Component, Input, OnInit} from '@angular/core';
import {Episode} from '../../models';

@Component({
  selector: 'app-episodes-detail',
  template: `
    <div class="has-overflow-auto mt-2 has-border p-2 has-radius"
         [style.max-height.px]="300"
    >

      <div *ngFor="let episode of episodesInfo" class="has-border p-2 my-1">
        {{episode.name}}
        <!--          max-height: 300px;-->
        <!--          overflow: auto;-->
      </div>
    </div>`,
  styleUrls: ['./episodes-detail.component.scss']
})
export class EpisodesDetailComponent implements OnInit {

  @Input() episodesInfo: Episode[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
