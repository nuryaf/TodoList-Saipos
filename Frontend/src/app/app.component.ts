import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './models/task';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent implements OnInit {

  todoTask = {} as Task;
  todoTasks: Task[];

  doneTask = {} as Task;
  doneTasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getToDoList();
    this.getDoneList();
  }

  getToDoList() {
    this.taskService.getToDoList().subscribe((tasks: Task[]) => {
      this.todoTasks = tasks;
    });
  }

  postNewTask(form: NgForm) {
    this.taskService.postNewTask(this.todoTask).subscribe(() => {
      this.cleanForm(form);
    });
  }

  updateTaskDone(id: number) {
    this.taskService.updateTaskDone(id).subscribe(() => {
      this.getToDoList();
      this.getDoneList();
    });
  }

  getDoneList() {
    this.taskService.getDoneList().subscribe((tasks: Task[]) => {
      this.doneTasks = tasks;
    });
  }

  updateTaskTodo(id: number, password: string) {
    this.taskService.updateTaskTodo(id, password).subscribe(() => {
      this.getToDoList();
      this.getDoneList();
    });
  }

  showForm() {
    document.getElementById('add-form').style.display = "block";
  }

  closeForm() {
    document.getElementById('add-form').style.display = "none";
  }

  showPopup(id: string) {
    document.getElementById(id).style.display = "block";
  }

  closePopup(id: string) {
    document.getElementById(id).style.display = "none";
  }

  done (id: number, password: string) {
    this.updateTaskTodo(id, password);
  }

  cleanForm(form: NgForm) {
    this.closeForm();
    this.getToDoList();
    this.getDoneList();
    form.resetForm();
    //this.todoTask = {} as Task;    
  }
}
