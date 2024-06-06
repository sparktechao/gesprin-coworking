# NestJS Project with Generic Controllers and Services

## Description

This project is an example application using NestJS and Prisma, which implements a generic model of controller and service to perform CRUD operations. The main advantage of this approach is the reuse of code and ease of maintenance, allowing for the quick creation of new entities and their associated operations.

## Features

- **Generic Controllers**: Defines generic CRUD routes that can be reused for different entities, minimizing code duplication.
- **Generic Services**: Implements generic CRUD logic that can be applied to any data model, facilitating integration with new entity types.
- **Prisma ORM**: Uses Prisma for database interaction, providing an efficient and secure development environment.
- **DTOs with Validation**: Uses DTOs (Data Transfer Objects) with `class-validator` for input data validation, ensuring data integrity.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/sparktechao/prismageneric.git
   cd nestjs-generic-crud
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Prisma**

   Edit the `.env` file to configure the database connection. Replace `DATABASE_URL` with the connection URL of your PostgreSQL database.

   ```env
   DATABASE_URL="postgresql://your_user:password@localhost:5432/your_database"
   ```

4. **Generate Prisma Client and Migrations**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Run the Project**

   ```bash
   npm run start:dev
   ```

## Project Structure

The project structure is organized to facilitate the reuse of generic components and the implementation of new entities.

```
my-nestjs-app/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.ts
│   ├── common/
│   │   ├── services/
│   │   │   ├── base-generic-service.ts
│   │   ├── controllers/
│   │   │   ├── base-generic-controller.ts
│   │   ├── dtos/
│   │   │   ├── base-dto.ts
│   ├── users/
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   ├── update-user.dto.ts
│   │   ├── entities/
│   │   │   ├── user.entity.ts
│   │   ├── user.module.ts
│   │   ├── user.service.ts
│   │   ├── user.controller.ts
└── package.json
```

## Usage of Generic Components

### Generic Controller

The generic controller is defined in the `BaseGenericController` class and can be reused for any entity. Here is an example of how to set up a controller for the `User` entity:

```typescript
// src/users/user.controller.ts

import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseGenericController } from '../common/controllers/base-generic-controller';

@Controller('users')
export class UserController extends BaseGenericController<User, CreateUserDto, UpdateUserDto> {
  constructor(userService: UserService) {
    super(userService, 'users');
  }
}
```

### Generic Service

The generic service is defined in the `BaseGenericService` class and can be used to perform generic CRUD operations. Here is an example of how to set up a service for the `User` entity:

```typescript
// src/users/user.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseGenericService } from '../common/services/base-generic-service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseGenericService<User> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'user');
  }
}
```

### DTOs with Validation

DTOs are used to validate input data and ensure that the data provided by users is in the correct format. Here is an example of a DTO for creating users:

```typescript
// src/users/dto/create-user.dto.ts

import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
```

## Contribution

Contributions are welcome! If you have suggestions or encounter issues, feel free to open an issue or a pull request.

### Contributors

- **Emanuel Moura**
- **Jaymeson Mendes**

## License

This project is licensed under the [MIT License](LICENSE).

---

This README provides an overview of the project and highlights the main benefits of using generic controllers and services. With this approach, you can quickly add new entities to your project while maintaining code consistency and quality.

If you have any further questions or need additional help, feel free to ask! 🚀🔨🤖🔧

---

This README covers the necessary information for understanding the project, how it is built, and acknowledges the contributions of Emanuel Moura and Jaymeson Mendes. If you need anything else, just let me know!
