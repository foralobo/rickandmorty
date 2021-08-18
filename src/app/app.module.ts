import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { EpisodesDetailComponent } from './components/episodes-detail/episodes-detail.component';
import { ModalEpisodesDetailComponent } from './components/modal-episodes-detail/modal-episodes-detail.component';
import { ModalLocationDetailComponent } from './components/modal-location-detail/modal-location-detail.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCardComponent,
    PaginatorComponent,
    EpisodesDetailComponent,
    ModalEpisodesDetailComponent,
    ModalLocationDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
