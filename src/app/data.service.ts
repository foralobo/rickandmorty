import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {Character, PageInfo, ResponseApi, Location, Episode} from './models';
import {EntryPoint} from '@angular/compiler-cli/ngcc/src/packages/entry_point';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _pageInfo$: BehaviorSubject<PageInfo> = new BehaviorSubject<PageInfo>(null);
  pageInfo$ = this._pageInfo$.asObservable();
  private _characters$: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
  characters$ = this._characters$.asObservable();

  private _currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPage$ = this._currentPage$.asObservable();
  private _totalCountCharacters$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  totalCountCharacters$ = this._totalCountCharacters$.asObservable();

  private _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading$.asObservable();

  private _locationInfo$: BehaviorSubject<Location> = new BehaviorSubject<Location>(null);
  locationInfo$ = this._locationInfo$.asObservable();
  private _characterDetails$: BehaviorSubject<Character> = new BehaviorSubject<Character>(null);
  characterDetails$ = this._characterDetails$.asObservable();

  // KEEP IN MEMORY THE REQUESTED LOCATIONS
  private locationsInfo = {};


  readonly BASE_API_CHARACTER = 'https://rickandmortyapi.com/api/character';
  readonly BASE_API_EPISODES = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {
  }

  // GET CHARACTERS WITH PAGINATION
  getCharacters(page = 1, name = ''): Observable<ResponseApi> {

    this._isLoading$.next(true);
    return this.http.get<ResponseApi>(`${this.BASE_API_CHARACTER}/?page=${page}&name=${name}`).pipe(
      tap(result => {

        this._characters$.next(result.results);
        // this._totalCountCharacters$.next(result.info.count);
        this._pageInfo$.next(result.info);
        this._currentPage$.next(page);
        this._isLoading$.next(false);
      }),
      catchError(err => {
        this._characters$.next([]);
        this._currentPage$.next(1);
        const info: PageInfo = {
          count: 0,
          next: '',
          prev: '',
          pages: 0
        };
        this._pageInfo$.next(info);

        this._isLoading$.next(false);
        return of(err);
      })
    );
  }

  // // GET CHARACTERS WITH PAGINATION
  // searchForCharacters(search = 1): Observable<ResponseApi> {
  //
  //   this._isLoading$.next(true);
  //   return this.http.get<ResponseApi>(`${this.BASE_API_CHARACTER}/?page=${page}`).pipe(
  //     tap(result => {
  //
  //       this._characters$.next(result.results);
  //       this._pageInfo$.next(result.info);
  //       this._currentPage$.next(page);
  //       this._isLoading$.next(false);
  //     }),
  //     catchError(err => {
  //       this._isLoading$.next(false);
  //       return of(err);
  //     })
  //   );
  // }

  // GET EPISODES BY IDS
  getEpisodes(character: Character, ids: number[]): Observable<Episode | Episode[]> {

    // THIS CHARACTER ALREADY HAS THE INFORMATIONS
    if (character.episodesInfo && character.episodesInfo.length) {
      this._characterDetails$.next(character);
      return of(null);
    }

    // IF THE CHARACTER HAS NOT THE INFORMATIONS
    this._isLoading$.next(true);
    return this.http.get<Episode | Episode[]>(`${this.BASE_API_EPISODES}/${ids}`).pipe(
      withLatestFrom(this.characters$),
      tap(([result, characters]) => {

        const characterToUpdate = characters.find(item => item.id === character.id);
        if (characterToUpdate) {
          // ASSIGN THE EPISODES INFO TO ARRAY WITH CAST BECAUSE THA PI CAR RETURN A SINGLE EPISODE O MORE EPISODES
          characterToUpdate.episodesInfo = ids.length === 1 ? [result as Episode] : result as Episode[];
        }
        this._characters$.next(characters);
        // ADD CHARACTER IN MEMORY
        this._characterDetails$.next(characterToUpdate);

        this._isLoading$.next(false);
      }),
      catchError(err => {
        this._isLoading$.next(false);
        return of(err);
      })
    );
  }

  // GET LOCATIONS BY URL
  getLocations(url: string): Observable<Location> {

    // SEARCH FOR LOCATION IN MEMORY
    const splitted = url.split('/');
    const locationID = splitted[splitted.length - 1];
    if (this.locationsInfo[locationID]) {
      this.locationInfo = this.locationsInfo[locationID];
      return of(null);
    }

    // IF LOCATION NOT FOUND IN MEMORY
    this._isLoading$.next(true);
    return this.http.get<Location>(url).pipe(
      tap(result => {
        console.log(result);
        this.locationInfo = result;
        // ADD LOCATION IN MOMORY
        this.locationsInfo[locationID] = result;
        this._isLoading$.next(false);
      }),

      catchError(err => {
        this._isLoading$.next(false);
        return of(err);
      })
    );
  }

  set locationInfo(location) {
    this._locationInfo$.next(location);
  }

  set characterDetails(character) {
    this._characterDetails$.next(character);
  }

  // get pageInfo$(): Observable<PageInfo> {
  //   return this._pageInfo$.asObservable();
  // }
  //
  // get characters$(): Observable<Character[]> {
  //   return this._characters$.asObservable();
  // }
  //
  // get currentPage$(): Observable<number> {
  //   return this._currentPage$.asObservable();
  // }
  //
  // get isLoading$(): Observable<boolean> {
  //   return this._isLoading$.asObservable();
  // }
  //
  // get selectedCharacterDetails$(): Observable<Character> {
  //   return this._characterDetails$.asObservable();
  // }
  //
  // get selectedLocationInfo$(): Observable<Location> {
  //   return this._locationInfo$.asObservable();
  // }


}
