import { FormControl, FormGroup } from '@angular/forms';

import { of } from 'rxjs';

import { UserService } from '../services/user.service';

import { MyValidators } from './validators';

describe('Test MyValidators', () => {
  describe('Test validPassword', () => {
    it('should return null when the password is correct', () => {
      const control = new FormControl('Abc.123');

      const res = MyValidators.validPassword(control);

      expect(res).toBeNull();
    });

    it('should return an object when the password is wrong', () => {
      const control = new FormControl('abcdef');

      const res = MyValidators.validPassword(control);

      expect(res?.invalid_password).toBeTrue();
    });
  });

  describe('Test matchPasswords', () => {
    it('should return null when password and confirm password match', () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('123456'),
      });

      const res = MyValidators.matchPasswords(group);

      expect(res).toBeNull();
    });

    it("should return an object when password and confirm password doens't match", () => {
      const group = new FormGroup({
        password: new FormControl('123456'),
        confirmPassword: new FormControl('1234567'),
      });

      const res = MyValidators.matchPasswords(group);

      expect(res?.match_password).toBeTrue();
    });
  });

  describe('Test checkEmailAvailability', () => {
    const userService: jasmine.SpyObj<UserService> = jasmine.createSpyObj('UserService', ['isAvailableByEmail']);

    it('should return null when the email is available', (doneFn) => {
      const control = new FormControl('fgmo@mail.com');
      const validator = MyValidators.checkEmailAvailability(userService);

      userService.isAvailableByEmail.and.returnValue(of({ isAvailable: true }));

      validator(control)
        .subscribe(res => {
          expect(res).toBeNull();
          doneFn();
        });
    });

    it('should return an obj when the email is not available', (doneFn) => {
      const control = new FormControl('admin@mail.com');
      const validator = MyValidators.checkEmailAvailability(userService);

      userService.isAvailableByEmail.and.returnValue(of({ isAvailable: false }));

      validator(control)
        .subscribe(res => {
          expect(res?.not_available).toBeTrue();
          doneFn();
        });
    });
  });
});
