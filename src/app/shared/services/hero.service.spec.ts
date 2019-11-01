import { Routes } from './../helpers/routes.helper';
import { HeroService } from 'src/app/shared/services/hero.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('HeroService', () => {
  let injector: TestBed;
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });

    injector = getTestBed();
    service = injector.get(HeroService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('#getHeroes', () => {
    it('should return an Observable<any>', () => {
      const dummyHeroes = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];

      service.getHeroes().subscribe(heroes => {
        expect(heroes.length).toBe(2);
        expect(heroes).toEqual(dummyHeroes);
      });

      const req = httpMock.expectOne(Routes.HEROES);
      expect(req.request.method).toBe('GET');
      req.flush(dummyHeroes);
    });
  });

  describe('#getHeroeById', () => {
    it('should return an Observable<any> by ID', () => {
      const dummyHeroes = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];

      service.getHeroById(1).subscribe(hero => {
        expect(hero).toEqual(dummyHeroes[0]);
      });

      const req = httpMock.expectOne(Routes.HERO_BY_ID(1));
      expect(req.request.method).toBe('GET');
      req.flush(dummyHeroes[0]);
    });
  });
});
