import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.scss']
})
export class ArtistSearchComponent implements OnInit {

  artist: string;
  @Output() artistInfo: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  getArtistData() {
    this.apiService.getArtists(this.artist, 10)
      .subscribe((d) => {
        const payload = d['artists'][0];
        this.artistInfo.emit(payload);
      });
  }

}
