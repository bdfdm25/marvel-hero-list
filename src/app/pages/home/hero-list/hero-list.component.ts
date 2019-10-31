import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/shared/services/hero.service';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/shared/models/hero.model';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  // Subscriber
  public subscription: Subscription;

  // Heroes
  public heroList: Hero[] = [];

  constructor(
    private heroService: HeroService,
  ) { }

  ngOnInit() {
    this.getHeroList();
  }

  getHeroList() {
    this.subscription = this.heroService.getAll('/characters').subscribe(res => {
      this.heroList = res.data.results;
    });
  }

}
