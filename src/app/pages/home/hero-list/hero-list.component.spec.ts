import { Pages } from './../../../shared/helpers/routes.helper';
import { Routes, Router } from '@angular/router';
import { HeroService } from './../../../shared/services/hero.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListComponent } from './hero-list.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Hero } from 'src/app/shared/models/hero.class';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [HeroService]
    });

    service = TestBed.get(HeroService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to hero detail', () => {
    fixture.detectChanges();
    const router = TestBed.get(Router);
    component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.showHeroDetails(10);
    expect(navigateSpy).toHaveBeenCalled();
  });

  it('should get the hero list', async () => {
    const heroService = fixture.debugElement.injector.get(HeroService);
    const heroList: Hero[] = [];

    component.getHeroList();
    fixture.detectChanges();

    spyOn(heroService, 'getHeroes').and.returnValue(of(heroList));

    heroService.getHeroes().subscribe(res => {
      fixture.detectChanges();
      expect(heroService.getHeroes).toHaveBeenCalledTimes(1);
      expect(res).toEqual(heroList);
      expect(heroList).toBeLessThanOrEqual(10);
    });
  });
});
