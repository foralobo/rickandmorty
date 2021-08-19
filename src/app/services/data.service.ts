import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, delay, mergeMap, take, tap, withLatestFrom} from 'rxjs/operators';
import {Character, PageInfo, ResponseApi, Location, Episode, VersionType} from '../models';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _selectedVersion$: BehaviorSubject<VersionType> = new BehaviorSubject<VersionType>('all');
  selectedVersion$ = this._selectedVersion$.asObservable();

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

  // KEEP IN MEMORY THE REQUESTED LOCATIONS (ALTERNATIVE VERSION TYPE)
  private locationsInfo = {};


  // KEEP IN MEMORY FOR PAGE (ALL INCLUSIVE VERSION TYPE)
  private _locationsInfoAllInclusive = {};
  get locationsInfoAllInclusive(): { [key: string]: Location } {
    return this._locationsInfoAllInclusive;
  }

  private _episodesInfoAllInclusive = {};
  get episodesInfoAllInclusive(): { [key: string]: Episode } {
    return this._episodesInfoAllInclusive;
  }

  readonly BASE_API_CHARACTER = 'https://rickandmortyapi.com/api/character';
  readonly BASE_API_EPISODES = 'https://rickandmortyapi.com/api/episode';
  readonly BASE_API_LOCATION = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {
  }

  // GET CHARACTERS WITH PAGINATION
  getCharacters(page = 1, name = ''): Observable<ResponseApi> {
    this._isLoading$.next(true);
    this._characters$.next([]);

    if (this._selectedVersion$.value === 'alternative') {
      return this._getCharactersAlternative(page, name);
    } else {
      return this._getCharactersAllInclusive(page, name);
    }
  }

  private _getIDsFromURLs(urls: string[]): number[] {
    return urls.map(key => parseInt(key.substr(key.lastIndexOf('/') + 1, key.length - 1), 10));
  }


  // GET CHARACTERS WITH PAGINATION (ALL INCLUSIVE TYPE)
  // IN THIS VERSION TYPE WILL BE DO THREE CALLS
  // STEPS:
  // - IT RUNS THE FIRST CALL TO GET CHARACTERS
  // - WITH THE CHARACTERS IN MEMORY, WE CAN GROUP ALL EPISODES AND LOCATIONS OF ALL CHARACTERS IN THE PAGES
  // - THE IT CAN DO THE TWO CALL IN PARALLEL (FORKJOIN RXJS OPERATOR) AND TO GET ALL INFO ON LOCATIONS AND EPISODES
  private _getCharactersAllInclusive(page = 1, name = ''): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.BASE_API_CHARACTER}/?page=${page}&name=${name}`).pipe(
      mergeMap(result => {

        this._pageInfo$.next(result.info);
        this._currentPage$.next(page);


        // USE OBJECTS INSTEAD OF ARRAYS
        const neededEpisodes = {};
        const neededLocations = {};

        // GET IDs OF LOCATIONS AND EPISODES OF ALL CHARACTERS
        // TO DO TWO CALLS (Q FOR LOCATIONS AND 1 FOR EPISODES)
        result.results.forEach(character => {
          // SOMETIMES URL IS NOT AVAILABLE
          if (character.origin.url) {
            neededLocations[character.origin.url] = null;
          }
          // SOMETIMES URL IS NOT AVAILABLE
          if (character.location.url) {
            neededLocations[character.location.url] = null;
          }

          character.episode.forEach(item => {
            neededEpisodes[item] = null;
          });
        });

        // GET IDS LIST OF EPISODES TO GET INFO ON THEM
        // console.log(neededEpisodes);
        // const episodesIDs = Object.keys(neededEpisodes).map(key => parseInt(key.substr(key.lastIndexOf('/') + 1, key.length - 1), 10));
        const episodesIDs = this._getIDsFromURLs(Object.keys(neededEpisodes));

        // GET IDS LIST OF LOCATIONS TO GET INFO ON THEM
        // console.log(neededLocations);
        // const locationIDs = Object.keys(neededLocations).map(key => parseInt(key.substr(key.lastIndexOf('/') + 1, key.length - 1), 10));
        const locationIDs = this._getIDsFromURLs(Object.keys(neededLocations));

        // console.log(episodesIDs);
        // console.log(locationIDs);
        // console.log(result);

        const episodesCall = this.http.get<Episode | Episode[]>(`${this.BASE_API_EPISODES}/${episodesIDs}`);
        const locationsCall = this.http.get<Location | Location[]>(`${this.BASE_API_LOCATION}/${locationIDs}`);

        return forkJoin([
          of(result.results),
          episodesCall,
          locationsCall,
          of(episodesIDs),
          of(locationIDs)
        ]);

      }),
      delay(200),

      tap(([characters, episodes, locations, episodesIDs, locationIDs]) => {

        // CASTING
        const episodesArray: Episode[] = episodesIDs.length > 1 ? episodes as Episode[] : [episodes as Episode];
        const locationArray: Location[] = locationIDs.length > 1 ? locations as Location[] : [locations as Location];

        // CREATE OBJECT WITH URL AS KEY AND OBJECT AS VALUE
        episodesArray.forEach(item => this._episodesInfoAllInclusive[`${this.BASE_API_EPISODES}/${item.id}`] = item);
        locationArray.forEach(item => this._locationsInfoAllInclusive[`${this.BASE_API_LOCATION}/${item.id}`] = item);
        // SET CHARACTERS LIST
        this._characters$.next(characters);

        // NOW THERE ARE ALL INFORMATION FOR PAGE

        console.log(this._episodesInfoAllInclusive);
        console.log(this._locationsInfoAllInclusive);

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

  // GET CHARACTERS WITH PAGINATION (ALTERNATIVE TYPE)
  private _getCharactersAlternative(page = 1, name = ''): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.BASE_API_CHARACTER}/?page=${page}&name=${name}`).pipe(
      tap(result => {
        this._characters$.next(result.results);
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

  // GET EPISODES BY IDS (ALTERNATIVE TYPE)
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

  // GET LOCATIONS BY URL (ALTERNATIVE TYPE)
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

        console.log(this.locationsInfo);
      }),

      catchError(err => {
        this._isLoading$.next(false);
        return of(err);
      })
    );
  }


  // SETTER FOR SETTING FRO EXTERNAL SOURCE
  set locationInfo(location) {
    this._locationInfo$.next(location);
  }

  set characterDetails(character) {
    this._characterDetails$.next(character);
  }

  set selectedVersion(version: VersionType) {
    this._selectedVersion$.next(version);
  }


}
