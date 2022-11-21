import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from 'src/app/services/user.service';

import { RegisterFormComponent } from './register-form.component';
import { asyncResolve, clickElement, getText, query, setCheckValue, setInputValue } from 'src/testing';

import { generateUser } from 'src/app/data/user.mock';

fdescribe('RegisterFormComponent', () => {
  let userService: UserService;

  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [RegisterFormComponent],
      providers: [UserService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    userService = TestBed.inject(UserService);

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should email be in a invalid format', () => {
    // const emailField = component.form.get('email');
    const emailField = component.emailField;

    emailField?.setValue('email');
    expect(emailField?.invalid).withContext('Invalid format').toBeTruthy();

    emailField?.setValue('');
    expect(emailField?.invalid).withContext('Empty email').toBeTruthy();
  });

  it('should email be in a invalid format filled from UI', () => {
    const emailField = component.emailField;

    setInputValue(fixture, 'Email', 'input#email');
    fixture.detectChanges();

    expect(emailField?.invalid).withContext('Invalid format').toBeTruthy();

    const errorMessage = getText(fixture, 'email-invalid', true);

    expect(errorMessage).toContain("It's not a email");
  });


  it('should password be in a invalid format', () => {
    const passwordField = component.passwordField;

    passwordField?.setValue('');
    expect(passwordField?.invalid).withContext('Empty password').toBeTruthy();

    passwordField?.setValue('12345');
    expect(passwordField?.invalid).withContext('Lack of characters').toBeTruthy();

    passwordField?.setValue('Abcde');
    expect(passwordField?.invalid).withContext('Must have at least one number').toBeTruthy();
  });

  it('should send the form successfully', fakeAsync(() => {
    component.form.patchValue({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: 'Abc.1234',
      confirmPassword: 'Abc.1234',
      checkTerms: true,
    });

    const mockUser = generateUser();
    spyOn(userService, 'create').and.returnValue(asyncResolve(mockUser));
    component.register(new Event('submit'));
    expect(component.form.valid).withContext('Form should be valid').toBeTruthy();
    expect(component.status).withContext('Status should be "loading"').toEqual('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).withContext('Status should be "success"').toEqual('success');
    expect(userService.create).withContext('Create should have been called').toHaveBeenCalled();
  }));

  it('should send the form successfully from UI', fakeAsync(() => {

    setInputValue(fixture, 'Fulano', 'input#name');
    setInputValue(fixture, 'fulano@email.com', 'input#email');
    setInputValue(fixture, 'Abc.1234', 'input#password');
    setInputValue(fixture, 'Abc.1234', 'input#confirmPassword');
    setCheckValue(fixture, true, 'input#terms');

    const mockUser = generateUser();
    spyOn(userService, 'create').and.returnValue(asyncResolve(mockUser));

    clickElement(fixture, 'btn-submit', true);
    // query(fixture, 'form').triggerEventHandler('ngSubmit', new Event('submit')); // Lanza el evento "(ngSubmit)" del formulario.
    fixture.detectChanges();

    expect(component.form.valid).withContext('Form should be valid').toBeTruthy();
    expect(component.status).withContext('Status should be "loading"').toEqual('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).withContext('Status should be "success"').toEqual('success');
    expect(userService.create).withContext('Create should have been called').toHaveBeenCalled();
  }));
});
