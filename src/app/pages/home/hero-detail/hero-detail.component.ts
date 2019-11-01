import { HeroService } from './../../../shared/services/hero.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Hero, Thumbnail } from 'src/app/shared/models/hero.class';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  // Subscriber
  public subscription: Subscription;

  // Hero Helpers
  public heroId: number | string;
  public hero: Hero = new Hero();
  public imgUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService
  ) {
    this.getParams();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getParams() {
    if (this.activatedRoute) {
      this.subscription = await this.activatedRoute.params.subscribe(params => {
        this.heroId = params.id;
        this.getHeroDetail();
      });
    }
  }

  async getHeroDetail() {
    this.subscription = await this.heroService.getHeroById(this.heroId).subscribe(res => {
      this.hero = res.data.results[0];
      this.imgUrl = this.createImgUrl(this.hero.thumbnail);
    });
  }

  createImgUrl(thumbnail): string {
    const variantName = '/standard_fantastic';
    const extension = thumbnail.extension;
    const url = thumbnail.path + variantName + '.' + extension;

    return url;
  }

}
