import {Component, Input, OnInit} from '@angular/core';
import {Location} from '../../models';

@Component({
  selector: 'app-location-detail',
  template: `
    <ng-template #locationDetail>

      <div>
        <div class="is-flex is-align-items-center mb-1">

          <div class="is-size-7 is-bold  mr-3">{{title}}</div>
          <div class="is-size-6">{{location.name}}</div>
        </div>
        <div class="is-flex">
          <div class="is-size-7">Location type <span class="is-bold">{{location.type}}</span></div>
          <div class="is-size-7 ml-2">Dimension <span class="is-bold">{{location.dimension}}</span></div>
        </div>
        <div class="is-size-7">Amaunt of residents <span class="is-bold">{{location.residents.length}}</span></div>
      </div>
    </ng-template>


    <div *ngIf="!location || !location.name; else locationDetail" class="my-3">
      <div class="is-size-7 is-bold  mr-3">{{title}}</div>
      <span class="is-italic is-size-7 has-text-grey">Unknown location</span>
    </div>
  `,
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {

  @Input() title: string;
  @Input() location: Location;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.location);
  }

}
