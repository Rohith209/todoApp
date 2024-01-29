import { FooterComponent } from '../shared/footer/footer.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { HeaderComponent } from './../shared/header/header.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    TodoListComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
