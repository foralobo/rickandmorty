import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {Character, PageInfo, ResponseApi, Location, Episode} from './models';
import {EntryPoint} from '@angular/compiler-cli/ngcc/src/packages/entry_point';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  pageInfo$: BehaviorSubject<PageInfo> = new BehaviorSubject<PageInfo>(null);
  characters$: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  locationInfo$: BehaviorSubject<Location> = new BehaviorSubject<Location>(null);

  characterDetails$: BehaviorSubject<Character> = new BehaviorSubject<Character>(null);


  readonly BASE_API_CHARACTER = 'https://rickandmortyapi.com/api/character';
  readonly BASE_API_EPISODES = 'https://rickandmortyapi.com/api/episode';

  // readonly BASE_API_LOCATION = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {
  }

  getCharacters(page = 1): Observable<ResponseApi> {

    this.isLoading$.next(true);
    return this.http.get<ResponseApi>(`${this.BASE_API_CHARACTER}/?page=${page}`).pipe(
      tap(result => {
        console.log(result);
        this.characters$.next(result.results);
        this.pageInfo$.next(result.info);
        this.currentPage$.next(page);
        this.isLoading$.next(false);
      }),
      catchError(err => {
        this.isLoading$.next(false);
        return of(err);
      })
    );
  }

  getEpisodes(character: Character, ids: number[]): Observable<Episode | Episode[]> {

    // THIS CHARACTER ALREADY HAS THE INFORMATIONS
    if (character.episodesInfo && character.episodesInfo.length) {
      this.characterDetails$.next(character);
      return of(null);
    }

    // IF THE CHARACTER HAS NOT THE INFORMATIONS
    this.isLoading$.next(true);
    return this.http.get<Episode | Episode[]>(`${this.BASE_API_EPISODES}/${ids}`).pipe(
      withLatestFrom(this.characters$),
      tap(([result, characters]) => {

        const characterToUpdate = characters.find(item => item.id === character.id);
        if (characterToUpdate) {
          // ASSIGN THE EPISODES INFO TO ARRAY WITH CAST BECAUSE THA PI CAR RETURN A SINGLE EPISODE O MORE EPISODES
          characterToUpdate.episodesInfo = ids.length === 1 ? [result as Episode] : result as Episode[];
        }
        this.characters$.next(characters);
        this.characterDetails$.next(characterToUpdate);

        this.isLoading$.next(false);
      }),
      catchError(err => {
        this.isLoading$.next(false);
        return of(err);
      })
    );
  }


  getLocations(url: string): Observable<Location> {

    this.isLoading$.next(true);
    return this.http.get<Location>(url).pipe(
      tap(result => {
        console.log(result);

        // this.locationInfo$.next(result);
        this.locationInfo = result;


        this.isLoading$.next(false);
      }),
      catchError(err => {
        this.isLoading$.next(false);
        return of(err);
      })
    );
  }

  set locationInfo(location) {
    this.locationInfo$.next(location);
  }

  set characterDetails(character) {
    this.characterDetails$.next(character);
  }


}
