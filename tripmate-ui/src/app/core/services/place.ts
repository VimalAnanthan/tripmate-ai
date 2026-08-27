import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {

  private httpClient = inject(HttpClient);

  constructor(
   
  ){}

  getPlaces() {
    return this.httpClient.get<any>(`${environment.apiUrl}/places`);
  }
  
}
