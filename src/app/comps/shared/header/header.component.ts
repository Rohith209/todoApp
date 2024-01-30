import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewTodoComponent } from '../../new-todo/new-todo.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userName!: any;

  constructor(
    private dialog: MatDialog, 
    private router: Router, 
    private toastr: ToastrService,
    private todo: TodoService
  ) { 

  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('user');
  }

  openDialog() {
    this.dialog.open(NewTodoComponent).afterClosed().subscribe((data) => {
      this.addNewTodo(data);
    });
  }

  addNewTodo(todo: any) {
    this.todo.postTodos(todo).subscribe((data:any) => {
      if(data) {
        this.toastr.success("Todo Added Successfully", "Success");
        location.reload();
      }
    }) 
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }  
}
