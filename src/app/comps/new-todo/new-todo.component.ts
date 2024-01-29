import { MatInputModule } from '@angular/material/input';
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.css'
})
export class NewTodoComponent {
  todoGroup!: FormGroup;
  statuses = [
    "New",
    "In Progress",
    "Completed",
  ]
  constructor(private todo: TodoService, private toastr: ToastrService) {
    this.todoGroup = new FormGroup({
      todo: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      createdDate: new FormControl('', Validators.required)
    })
  }
  addTodo() {
    console.log(this.todoGroup.value);
    this.todo.postTodos(this.todoGroup.value).subscribe((resp: any) => {
      if (resp) {
        this.toastr.success("ToDo Added!", "Success");
        location.reload();
      }
    })
  }
}
