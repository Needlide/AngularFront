import { Component, Input, OnInit } from '@angular/core';
import { ApiCaller } from '../api-caller';
import { FullUrl } from '../models/fullUrl';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-url-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './url-info.component.html',
  styleUrl: './url-info.component.css',
})
export class UrlInfoComponent implements OnInit {
  @Input() urlId: number = -1;
  url: FullUrl = {
    id: -1,
    createdDate: null,
    originalUrl: '',
    shortenedUrl: '',
    userId: -1,
  };

  constructor(private caller: ApiCaller) {}

  ngOnInit(): void {
    this.retrieveUrlInfo();
  }

  retrieveUrlInfo(): void {
    if (this.urlId) {
      this.caller.getInfo(this.urlId).subscribe(
        (response: FullUrl) => {
          this.url = response;
        }
      );
    }
  }
}
