export const loginData = [
    {
      description: "should login successfully with valid credentials",
      username: "customer@practicesoftwaretesting.com",
      password: "welcome01",
      expectedResult: "success"
    },
    {
      description: "should show error for invalid credentials",
      username: "wronguser@user.com",
      password: "wrongpass",
      expectedResult: "failure"
    }
  ];

export const registerData = [
    {
      description: 'should register a new user successfully',
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      address: '123 Main St',
      postcode: '12345',
      city: 'Anytown',
      state: 'Anystate',
      country: 'Turkey',
      phone: '6475555555',
      email: 'john.doe1@example.com',
      password: 'P$pashjrguhord123',
      expectedResult: 'success'
    },
    {
      description: 'should show error for existing email',
      firstName: 'Jane',
      lastName: 'Doe',
      dob: '1992-02-02',
      address: '456 Elm St',
      postcode: '67890',
      city: 'Othertown',
      state: 'Otherstate',
      country: 'Canada',
      phone: '6475555556',
      email: 'jane.doe1@example.com',
      password: 'P$pashjrguhord123',
      expectedResult: 'failure'
    }
  ];

  export const contactData = [
    {
      description: "should submit contact form successfully with valid data",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      subject: "Return",
      message: "I have a question about your services. And I would like to return a product. Also, whats the price for the new product?",
      fileUpload: "uploads/file.txt",
      expectedResult: "success"
    },
    {
      description: "should fail to submit contact form with invalid email",
      firstName: "Jane",
      lastName: "Doe",
      email: "invalid-email",
      subject: "Warranty",
      message: "I have a question about your services.",
      fileUpload: "uploads/file.txt",
      expectedResult: "failure"
    }
    // Add more test cases as needed
  ];


  