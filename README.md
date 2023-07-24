# Circle Frontend Challenge

This repository contains the dummy server to be used as a starting point for the Circle Frontend Challenge. The server provides an API for the application's core operations, as well as a Swagger endpoint for easy documentation.

## Getting Started

-   Clone the repository
-   Install its dependencies using npm:

```bash
$ npm install
```

-   Run the development server locally with the following command:

```bash
$ npm run dev
```

-   Alternatively, build the server and run with:

```bash
$ npm run build
$ npm run start
```

-   This will start the server on `http://localhost:8000`.

## Swagger Endpoint

The API is documented with Swagger. You may access the Swagger UI documentation by running the server and visiting the following URL in your browser:

```
http://localhost:8000/books/api-docs/
```

## Develop your application

Once the dummy server is up and running, it's time to build a frontend client interface to interact with the server. The client must include:

-   A landing page which displays the list of available books and some basic information (from what’s provided by the API, at your discretion).
-   The landing page must provide a way to navigate to a dedicated page for each one of the items with additional details (similarly, as provided by the API).
-   The item page must allow the user to purchase a copy of the book via a provided endpoint.

During the development process, you might want to reset the database to its original state. You can do this with the following script:

```bash
$ npm run reset
```

Once you are done, deploy both the client and server using your preferred hosting provider (such as Netlify, Vercel, Render, AWS, Heroku, etc). Make sure that your deployed frontend client can interact seamlessly with the deployed server.
