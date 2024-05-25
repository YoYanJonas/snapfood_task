# Younes Shafiee

## Description

This repository is made for just assigning a two days deadline task. Hope be helpful.
Some simplifications due to time limits are made.

## HOW TO USE

first: install node packages:
   ```sh
   npm install 
   ```
or
```sh
   npm ci 
   ```

1. Build and start the containers:

   ```sh
   docker compose up -d --build
   ```

2. After the containers are ready, access the app container:

   ```sh
   docker compose exec app zsh
   ```

3. Inside the app container, start the development server:
   ```sh
   npm run dev
   ```

The server is now ready to use.

## Considerations

1. **Database Creation**: Be aware of database creation. MySQL versions are sensitive about it.
2. **Entities Relations**: Some entities' relations are reduced due to deadline limitations.
3. **Route Tests**: Tests are made to ensure the correctness of routes.
4. **Route Handlers**: Route controllers are not used. Logics are inserted directly into route handlers.
5. **Environment Variables**: `.env` and `.env.sample` files are provided.
6. **Postman Collection**: A Postman collection is added for making requests.
7. **Database Rows**: Ensure to add rows to tables correctly. Some entities depend on others; create them properly.
8. **Redis removed**: Redis is not used in project. but it could help on reducing response time.
