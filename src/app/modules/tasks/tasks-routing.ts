import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import {TaskListComponent} from './components/task-list/task-list.component';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: '',
        component: TaskListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes) // .forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule],
  providers: []
})

export class TasksRouting { }
