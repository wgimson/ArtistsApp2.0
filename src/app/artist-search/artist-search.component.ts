import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  styleUrls: ['./artist-search.component.scss']
})
export class ArtistSearchComponent implements OnInit {

  artist: string;
  @Output() artistInfo: EventEmitter<any> = new EventEmitter<any>();
  @Output() fromDateEvent: EventEmitter<NgbDate> = new EventEmitter<NgbDate>();
  @Output() toDateEvent: EventEmitter<NgbDate> = new EventEmitter<NgbDate>();

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(
    calendar: NgbCalendar,
    private apiService: ApiService,
    private spinnerService: Ng4LoadingSpinnerService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
  }

  getArtistData() {
    this.spinnerService.show();
    this.apiService.getArtists(this.artist, 10)
      .subscribe((d) => {
        const payload = d['artists'][0];
        payload.app_fromDate = this.fromDate;
        payload.app_toDate = this.toDate;
        this.artistInfo.emit(payload);
      });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    return { fromDate: this.fromDate, toDate: this.toDate };
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
