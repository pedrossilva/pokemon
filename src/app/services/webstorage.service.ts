import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {BehaviorSubject} from 'rxjs';

const STORAGE_KEY = 'favorites';
type Favorites = {[key: string]: string};

@Injectable({
  providedIn: 'root'
})
export class WebstorageService {

  private favoritesSource = new BehaviorSubject<Favorites>({});
  favorites = this.favoritesSource.asObservable();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    const favorites: Favorites = this.storage.get(STORAGE_KEY) || {};
    this.favoritesSource.next(favorites);
  }

  public saveFavorite(id: number, name?: string | false): Favorites {
    const favorites: Favorites = this.storage.get(STORAGE_KEY) || {};
    !name ? delete favorites[id] : favorites[id] = name;
    this.favoritesSource.next(favorites);
    this.storage.set(STORAGE_KEY, favorites);
    return favorites;
  }

}
