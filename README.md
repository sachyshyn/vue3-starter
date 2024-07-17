# Vue 3 Application Template

## Flow:

1. `npm run prepare`
2. `npm install`
3. `npm run dev`

## Tech Stack:

- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/guide/)

## Package Managers:

- npm

## Code Quality:

- [ESLint](https://eslint.org/)
- [Stylelint](https://stylelint.io/user-guide/get-started)
- Git hooks ([Husky](https://typicode.github.io/husky/))
- [Prettier](https://prettier.io/)
- [Vitest](https://vitest.dev/guide/), [Vue Test Utils](https://test-utils.vuejs.org/), [Cypress](https://www.cypress.io/)

## Architecture:

- [Feature-Sliced Design](https://feature-sliced.design/) (by default)

## Prerequisites:

- [Node.js](https://nodejs.org/) >=18

[Commands](./package.json)

| Command              | Description                                                                      |
| -------------------- | -------------------------------------------------------------------------------- |
| `npm install`        | Installs dependencies                                                            |
| `npm run dev`        | Starts local dev server at the port specified in [vite config](./vite.config.ts) |
|                      |
| `npm run build`      | Builds the project                                                               |
| `npm run preview`    | Starts local server to serve `dist` folder on the specified port                 |
| `npm run lint:js`    | Runs Javascript and Typescript linting using ESLint                              |
| `npm run lint:style` | Runs style linting using Stylelint                                               |
|                      |
| `npm run test:unit`  | Runs unit tests using Vitest                                                     |
| `npm run test:e2e`   | Runs e2e tests using Cypress                                                     |
| `npm run format`     | Formats the codebase using Prettier                                              |
