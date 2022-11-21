import faker from '@faker-js/faker';

import { User } from '../models/user.model';

export const generateUser = (): User => {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  };
}

export const generateUsers = (limit = 7): User[] => {
  const users: User[] = [];
  for (let i = 0; i < limit; i++)
    users.push(generateUser());
  return [...users];
}
