import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }
  set(key: string, value: string) {
    localStorage.setItem(key, value);
}

get(key: string) {
    return localStorage.getItem(key);
}

remove(key: string) {
  localStorage.removeItem(key);
  localStorage.clear()
}
}
