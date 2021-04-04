import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TaskItem} from '../../../../interface';

@Component({
  selector: 'app-task-edit-modal',
  templateUrl: './task-edit-modal.component.html',
  styleUrls: ['./task-edit-modal.component.css']
})
export class TaskEditModalComponent implements OnInit {
  @Input() titleModal;
  @Input() index: number;
  @Input() task: TaskItem;
  @Output() closeModalTask = new EventEmitter<void>();

  constructor() { }
  close(): void {
    this.closeModalTask.emit();
  }
  ngOnInit(): void {
  }

}
