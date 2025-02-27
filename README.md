# Match Mate - Server

<a name="readme-top"></a>

### Live API Link:

<br/>
<!-- ABOUT THE PROJECT -->

## API Documentation

I used postman to do api documentation. Click the link below to view the api documentation.

#### Postman link: [Postman API Documentation Link](https://documenter.getpostman.com/view/22696421/2sAYXEEJJb)

## API Endpoints

- api version: `/api/v1/` add the prefix api url like `http://localhost:5000/api/v1/`. After use all api end point.

<!-- ### User -->

<!-- - **POST**: `/auth/register` - User Registration -->

## Getting Started

### 1. Clone the repository:

```
git clone https://github.com/modasser-nayem/match-mate-server-p13.git

cd match-mate-server-p13
```

### 2. Install Dependencies:

```
npm install
```

### 3. Set Environment Variables:

Create a `.env` file in the root directory and define the required environment variables. include necessary variables `DATABASE_URL`, `PORT`, `NODE_ENV`, `BCRYPT_SALT_ROUNDS`, `JWT_ACCESS_SECRET`, `JWT_ACCESS_EXPIRES_IN`, `CLIENT_URL`.

```
PORT=5000

DB_URL=mongodb://localhost:27017/your-database

NODE_ENV // development or production

BCRYPT_SALT_ROUNDS // bcrypt salt round any number

JWT_ACCESS_SECRET // any string

JWT_ACCESS_EXPIRES_IN // string format like "1d", "1h".

CLIENT_URL=http://localhost:5173
```

### 4. Run the Application:

- For development:

```
npm run dev
```

- For production:

```
npm start
```

### 5. Build the Application:

```
npm run build
```

## Scripts

- `npm run dev`: Start the application in development mode using `ts-node-dev`.
- `npm start`: Start the application in production mode using the compiled `server.js` file.
- `npm run build`: Compile TypeScript files using `tsc`.
- `npm run lint`: Run ESLint to lint TypeScript files.
- `npm run lint:fix`: Run ESLint with the `--fix` option to automatically fix linting issues.
- `npm run format`: Run Prettier to format code.
- `npm run format:fix`: Run Prettier with the `--write` option to automatically fix formatting issues.

## Built With

- Typescript
- Express.js
- Mongodb
- Node.js

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- mongoose
- bcrypt
- jsonwebtoken
- zod
- cors
- dotenv
- eslint
- prettier

<!-- CONTACT -->

## Contact

Ali Modasser Nayem - [Linkedin](https://www.linkedin.com/in/alimodassernayem/) - [Portfolio](https://alimodassernayem.vercel.app/) - modassernayem@gimail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>
