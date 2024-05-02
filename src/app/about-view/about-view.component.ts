import { Component } from '@angular/core';
import { ApiCaller } from '../api-caller';
import { Roles } from '../models/Roles';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about-view.component.html',
  styleUrl: './about-view.component.css'
})
export class AboutViewComponent {
text: string = '';

visible: boolean = false;

constructor(private caller: ApiCaller){}

onEdit(): void
{
 let role = Roles.Admin;

  this.caller.getUserRole().subscribe((response: number) =>
    {
      console.log(typeof(response))
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

    if (role == Roles.Admin)
      {
        this.visible = true;
      }
}

onSave(): void{
  this.visible = false;
}
}
