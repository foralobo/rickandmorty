import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Character} from '../../models';

@Component({
  selector: 'app-modal-episodes-detail',
  template: `
    <div class="modal"
         [class.is-active]="character"
    >
      <div class="modal-background" (click)="closeModal.emit()"></div>
      <div class="modal-content has-background-white p-4 has-radius is-flex is-flex-direction-column">
        <!-- Any other Bulma elements you want -->
        <div>
          <app-character-card [modalMode]="true"
                              [character]="character"
          ></app-character-card>

          <app-episodes-detail [episodesInfo]="character?.episodesInfo"></app-episodes-detail>
        </div>

        <button class="button is-rounded is-info is-small is-align-self-flex-end mt-2" aria-label="close"
                (click)="closeModal.emit()">Close
        </button>
      </div>
      <button class="modal-close is-large" aria-label="close"
              (click)="closeModal.emit()"></button>
    </div>`,
  styleUrls: ['./modal-episodes-detail.component.scss']
})
export class ModalEpisodesDetailComponent implements OnInit {

  @Output() closeModal = new EventEmitter<any>();
  @Input() character: Character;

  constructor() {
  }

  ngOnInit(): void {
  }

}
