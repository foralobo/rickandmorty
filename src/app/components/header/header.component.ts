import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, skip, takeWhile} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-header',
  template: `
    <div class="p-4 has-shadow has-background-white">
      <div class="is-flex is-justify-content-space-between">
        <img id="img-logo" src="assets/logo.png" alt="">

        <div class="is-flex is-align-items-center">

          <div class="mr-5">Characters found <span class="is-bold">{{totalCount || 0}}</span></div>
          <div class="field">
            <!--            is-loading-->
            <div class="control has-icons-left has-icons-right">
              <input class="input is-rounded"
                     type="text"
                     placeholder="Search for name"
                     [value]="searchTerm$ | async"
                     (input)="searchTerm$.next($event.target['value'])">
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
    </div>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  alive = true;
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();
  @Input() totalCount: number;

  constructor() {
  }

  ngOnInit(): void {
    this.searchTerm$.pipe(
      takeWhile(() => this.alive),
      skip(1),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(search => {
      this.searchTerm.emit(search);
    });
  }

}
