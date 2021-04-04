import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TaskService} from '../../../../services/task.service';
import {TaskItem} from '../../../../interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import CustomValidators from '../../../../classes/validators';
import {RefDirective} from '../../../../directives/ref.directive';
import GeneralHelper from '../../../../helpers/general.helper';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormComponent implements OnInit, OnDestroy {
  @ViewChild(RefDirective) refDir: RefDirective;
  @Output() closeModal = new EventEmitter<void>();
  @Input() task: TaskItem = {
    title: null,
    description: null,
    deadline: null,
    complete: false,
    status: null,
  };
  timeDeadline = '00:00';
  @Input() idx = null;
  @Input() title = null;
  form: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(private taskService: TaskService,
              private generalHelper: GeneralHelper) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    this.minDate = date;
    this.maxDate = new Date(year + 1, month, day);
    if (this.idx !== null) {
      const dateTask = new Date(this.task.deadline);
      const taskHours = dateTask.getHours() > 9 ? dateTask.getHours() : '0' + dateTask.getHours();
      const taskMinutes = dateTask.getMinutes() > 9 ? dateTask.getMinutes() : '0' + dateTask.getMinutes();
      this.timeDeadline = taskHours + ':' + taskMinutes;
    }
    this.form = new FormGroup({
      title: new FormControl(this.task.title, Validators.required),
      description: new FormControl(this.task.description),
      deadline: new FormControl(this.task.deadline, [Validators.required, CustomValidators.validateDateFormat]),
      complete: new FormControl(false),
      status: new FormControl(null),
      time: new FormControl(this.timeDeadline),
    }, Validators.required);
  }

  taskSubmit(): void {
    if (this.form.valid) {
      const formData = {...this.form.value};
      formData.status = this.taskService.statusUpdate(new Date(formData.deadline).getTime());
      formData.deadline = this.generalHelper.transformDate(formData.deadline, formData.time);
      delete formData.time;
      if (this.idx === null) {
        this.taskService.createTask(formData);
      } else {
        this.taskService.editTask(formData, this.idx);
        this.closeModal.emit();
      }
      this.form.reset();
    }
  }

  ngOnDestroy(): void {
  }

}
