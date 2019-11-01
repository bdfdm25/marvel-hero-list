export class Hero {
  id: number;
  name: string;
  resourceURI: string;
  description: string;
  thumbnail: Thumbnail;
  series: object;
  stories: object;

  constructor(json?: any) {
    if (json) {
      Object.assign(this, json);
    }
  }
}

export class Thumbnail {
  extension: string;
  path: string;
}

