import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path      : '',
        pathMatch : 'full',
        loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)
    }
];

@NgModule({
    imports  : [RouterModule.forRoot(appRoutes)],
    exports  : [RouterModule],
    providers: []
})


export class AppRoutingModule {

    constructor(private router: Router) {
    }
}
