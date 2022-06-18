export const mockUsers = [
  {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$10$P8sALWx01G/ezVf8AaI4UuVAhQHIV8fty78x.7Y3IRhKlRJ3SF93q',
  },
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user',
    password: 'user'
  }
];

export const mockBody = { email: 'admin@admin.com', password: 'secret_admin'};

export const MockResponse = {
  user: {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com'
  },
  token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InJvbGUiOiJhZG1pbiIsImlkIjoxfSwiaWF0IjoxNjU0Mjc3NDYxLCJleHAiOjE2NTUxNDE0NjF9.vUlrhRh1n2VwKDG8dsCU36qkhqLRzArYoGNC33Mjsog',
};