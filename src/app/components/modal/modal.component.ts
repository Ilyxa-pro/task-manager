import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title?: string;
  private status = true;
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose($event: MouseEvent): void {
    this.status = false;
  }

}
