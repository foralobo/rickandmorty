import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CharacterCardComponent} from './components/character-card/character-card.component';
import {PaginatorComponent} from './components/paginator/paginator.component';
import {EpisodesDetailComponent} from './components/episodes-detail/episodes-detail.component';
import {ModalEpisodesDetailComponent} from './components/modal-episodes-detail/modal-episodes-detail.component';
import {ModalLocationDetailComponent} from './components/modal-location-detail/modal-location-detail.component';
import {HeaderComponent} from './components/header/header.component';
import {FormsModule} from '@angular/forms';
import { CharacterCardAllInclusiveComponent } from './components/character-card-all-inclusive/character-card-all-inclusive.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCardComponent,
    PaginatorComponent,
    EpisodesDetailComponent,
    ModalEpisodesDetailComponent,
    ModalLocationDetailComponent,
    HeaderComponent,
    CharacterCardAllInclusiveComponent,
    LoadingComponent,
    LocationDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
