export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions {
  reason: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface AlbumType {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: Artist[];
}

export interface AlbumsType {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: AlbumType[];
}

export interface IResponseAlbumsType {
  albums: AlbumsType;
}


  export interface ExternalUrls {
      spotify: string;
  }

  export interface Artist {
      external_urls: ExternalUrls;
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
  }

  export interface ExternalUrls2 {
      spotify: string;
  }

  export interface ExternalUrls3 {
      spotify: string;
  }

  export interface LinkedFrom {
      external_urls: ExternalUrls3;
      href: string;
      id: string;
      type: string;
      uri: string;
  }

  export interface Restrictions {
      reason: string;
  }

  export interface ITrackTypes {
      artists: Artist[];
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: ExternalUrls2;
      href: string;
      id: string;
      is_playable: boolean;
      linked_from: LinkedFrom;
      restrictions: Restrictions;
      name: string;
      preview_url: string;
      track_number: number;
      type: string;
      uri: string;
      is_local: boolean;
  }

  export interface IResponseTracksType {
      href: string;
      limit: number;
      next: string;
      offset: number;
      previous: string;
      total: number;
      items: ITrackTypes[];
  }


