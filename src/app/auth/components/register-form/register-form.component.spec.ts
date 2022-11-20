import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from 'src/app/services/user.service';

import { RegisterFormComponent } from './register-form.component';
import { getText, query, setInputValue } from 'src/testing';

fdescribe('RegisterFormComponent', () => {
  let userService: UserService;
  let http: HttpTestingController;

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
    http = TestBed.inject(HttpTestingController);

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

    const errorMessage = getText(fixture, 'email-invalid');

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

  it('the form should be invalid', () => {
    component.form.patchValue({
      name: 'fulano',
      email: 'fulano@email.com',
      password: 'Abc.1234',
      confirmPassword: 'Abc.1234',
      checkTerms: false,
    });

    expect(component.form.invalid).toBeTruthy();
  });
});
