import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Character, PageInfo, ResponseApi} from './models';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  pageInfo$: BehaviorSubject<PageInfo> = new BehaviorSubject<PageInfo>(null);
  characters$: BehaviorSubject<Character[]> = new BehaviorSubject<Character[]>([]);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  readonly BASE_API = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {
  }

  getCharacters(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(this.BASE_API).pipe(
      tap(result => {
        console.log(result);
        this.characters$.next(result.results);
        this.pageInfo$.next(result.info);
      })
    );
  }


}
