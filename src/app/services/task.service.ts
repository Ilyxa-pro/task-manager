import {Injectable} from '@angular/core';
import {TaskItem} from '../interface';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {Directions, StatusTask} from '../interface/type';
import {debounceTime, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private testTasks: BehaviorSubject<TaskItem[]> = new BehaviorSubject([]);
  private readonly updateTasks$: Subject<TaskItem[]> = new Subject<TaskItem[]>();
  constructor() { }

  createTask(task: TaskItem): void {
    this.testTasks.getValue().unshift(task);
    this.updateTasks(this.testTasks.getValue());
  }

  editTask(task: TaskItem, idx: number): void {
    const tasks = this.testTasks.getValue();
    tasks.splice(idx, 1, task);
    this.updateTasks(tasks);
  }

  completeTask(index): void {
    this.testTasks.getValue()[index].complete = !this.testTasks.getValue()[index].complete;
    this.updateTasks(this.testTasks.getValue());
  }

  watchTasks(): Observable<any> {
    return this.updateTasks$.pipe(
        debounceTime(500),
        tap(value => {
          localStorage.setItem('tasks', JSON.stringify(value));
        })
    );
  }

  updateStatusTasks(time = 25000): Observable<any> {
    return interval(time).pipe(
        tap(() => {
          let tasks = this.testTasks.getValue();
          if (tasks) {
            tasks = this.testTasks.getValue().map((e) => {
              e.status = this.statusUpdate(e.deadline);
              return e;
            });
            this.updateTasks(tasks);
          }
        })
    );
  }

  updateTasks(value: TaskItem[]): void {
    this.updateTasks$.next(value);
  }

  downloadTask(): BehaviorSubject<Array<TaskItem>> {
    let tasks = JSON.parse(localStorage.getItem('tasks')) as Array<TaskItem>;
    tasks = Array.isArray(tasks) ? tasks : [];
    this.testTasks.next(tasks);
    return this.testTasks;
  }

  editWeight(index: number, operation: Directions): void {
    const tasks = this.testTasks.getValue();
    let idx = null;
    if ( operation === Directions.Up ) {
      idx = index - 1 < 0 ? 0 : index - 1;
    } else if (operation === Directions.Down) {
      idx = index + 1 > tasks.length - 1  ? tasks.length - 1  : index + 1 ;
    }
    if (idx !== null) {
      tasks.splice(idx, 0, tasks.splice(index, 1)[0]);
      this.updateTasks(tasks);
    }
  }

  statusUpdate(date: number): StatusTask {
    date = new Date(date).getTime();
    const todayTime = Date.now();
    return date < todayTime ? StatusTask.Expired :
      date - todayTime >= 3 * 24 * 3600 * 1000 ?
        StatusTask.Normal : StatusTask.Expiring;
  }

}
