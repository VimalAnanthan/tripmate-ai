export interface PlaceSearchResult {
    id: string;
    name: string;
    displayName: string;
    latitude: number;
    longitude: number;
    district?: string;
    state?: string;
    country: string;
}