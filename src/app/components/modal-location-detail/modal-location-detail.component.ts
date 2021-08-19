import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '../../models';

@Component({
  selector: 'app-modal-location-detail',
  template: `
    <div class="modal"
         [class.is-active]="locationInfo">
      <div class="modal-background" (click)="closeModal.emit()"></div>

      <div class="modal-content has-background-white p-4 has-radius is-flex is-flex-direction-column" *ngIf="locationInfo">

        <div>Info about</div>
        <div class="title">{{locationInfo?.name}}</div>
        <div class="is-size-5">Location type <span class="is-bold">{{locationInfo.type}}</span></div>
        <div class="is-size-5">Dimension <span class="is-bold">{{locationInfo?.dimension}}</span></div>
        <div class="is-size-5">amount of residents <span class="is-bold">{{locationInfo.residents.length}}</span></div>

        <button class="button is-rounded is-info is-small is-align-self-flex-end" aria-label="close"
                (click)="closeModal.emit()">OK
        </button>
      </div>
      <button class="modal-close is-large" aria-label="close"
              (click)="closeModal.emit()"></button>
    </div>`,
  styleUrls: ['./modal-location-detail.component.scss']
})
export class ModalLocationDetailComponent implements OnInit {

  constructor() { }

  @Output() closeModal = new EventEmitter<any>();
  @Input() locationInfo: Location;

  ngOnInit(): void {
  }

}
