import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoService } from '../../services/todo.service';
import { ToastrService } from 'ngx-toastr';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css',
})
export class EditTodoComponent implements OnInit {
  editTodoGroup: FormGroup = this.fb.group({
    todo: [null, Validators.required],
    status: [null, Validators.required],
    createdDate: [null, Validators.required],
    id: [null],
  });
  statuses = ['New', 'In Progress', 'Completed'];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<EditTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {}
  ) { }

  ngOnInit(): void {
    this.editTodoGroup.patchValue(this.data);
  }

  updateTodo() {
    this.dialog.close(this.editTodoGroup.value);
  }
}
