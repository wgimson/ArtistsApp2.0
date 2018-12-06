import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host = 'https://api.nextbigsound.com';
  accessToken = 'eb74a82009cbc53c9b44866743633f9d';

  constructor(private http: HttpClient) { }

  getArtists(artist, limit) {
    const path = `/search/v1/artists/?query=${artist}&limit=${limit}&access_token=${this.accessToken}`;
    const url = this.host + path;
    return this.http.get(url);
  }

  getEvents(artistId, startDay, endDay) {
    const path = `/events/v1/entity/${artistId}?start=${startDay}&end=${endDay}&access_token=${this.accessToken}`;
    const url = this.host + path;
    return this.http.get(url);
  }

  getTimeSeries(artistId, metrics, startDate, endDate) {
    const path = `/artists/${artistId}/data?metricIds=${metrics}&startDate=${startDate}&endDate=${endDate}&timeseries=totals,deltas&access_token=${this.accessToken}`;
    const url = this.host + path;
    return this.http.get(url);
  }

  getAllMetrics() {
    const path = `/metrics?fields=items.*&access_token=${this.accessToken}`;
    const url = this.host + path;
    return this.http.get(url);
  }

  getMetric(metricId) {
    const path = `/metrics/${metricId}?&access_token=${this.accessToken}`;
    const url = this.host + path;
    return this.http.get(url);
  }
}
