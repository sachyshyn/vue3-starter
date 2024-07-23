# Vue 3 Application Template

## Prerequisites:

- [Node.js](https://nodejs.org/) >=18

## Architecture:

- FSD Driven ([see reference](https://feature-sliced.design/docs/get-started/overview))

## Environment Variables

1. _APP_API_URL_: Base URL for [axios](https://axios-http.com/docs/intro) instance (required)
2. _APP_PORT_: Port for running the frontend application (optional)

## Setup and Development Flow:

1. Install dependencies `npm install`
2. Prepare [Husky](https://typicode.github.io/husky/) for git hooks `npm run prepare`
3. Create `.env.local` for local development and define at least the `APP_API_URL` variable (see [example](./.env.example))
4. Start the development server `npm run dev`

## Technical Stack:

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/guide/)

## Package Managers:

- npm

## Code Quality:

- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/user-guide/get-started)
- Git hooks ([Husky](https://typicode.github.io/husky/))
- [Prettier](https://prettier.io/)
- Testing:
  - [Vitest](https://vitest.dev/guide/)
  - [Vue Test Utils](https://test-utils.vuejs.org/)
  - [Cypress](https://www.cypress.io/)

## Commands

| Command              | Description                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| `npm install`        | Installs dependencies                                                            |
| `npm run dev`        | Starts local dev server at the port specified in [vite config](./vite.config.ts) |
| `npm run build`      | Builds the project                                                               |
| `npm run preview`    | Starts local server to serve `dist` folder on the specified port                 |
| `npm run lint:js`    | Runs Javascript and Typescript linting using ESLint                              |
| `npm run lint:style` | Runs style linting using Stylelint                                               |
| `npm run test:unit`  | Runs unit tests using Vitest                                                     |
| `npm run test:e2e`   | Runs e2e tests using Cypress                                                     |
| `npm run format`     | Formats the codebase using Prettier                                              |
