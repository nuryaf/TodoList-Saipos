import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  url = 'http://localhost:3333/';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getToDoList(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  postNewTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(this.url, JSON.stringify(task), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateTaskDone(id: number): Observable<Task> {
    return this.httpClient.put<Task>(this.url, JSON.stringify({ id: id }), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getDoneList(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.url + 'done')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  updateTaskTodo(id: number, password: string): Observable<Task> {
    return this.httpClient.put<Task>(this.url + 'done', JSON.stringify({ id: id, password: password }), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
