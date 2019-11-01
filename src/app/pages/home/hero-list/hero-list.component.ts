import { Pages } from './../../../shared/helpers/routes.helper';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeroService } from 'src/app/shared/services/hero.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Hero } from 'src/app/shared/models/hero.class';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit, OnDestroy {

  // Subscriber
  public subscription: Subscription;

  // Heroes
  public heroList: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getHeroList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getHeroList() {
    this.subscription = this.heroService.getHeroes().subscribe(res => {
      this.heroList = res.data.results.splice(10);
    }, error => {
      console.log(error);
    });
  }

  showHeroDetails(id) {
    this.router.navigate([Pages.HERO_DETAIL, id]);
  }

}
