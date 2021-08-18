import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="modal-background is-flex is-align-items-center" style="z-index: 100; background-color: rgb(10 10 10/48%)">
      <svg
        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        style="margin: auto; background: none; display: block; shape-rendering: auto;" width="171px" height="171px"
        viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <path d="M11 50A39 39 0 0 0 89 50A39 45.9 0 0 1 11 50" fill="#07b2c9" stroke="none">
          <animateTransform attributeName="transform" type="rotate" dur="0.36101083032490977s" repeatCount="indefinite" keyTimes="0;1"
                            values="0 50 53.45;360 50 53.45"/>
        </path>
      </svg>
    </div>`,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor() {
  }
}
