import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init(); // Inicializamos el almacenamiento al construir el servicio
  }

  // Método para inicializar el almacenamiento
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  private async ensureStorageReady() {
    if (!this._storage) {
      await this.init(); 
    }
  }

  // Método para guardar un valor en el almacenamiento
  public async set(key: string, value: any): Promise<void> {
    await this.ensureStorageReady();
    await this._storage?.set(key, value);
  }

  // Método para obtener un valor del almacenamiento
  public async get(key: string): Promise<any> {
    await this.ensureStorageReady();
    return this._storage?.get(key);
  }

  // Método para eliminar un valor del almacenamiento
  public async remove(key: string): Promise<void> {
    await this.ensureStorageReady();
    await this._storage?.remove(key);
  }

  // Método específico para guardar el correo formateado
  public async setCorreo(correo: string): Promise<void> {
    await this.set('correo_formateado', correo);
  }

  // Método específico para obtener el correo formateado
  public async getCorreo(): Promise<string | null> {
    return await this.get('correo_formateado');
  }
  
}
