import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TaskItem} from '../../../../interface';
import {TaskService} from '../../../../services/task.service';
import {Subject, Subscription} from 'rxjs';
import {RefDirective} from '../../../../directives/ref.directive';
import {TaskEditModalComponent} from '../task-edit-modal/task-edit-modal.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  private updateStatusTask$: Subscription;
  private tasksSub$: Subscription;
  loading = true;
  tasks: Array<TaskItem> = [];
  modalComponent: ComponentRef<TaskEditModalComponent>;
  @ViewChild(RefDirective) refDir: RefDirective;
  private destroy$: Subject<any> = new Subject();
  constructor( private taskService: TaskService,
               private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.tasksSub$ = this.taskService.downloadTask().pipe(
        takeUntil(this.destroy$)
    ).subscribe(
    (el) => {
      this.tasks = el;
      this.loading = false;
      this.updateStatusTask$ = this.taskService.updateStatusTasks(60000).pipe(
          takeUntil(this.destroy$)
      ).subscribe();
    });
    this.taskService.watchTasks().pipe(
        takeUntil(this.destroy$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  editTask(index: number): void {
    const task = this.tasks[index];
    const modalFactory = this.resolver.resolveComponentFactory(TaskEditModalComponent);
    this.refDir.containerRef.clear();
    this.modalComponent = this.refDir.containerRef.createComponent(modalFactory);
    this.modalComponent.instance.titleModal = 'Edit task ' + task.title;
    this.modalComponent.instance.task = task;
    this.modalComponent.instance.index = index;
    this.modalComponent.instance.closeModalTask.pipe(
        takeUntil(this.destroy$)
    ).subscribe( () => {
      this.refDir.containerRef.clear();
      this.modalComponent.destroy();
    });
  }

}
