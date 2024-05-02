import { Component, OnInit } from '@angular/core';
import { ErorService } from '../eror.service';
import { CommonModule, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {
  errorMessage: string | undefined;

  constructor(private errorService: ErorService) { }

  ngOnInit(): void {
    this.errorService.errorMessage$.subscribe(message => { this.errorMessage = message });
  }
}
