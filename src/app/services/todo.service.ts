import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public URL = 'https://todoapp-7bbab-default-rtdb.firebaseio.com/';

  public currentTodo: [] = [];
  public isValueChanged:boolean = false;

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get(this.URL + 'todos.json');
  }

  postTodos(todo: any) {
    return this.http.post(this.URL + 'todos.json', todo);
  }

  setCurrentTodo(todo: any) {
    this.currentTodo = todo;
  }

  getCurrentTodo() {
    return this.currentTodo;
  }

  updateTodo(todo: any) {
    return this.http.put(this.URL + 'todos/' + todo.id + '.json', todo);
  }

  deleteTodo(id: string) {
    return this.http.delete(this.URL + 'todos/' + id + '.json');
  }

}
