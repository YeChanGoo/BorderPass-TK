# Quiz App

A simple questionnaire app built using React, Apollo Client, and Apollo Server. Users can take a quiz, answer questions, and submit their quiz results.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Description

The Quiz App is a web application that allows users to take a quiz by answering multiple-choice questions, single-choice questions, fill-in-the-blank questions, and dropdown questions. The application features both client and server components to handle quiz presentation, user interactions, and result submissions.

## Features

- Present various types of quiz questions: multiple-choice, single-choice, fill-in-the-blank, and dropdown.
- Users can navigate between questions, go back, and submit answers.
- Results are displayed, indicating correct and incorrect answers.
- Quiz results can be submitted and stored on the server.

## Getting Started

1. Clone the repository:

```sh
git clone https://github.com/YeChanGoo/BorderPass-TK.git
```

2. Navigate to the project directory:

```sh
cd BorderPass-TK
```

3. Install dependencies:

```sh
npm install
```

4. Run the app:

```sh
npm run dev
npm run server
```

## Usage

Access the application in your web browser at http://localhost:5173.

Take the quiz and answer the questions provided.

After completing the quiz, submit your answers to view the results.

## Technologies

**Client:**

- React: Front-end library for building user interfaces.
- Material-UI: UI component library for styling the application.
- Apollo Client: GraphQL client for managing data interactions with the server.
- Vite: Fast development build tool.

**Server:**

- Apollo Server: GraphQL server for handling quiz data and results.
- TypeScript: Programming language for type-safe development.
- Jest: Testing framework for unit and integration testing.

## Server

- Apollo Server: GraphQL server for handling quiz data and results.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch for your feature/bugfix.
Make your changes and commit them.
Push your changes to your forked repository.
Create a pull request to the main branch of the original repository.
