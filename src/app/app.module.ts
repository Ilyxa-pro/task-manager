import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TasksModule } from './modules/tasks/tasks.module';
import {ShareModule} from './modules/share/share.module';
import {AppRoutingModule} from './app-routing.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TasksModule,
    BrowserModule,
    ShareModule,
    AppRoutingModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
