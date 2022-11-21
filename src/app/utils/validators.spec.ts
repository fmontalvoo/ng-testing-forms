import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './validators';

fdescribe('Test MyValidators', () => {
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
});
