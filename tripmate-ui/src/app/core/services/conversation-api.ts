import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConversationDetail, ConversationListResponse } from '../interfaces/conversation-interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ConversationApiService {
  private httpClient = inject(HttpClient);

  listConversations(search: string, page: number, limit: number) {
    let params = new HttpParams().set('page', page).set('limit', limit);
    console.log("SEARCH", search);
    if (search) params = params.set('search', search);

    return this.httpClient.get<ConversationListResponse>(`${environment.apiUrl}/conversations`, { params });
  }

  getMessage(id: number) {
    return this.httpClient.get<ConversationDetail>(`${environment.apiUrl}/conversations/${id}`);
  }
}
