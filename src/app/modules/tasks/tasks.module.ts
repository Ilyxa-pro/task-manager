import { NgModule } from '@angular/core';
import { TasksComponent } from './tasks.component';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import {ShareModule} from '../share/share.module';
import {TasksRouting} from './tasks-routing';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TaskEditModalComponent } from './components/task-edit-modal/task-edit-modal.component';


@NgModule({
  declarations: [
    TasksComponent,
    TaskItemComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskEditModalComponent,
  ],
  imports: [
    MatDatepickerModule,
    ShareModule,
    TasksRouting,
  ],
  providers: [
     TaskService
  ],
})
export class TasksModule { }
