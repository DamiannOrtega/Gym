import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  get<T>(key: string): T[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  set<T>(key: string, data: T[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeAt<T>(key: string, index: number): T[] {
    const data = this.get<T>(key);
    data.splice(index, 1);
    this.set<T>(key, data);
    return data;
  }

  updateAt<T>(key: string, index: number, newData: T): T[] {
    const data = this.get<T>(key);
    data[index] = newData;
    this.set<T>(key, data);
    return data;
  }
}
