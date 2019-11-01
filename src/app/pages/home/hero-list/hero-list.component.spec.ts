import { Pages } from './../../../shared/helpers/routes.helper';
import { Routes, Router } from '@angular/router';
import { HeroService } from './../../../shared/services/hero.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroListComponent } from './hero-list.component';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

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

  it('getHeroes() should http GET heroes list', () => {
    fixture.detectChanges();
    service.getHeroes().subscribe(res => {
      expect(service.getHeroes).toHaveBeenCalled();
      expect(res).toBeGreaterThan(1);
    });
  });

  it('should navigate to hero detail', () => {
    fixture.detectChanges();
    const router = TestBed.get(Router);
    component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.showHeroDetails(10);
    expect(navigateSpy).toHaveBeenCalled();
  });
});
