import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  imc = '';
  @Input() person: Person | undefined = undefined;
  @Output() onSelected = new EventEmitter<Person>();

  constructor() { }

  ngOnInit(): void {
  }

  calcIMC() {
    this.imc = this.person?.calcIMC() ?? 'N/A';
  }

  onClick(){
    this.onSelected.emit(this.person);
  }

}
