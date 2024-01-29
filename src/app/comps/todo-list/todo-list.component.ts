import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TodoService } from '../../services/todo.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewTodoComponent } from '../new-todo/new-todo.component';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, DatePipe, MatButtonModule, JsonPipe, MatProgressSpinnerModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})



export class TodoListComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'status', 'createdAt', 'actions'];

  constructor(private todo: TodoService, private dialog: MatDialog) { }
  dataSource: [] = [];

  ngOnInit(): void {
    this.todo.getTodos().subscribe((response: any) => {
      let keys = (Object.keys(response));
      response = Object.values(response);
      response = response.map((res: any, index: number) => {
        return { ...res, id: keys[index] };
      });
      this.dataSource = response;
    })
  }

  editTodo(todo: any) {
    this.todo.setCurrentTodo(todo);
    this.dialog.open(EditTodoComponent);
  }

  deleteTodo(id: string) {
    this.todo.deleteTodo(id).subscribe((resp: any) => {
      console.log(resp);
      location.reload();
    })
  }

}
