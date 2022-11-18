import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should reverse the text "hello" to "olleh"', () => {
    const pipe = new ReversePipe();

    const expected = pipe.transform('hello');

    expect(expected).toEqual('olleh');
  });
});

@Component({
  template: `
  <p>{{texto | reverse}}</p>
  <input type="text" [(ngModel)]="texto" />
  `
})
class HostComponent {
  texto = 'hello';
}
describe('ReversePipe from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        HostComponent,
        ReversePipe,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reverse the text "hello" to "olleh" and display it', () => {
    const p: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;

    expect(component.texto).toBe('hello');
    expect(p.textContent).toEqual('olleh');
  });

  it('should reverse the text from the input and display it', () => {
    // Arrange
    const p: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    const input: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    // Act
    input.value = 'Hola mundo!!!';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Assert
    expect(p.textContent).toEqual('!!!odnum aloH');
  });


});
