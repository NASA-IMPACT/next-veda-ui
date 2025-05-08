This guide provides instructions for setting up and running the Next.js instance locally, as well as an overview of the development workflow.

## Prerequisites

Before you begin, ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) (version specified in the [.nvmrc](../.nvmrc) file)
- [Yarn](https://yarnpkg.com/)

If you're using [`nvm`](https://github.com/nvm-sh/nvm), you can activate the required Node.js version by running:

```bash
nvm install
```

## Setting up the project

1. **Clone the repository**
   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-org/your-repo.git
   cd your-repo
   ```

2. **Register the VEDA-UI package**
   The VEDA-UI package is now published on the public NPM registry under the @teamimpact scope. To install it, ensure your `.npmrc` or global npm configuration points to the public registry (default).

3. **Install dependencies**

   Install the project dependencies by running:

   ```sh
   yarn install
   ```

4. **Configure environment variables**

   Create a `.env.local` file in the root directory and add the necessary environment variables. Refer to the [Configuration guide](./CONFIGURATION.md) for details on required variables.

### Start the development server

To start the development server, run:

```sh
yarn dev
```

The website will then be accessible at <http://localhost:3000>.

### Testing

This project uses **Vitest** for unit and integration tests, and **Playwright** for end-to-end (E2E) tests.

#### Run the Full Test Suite

```bash
yarn test
```

#### Watch Mode (for Development)

- **Unit/Integration tests**:

  ```bash
  yarn vitest:watch
  ```

- **End-to-End tests (UI mode)**:

  ```bash
  yarn playwright:ui
  ```

#### Folder and Filename Conventions

- **Unit tests**
  Target a single component or function. Place the test file alongside the source file (e.g. `Header.tsx` and `Header.test.tsx`).

- **Integration tests**
  Test interactions between components or elements without covering full user journeys. Place them under `test/integration` and use the `.test.*` suffix.

- **End-to-End (E2E) tests**
  Simulate complete user flows. Place them under `test/e2e` and use the `.spec.ts` suffix.

#### Snapshot Test Failures

If a snapshot test fails after a component update:

1. Run `yarn vitest` to inspect the failure and review the diff.
2. If the change is expected, run `yarn vitest:update` to update the snapshot (or press `u` in watch mode).
3. Only update snapshots if you’re confident the changes are intentional.

> If something looks off, double-check your component updates to avoid unintended UI changes.

#### CI Requirement

All tests must pass locally before committing changes. The **CI pipeline** runs the test suite automatically on non-draft PRs and will fail the build if any test fails.

If your PR is a work in progress, mark it as **draft** to skip the test workflow.

### Building for production

To build the project for production:

```bash
yarn build
```

The output will be generated in the `.next` directory.

### Deployment

The app can be deployed to any platform supporting Node.js. Refer to your deployment platform's documentation for further instructions.
