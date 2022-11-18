import { Person } from "./person.model";

describe('Test Person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Fulano', 'Detal', 25, 82, 1.77);
  });

  it('Attributes', () => {
    expect(person.name).toEqual('Fulano');
    expect(person.lastName).toEqual('Detal');
    expect(person.age).toEqual(25);
  });

  describe('Test for IMC',()=>{
    it('Should return down',()=>{
      person.weight = 58;
      person.height = 1.65;

      const result = person.calcIMC();

      expect(result).toEqual('normal');
    });
    // it('',()=>{});
    // it('',()=>{});
  });
});
