import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {BehaviorSubject} from 'rxjs';

const STORAGE_FAVORITES = 'favorites';
const STORAGE_OPTIONS = 'options';
type Favorites = {[key: string]: string};
type Options = {[key: string]: any};

@Injectable({
  providedIn: 'root'
})
export class WebstorageService {

  private favoritesSource = new BehaviorSubject<Favorites>({});
  favorites = this.favoritesSource.asObservable();

  private optionsSource = new BehaviorSubject<Favorites>({});
  options = this.optionsSource.asObservable();

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    /**
     * get localStorage favorites and apply in BehaviorSubject
     */
    const favorites: Favorites = this.storage.get(STORAGE_FAVORITES) || {};
    this.favoritesSource.next(favorites);

    /**
     * get localStorage options and apply in BehaviorSubject
     */
    const options: Options = this.storage.get(STORAGE_OPTIONS) || {};
    this.optionsSource.next(options);
  }

  /**
   * Save localStorage favorite and apply in BehaviorSubject
   */
  public saveFavorite(id: number, name?: string | false): Favorites {
    const favorites: Favorites = this.storage.get(STORAGE_FAVORITES) || {};
    !name ? delete favorites[id] : favorites[id] = name;
    this.favoritesSource.next(favorites);
    this.storage.set(STORAGE_FAVORITES, favorites);
    return favorites;
  }

  /**
   * Save localStorage options and apply in BehaviorSubject
   */
  public saveOptions(key: string, value: any): Favorites {
    const options: Options = this.storage.get(STORAGE_OPTIONS) || {};
    options[key] = value;
    this.optionsSource.next(options);
    this.storage.set(STORAGE_OPTIONS, options);
    return options;
  }

}
