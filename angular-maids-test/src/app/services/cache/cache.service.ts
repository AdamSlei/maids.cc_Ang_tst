import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();

  constructor() {}

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, data: any) {
    this.cache.set(key, data);
  }

  clear() {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }
}
