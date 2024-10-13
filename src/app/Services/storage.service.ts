import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init(); 
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ensureStorageReady() {
    if (!this._storage) {
      await this.init(); 
    }
  }

  public async set(key: string, value: any): Promise<void> {
    await this.ensureStorageReady();
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    await this.ensureStorageReady();
    return this._storage?.get(key);
  }


  public async remove(key: string): Promise<void> {
    await this.ensureStorageReady();
    await this._storage?.remove(key);
  }


  public async setCorreo(correo: string): Promise<void> {
    await this.set('correo_formateado', correo);
  }


  public async getCorreo(): Promise<string | null> {
    return await this.get('correo_formateado');
  }
  
}
