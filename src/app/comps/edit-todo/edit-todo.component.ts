import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent {
  currTodo: any;
  constructor(private todo: TodoService) {
    this.getCurrentTodo();
    this.editTodoGroup = new FormGroup({
      todo: new FormControl(this.currTodo.todo, Validators.required),
      status: new FormControl(this.currTodo.status, Validators.required),
      createdDate: new FormControl(this.currTodo.createdDate, Validators.required),
      id: new FormControl(this.currTodo.id)
    })
  }
  editTodoGroup!: FormGroup;
  statuses = [
    "New",
    "In Progress",
    "Completed",
  ];

  updateTodo() {
    console.log(this.editTodoGroup.value);
    this.todo.updateTodo(this.editTodoGroup.value).subscribe(res => {
      location.reload();
    })
  }

  getCurrentTodo() {
    this.currTodo = this.todo.getCurrentTodo()
  }
}
