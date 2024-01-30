import { ThemePalette } from '@angular/material/core';
import { FooterComponent } from '../shared/footer/footer.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { HeaderComponent } from './../shared/header/header.component';
import { Component } from '@angular/core';
import {
  MatProgressSpinnerModule,
  ProgressSpinnerMode,
} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    TodoListComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 10;
}
