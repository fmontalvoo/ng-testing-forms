import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Person } from 'src/app/models/person.model';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PeopleComponent,
        PersonComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of app-person components', () => {
    const people: Person[] = [
      ...component.people,
      new Person('Aquiles', 'Bailo', 31, 79, 1.70),
    ];
    component.people = people;
    fixture.detectChanges();

    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    expect(debugElement.length).toBeGreaterThanOrEqual(people.length);
  });

  it('should display the selected person data', () => {
    const buttonsDe: DebugElement[] = fixture.debugElement.queryAll(By.css('app-person .btn-slt'));
    const buttons = buttonsDe.map(btn => btn.nativeElement);

    buttonsDe[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    // const li: HTMLElement = fixture.debugElement.query(By.css('ul > li')).nativeElement;

    const debugElement: DebugElement[] = fixture.debugElement.queryAll(By.css('ul li'));
    const list: HTMLElement[] = debugElement.map(el => el.nativeElement);

    expect(list[0].textContent).toContain(component.selectedPerson?.name);
    // expect(li.textContent).toContain(component.selectedPerson?.name);
  });

});
