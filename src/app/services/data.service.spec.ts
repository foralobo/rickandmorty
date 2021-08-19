import {TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Character, Location, ResponseApi} from '../models';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.inject(DataService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('_getIDsFromURLs() returns number[] if pass string[] (url)', () => {
    const array = [
      'https://rickandmortyapi.com/api/episode/10',
      'https://rickandmortyapi.com/api/episode/22',
      'https://rickandmortyapi.com/api/episode/28',
      'x/7/z/22'
    ];

    expect(service['_getIDsFromURLs'](array)).toEqual([10, 22, 28, 22]);
  });


  it('#getCharacters returns expected data', (done) => {
    const expectedData: ResponseApi = {
      info: {
        count: 671,
        pages: 34,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        prev: null
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1'
          },
          location: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20'
          }, image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/3',
            'https://rickandmortyapi.com/api/episode/4',
            'https://rickandmortyapi.com/api/episode/5',
            'https://rickandmortyapi.com/api/episode/6',
            'https://rickandmortyapi.com/api/episode/7',
            'https://rickandmortyapi.com/api/episode/8',
            'https://rickandmortyapi.com/api/episode/9',
            'https://rickandmortyapi.com/api/episode/10',
            'https://rickandmortyapi.com/api/episode/11',
            'https://rickandmortyapi.com/api/episode/12',
            'https://rickandmortyapi.com/api/episode/13',
            'https://rickandmortyapi.com/api/episode/14',
            'https://rickandmortyapi.com/api/episode/15',
            'https://rickandmortyapi.com/api/episode/16',
            'https://rickandmortyapi.com/api/episode/17',
            'https://rickandmortyapi.com/api/episode/18',
            'https://rickandmortyapi.com/api/episode/19',
            'https://rickandmortyapi.com/api/episode/20',
            'https://rickandmortyapi.com/api/episode/21',
            'https://rickandmortyapi.com/api/episode/22',
            'https://rickandmortyapi.com/api/episode/23',
            'https://rickandmortyapi.com/api/episode/24',
            'https://rickandmortyapi.com/api/episode/25',
            'https://rickandmortyapi.com/api/episode/26',
            'https://rickandmortyapi.com/api/episode/27',
            'https://rickandmortyapi.com/api/episode/28',
            'https://rickandmortyapi.com/api/episode/29',
            'https://rickandmortyapi.com/api/episode/30',
            'https://rickandmortyapi.com/api/episode/31',
            'https://rickandmortyapi.com/api/episode/32',
            'https://rickandmortyapi.com/api/episode/33',
            'https://rickandmortyapi.com/api/episode/34',
            'https://rickandmortyapi.com/api/episode/35',
            'https://rickandmortyapi.com/api/episode/36',
            'https://rickandmortyapi.com/api/episode/37',
            'https://rickandmortyapi.com/api/episode/38',
            'https://rickandmortyapi.com/api/episode/39',
            'https://rickandmortyapi.com/api/episode/40',
            'https://rickandmortyapi.com/api/episode/41'
          ],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z'
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1'
          },
          location: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20'
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
            'https://rickandmortyapi.com/api/episode/3',
            'https://rickandmortyapi.com/api/episode/4',
            'https://rickandmortyapi.com/api/episode/5',
            'https://rickandmortyapi.com/api/episode/6',
            'https://rickandmortyapi.com/api/episode/7',
            'https://rickandmortyapi.com/api/episode/8',
            'https://rickandmortyapi.com/api/episode/9',
            'https://rickandmortyapi.com/api/episode/10',
            'https://rickandmortyapi.com/api/episode/11',
            'https://rickandmortyapi.com/api/episode/12',
            'https://rickandmortyapi.com/api/episode/13',
            'https://rickandmortyapi.com/api/episode/14',
            'https://rickandmortyapi.com/api/episode/15',
            'https://rickandmortyapi.com/api/episode/16',
            'https://rickandmortyapi.com/api/episode/17',
            'https://rickandmortyapi.com/api/episode/18',
            'https://rickandmortyapi.com/api/episode/19',
            'https://rickandmortyapi.com/api/episode/20',
            'https://rickandmortyapi.com/api/episode/21',
            'https://rickandmortyapi.com/api/episode/22',
            'https://rickandmortyapi.com/api/episode/23',
            'https://rickandmortyapi.com/api/episode/24',
            'https://rickandmortyapi.com/api/episode/25',
            'https://rickandmortyapi.com/api/episode/26',
            'https://rickandmortyapi.com/api/episode/27',
            'https://rickandmortyapi.com/api/episode/28',
            'https://rickandmortyapi.com/api/episode/29',
            'https://rickandmortyapi.com/api/episode/30',
            'https://rickandmortyapi.com/api/episode/31',
            'https://rickandmortyapi.com/api/episode/32',
            'https://rickandmortyapi.com/api/episode/33',
            'https://rickandmortyapi.com/api/episode/34',
            'https://rickandmortyapi.com/api/episode/35',
            'https://rickandmortyapi.com/api/episode/36',
            'https://rickandmortyapi.com/api/episode/37',
            'https://rickandmortyapi.com/api/episode/38',
            'https://rickandmortyapi.com/api/episode/39',
            'https://rickandmortyapi.com/api/episode/40',
            'https://rickandmortyapi.com/api/episode/41'
          ],
          url: 'https://rickandmortyapi.com/api/character/2',
          created: '2017-11-04T18:50:21.651Z'
        },
      ]
    };

    service.selectedVersion = 'alternative';
    service.getCharacters(5).subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne(`${service.BASE_API_CHARACTER}/?page=5&name=`);

    testRequest.flush(expectedData);
  });


  it('#getLocations return expected data', (done) => {
    const expectedData: Location = {
      id: 2,
      name: 'Abadango',
      type: 'Cluster',
      dimension: 'unknown',
      residents: [
        'https://rickandmortyapi.com/api/character/6'
      ],
      url: 'https://rickandmortyapi.com/api/location/2',
      created: '2017-11-10T13:06:38.182Z'
    };

    const url = 'https://rickandmortyapi.com/api/location/20';
    service.getLocations(url).subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    const testRequest = httpTestingController.expectOne(`${service.BASE_API_LOCATION}/20`);

    testRequest.flush(expectedData);
  });

});
