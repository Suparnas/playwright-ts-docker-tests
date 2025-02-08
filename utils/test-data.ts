import { faker } from '@faker-js/faker';

function generatePassword() {
  const password = faker.internet.password();
  const specialSymbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  const randomSymbol = specialSymbols[Math.floor(Math.random() * specialSymbols.length)];
  return password + randomSymbol;
}

function generateDOB(minAge: number) {
  const today = new Date();
  const minDOB = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  return faker.date.past(30, minDOB).toISOString().split('T')[0];
}

export const loginData = [
    {
      description: "should login successfully with valid credentials",
      username: "customer@practicesoftwaretesting.com",
      password: "welcome01",
      expectedResult: "success"
    },
    {
      description: "should show error for invalid credentials",
      username: faker.internet.email(),
      password: faker.internet.password(),
      expectedResult: "failure"
    }
  ];

export const registerData = [
    {
      description: 'should register a new user successfully',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dob: generateDOB(18), // Date of birth ensuring age is greater than 18
      address: faker.location.streetAddress(),
      postcode: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: 'Algeria',
      phone: faker.phone.number().replace(/\D/g, ''), // Only numbers
      email: 'jane.doe1@example.com',
      password: generatePassword(),
      expectedResult: 'success'
    },
    {
      description: 'should show error for existing email',
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      dob: generateDOB(18), // Date of birth ensuring age is greater than 18
      address: faker.location.streetAddress(),
      postcode: faker.location.zipCode(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: 'Aruba',
      phone: faker.phone.number().replace(/\D/g, ''), // Only numbers
      email: 'jane.doe1@example.com', // Keeping this static to simulate existing email
      password: generatePassword(),
      expectedResult: 'failure'
    }
  ];

  export const contactData = [
    {
      description: "should submit contact form successfully with valid data",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      subject: "Return",
      message: faker.lorem.sentences(3),
      fileUpload: "uploads/file.txt",
      expectedResult: "success"
    },
    {
      description: "should fail to submit contact form with invalid email",
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: "invalid-email",
      subject: "Warranty",
      message: faker.lorem.sentences(2),
      fileUpload: "uploads/file.txt",
      expectedResult: "failure"
    }
  ];