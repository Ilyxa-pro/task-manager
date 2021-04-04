import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Directions, StatusTask } from '../../../../interface/type';
import { TaskService } from '../../../../services/task.service';
import {ModalComponent} from '../../../../components/modal/modal.component';
import {RefDirective} from '../../../../directives/ref.directive';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() deadline: number;
  @Input() complete: boolean;
  @Input() status: StatusTask;
  @Input() index: number;
  @Input() last: boolean;
  @Output() edit = new EventEmitter<number>();
  stateDescription = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  editDirection(index: number, directions: Directions): void {
    this.taskService.editWeight(index, directions);
  }
  setStateDescription(): void {
    this.stateDescription = !this.stateDescription;
  }
  completeChange(): void {
    this.taskService.completeTask(this.index);
  }

  editInfo(index: number): void {
    this.edit.emit(index);
  }
}
