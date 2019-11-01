import { environment } from './../../../environments/environment';

const BASE_URL = environment.apiUrl;

export class Routes {

  // Characters
  static HEROES = `${BASE_URL}/characters`;

  // Character by ID
  static HERO_BY_ID = (id: number | string) => `${BASE_URL}/characters/${id}`;
}

export class Pages {
  static HOME = '/home';
  static HERO_DETAIL = '/home/hero-detail';
}
