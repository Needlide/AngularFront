import { Component, Input, OnInit } from '@angular/core';
import { ApiCaller } from '../api-caller';
import { ErorService } from '../eror.service';
import { UrlModel } from '../models/url';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Roles } from '../models/Roles';
import { SimpleUrl } from '../models/simpleUrl';
import { UrlInfoComponent } from '../url-info/url-info.component';

@Component({
  selector: 'app-url-view',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule, FormsModule, UrlInfoComponent],
  templateUrl: './url-view.component.html',
  styleUrl: './url-view.component.css',
})
export class UrlViewComponent implements OnInit {
  constructor(private caller: ApiCaller, private errorService: ErorService) {}
  @Input() dataSource: UrlModel[] = [];

  errorMessage: string = '';
  url: SimpleUrl = { url: '' };
  visible: boolean = false;
  showInfo: boolean = false;
  urlInfoId: number = -1;

  ngOnInit(): void {
    this.apiCall();

    let role = Roles.Admin;

    this.caller.getUserRole().subscribe((response: number) => {
      console.log(typeof response);
      switch (response) {
        case 0:
          role = Roles.Admin;
          return;
        case 1:
          role = Roles.User;
          return;
        case 2:
          role = Roles.Unregistered;
          return;
      }
    });

    if (role == Roles.Admin || role == Roles.User) {
      console.log('URL Submit input is visible');
      this.visible = true;
    }
  }

  deleteUrl(id: number): void {
    this.caller.deleteUrl(id).subscribe({
      complete: () => {
        this.apiCall();
      },
      error: (e) => {
        if (e.status === 401) {
          this.errorMessage = 'You are not authorized for this action';
        }
      },
    });
  }

  apiCall(): void {
    this.caller.getAllUrls().subscribe((response: UrlModel[]) => {
      this.dataSource = response;
    });
  }

  onSubmit(): void {
    if (this.dataSource.some((obj) => obj.originalUrl == this.url.url)) {
      this.errorMessage = "Can't add existing URL.";
      this.url.url = '';
      return;
    }

    this.visible = false;
    this.caller.postUrl(this.url).subscribe((response: string) => {
      this.errorMessage = response;
    });
  }

  showUrlInfo(urlId: number): void {
    this.urlInfoId = urlId;
    this.showInfo = true;
  }
}
