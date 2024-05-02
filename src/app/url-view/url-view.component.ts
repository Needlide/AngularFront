import { Component } from '@angular/core';
import { ApiCaller } from '../api-caller';
import { ErorService } from '../eror.service';

@Component({
  selector: 'app-url-view',
  standalone: true,
  imports: [],
  templateUrl: './url-view.component.html',
  styleUrl: './url-view.component.css'
})
export class UrlViewComponent {
constructor(private caller: ApiCaller, private errorService: ErorService){}

}
