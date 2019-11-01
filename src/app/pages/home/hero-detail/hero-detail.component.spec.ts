import { Hero } from 'src/app/shared/models/hero.class';
import { HeroService } from 'src/app/shared/services/hero.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{id: 1}]),
          },
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the hero detail by id', async () => {
    const heroService = fixture.debugElement.injector.get(HeroService);
    const heroId = 9999;
    const hero: Hero = new Hero();

    component.getHeroDetail();
    fixture.detectChanges();

    spyOn(heroService, 'getHeroById').and.returnValue(of(hero));

    heroService.getHeroById(heroId).subscribe(res => {
      fixture.detectChanges();
      expect(heroService.getHeroById).toHaveBeenCalledWith(heroId);
      expect(res).toEqual(hero);
    });
  });


});
