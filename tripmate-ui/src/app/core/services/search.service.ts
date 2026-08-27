import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { PlaceSearchResult } from "../../models/place-search-result.model";

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private http = inject(HttpClient);

    searchPlace(query: string) {
        return this.http.get<PlaceSearchResult>(`${environment.apiUrl}/search`, {
            params: {
                query
            }
        });
    }
}