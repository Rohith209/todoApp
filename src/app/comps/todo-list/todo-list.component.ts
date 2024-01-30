import {
  Component,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TodoService } from '../../services/todo.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    DatePipe,
    MatButtonModule,
    JsonPipe,
    MatProgressSpinnerModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = [
    'sno',
    'name',
    'status',
    'createdAt',
    'actions',
  ];

  dataSource: [] = [];
  isLoading: boolean = true;
  
  constructor(private todo: TodoService, 
    private dialog: MatDialog,
    private toastr: ToastrService) 
  {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todo.getTodos().subscribe((response: any) => {
      this.isLoading = false;
      if(response != null) {
        let keys = Object.keys(response);
        response = Object.values(response);
        response = response.map((res: any, index: number) => {
          return { ...res, id: keys[index] };
        });
        this.dataSource = response;
        this.todo.isValueChanged = false;
      } else {
        this.todo.isValueChanged = false;
        return;
      }
      
    });
  }

  editTodo(todo: any) {
    this.dialog.open(EditTodoComponent, {
      data: todo
    }).afterClosed().subscribe((data) => { 
      if(data) {
       this.updateTodo(data);
      }
    })

  }

  updateTodo(todo:any) {
    this.todo.updateTodo(todo).subscribe((res) => {
      if(res) {
        this.toastr.success("ToDo Updated!", "Success");
        this.fetchTodos();
      }
    })
  }

  deleteTodo(id: string) {
    this.isLoading = true;
    this.todo.deleteTodo(id).subscribe(() => {
      this.fetchTodos();
    });
  }
}
