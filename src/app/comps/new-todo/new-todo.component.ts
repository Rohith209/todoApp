import { MatInputModule } from '@angular/material/input';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.css',
})
export class NewTodoComponent implements OnInit {
  todoGroup: FormGroup = this.fb.group({
    todo: [null, Validators.required],
    status: [null, Validators.required],
    createdDate: [null, Validators.required],
  });

  statuses = ['New', 'In Progress', 'Completed'];
  constructor(
    private todo: TodoService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    private dialog: MatDialogRef<NewTodoComponent>
  ) {}

  ngOnInit(): void {
    this.todoGroup.patchValue(this.data);
  }

  addTodo() {
    this.dialog.close(this.todoGroup.value);
  }
}
