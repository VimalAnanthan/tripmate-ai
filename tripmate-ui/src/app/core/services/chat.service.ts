import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChatResponse } from "../interfaces/chat-response-interface";
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})

export class ChatService {
    private http = inject(HttpClient);

    sendMessage(message: string, conversationId?: number): Observable<ChatResponse> {
        return this.http.post<ChatResponse>(`${environment.apiUrl}/chat`, { message, conversationId });
    }
}