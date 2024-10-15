import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';  // Para *ngFor
import { FormsModule } from '@angular/forms';  // Para ngModel

@Component({ 
  imports: [CommonModule,FormsModule],
  standalone: true,
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  newTask: Task = { id: 0, title: '', description: '', completed: false };

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (this.newTask.title && this.newTask.description) {
      this.taskService.addTask(this.newTask);
      this.newTask = { id: 0, title: '', description: '', completed: false }; // Reset form
    }
  }
}
