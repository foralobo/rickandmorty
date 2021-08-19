import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {
    console.log('init');
  }

  private _getIDsFromURLs(urls: string[]): number[] {
    return urls.map(key => parseInt(key.substr(key.lastIndexOf('/') + 1, key.length - 1), 10));
  }


}
