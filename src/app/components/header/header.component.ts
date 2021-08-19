import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, skip, takeWhile} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {VersionType} from '../../models';

@Component({
  selector: 'app-header',
  template: `
    <div id='header'
         class="p-4 has-shadow has-background-white">
      <div class="is-flex is-justify-content-space-between container">

        <div class="is-flex is-align-items-center">
          <!-- LOGO   -->
          <img id="img-logo" src="assets/logo.png" alt="">

          <!-- SELECT VERSION          -->
          <div class="ml-6">
            <div class="is-bold is-size-7 mb-1">App Version</div>

            <div class="control has-icons-left">
              <div class="select is-info is-small">
                <select [ngModel]="selectedOption"
                        (ngModelChange)="changeVersion.emit($event)">
                  <option value="">Select version...</option>
                  <option value="all">Rick and Morty all inclusive</option>
                  <option value="alternative">Rick and Morty alternative</option>
                </select>
              </div>
              <div class="icon is-small is-left has-text-info">
                <i class="fas fa-code-branch"></i>
              </div>
            </div>
          </div>

        </div>

        <!-- SEARCH AND COUNT        -->
        <div class="is-flex is-align-items-center">

          <div class="mr-5">Characters found <span class="is-bold">{{totalCount || 0}}</span></div>
          <div class="field">
            <!--            is-loading-->
            <div class="control has-icons-left has-icons-right">
              <input class="input is-rounded is-info"
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

  @Input() totalCount: number;
  @Input() selectedOption = '';

  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeVersion: EventEmitter<VersionType> = new EventEmitter<VersionType>();

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
