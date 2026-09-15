# Vikash Anand — DevOps Portfolio

> A terminal-inspired personal portfolio built to showcase my experience, projects, cloud infrastructure, Kubernetes work, and DevOps engineering journey.

[![CI](https://github.com/vikashanand23/myPortfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/vikashanand23/myPortfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/vikashanand23/myPortfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/vikashanand23/myPortfolio/actions/workflows/deploy.yml)

**Live:** [vikashanand23-myportfolio.vikashanand04.workers.dev](https://vikashanand23-myportfolio.vikashanand04.workers.dev)

---

## About

This project is more than a portfolio website.

It is a hands-on demonstration of how I approach software delivery as a **DevOps Engineer** — from source control and automated validation to production deployment.

The portfolio combines a terminal-inspired UI with information about my:

- DevOps experience
- AWS infrastructure
- Kubernetes and service mesh work
- CI/CD implementations
- Infrastructure as Code
- Automation and scripting
- Projects and technical experiments

---

## Architecture

The application currently follows a lightweight serverless architecture:

```text
                        ┌──────────────────────┐
                        │       GitHub         │
                        │                      │
                        │  Source + Pull       │
                        │  Requests            │
                        └──────────┬───────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │        CI            │
                        │                      │
                        │  ESLint              │
                        │  Vitest              │
                        │  Production Build    │
                        └──────────┬───────────┘
                                   │
                              CI passes
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │    Protected main    │
                        │                      │
                        │  PR required         │
                        │  CI required         │
                        └──────────┬───────────┘
                                   │
                                  Merge
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │         CD           │
                        │                      │
                        │  Build               │
                        │  Nitro Deploy        │
                        └──────────┬───────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │   Cloudflare Worker  │
                        │                      │
                        │   Edge Deployment    │
                        └──────────────────────┘
```

### Current application tiers

```text
Tier 1
Browser
React / TypeScript / HTML / CSS
        │
        ▼
Tier 2
Cloudflare Worker
Edge-hosted application
```

There is currently no dedicated database or traditional application server.

---

## Tech Stack

### Frontend

- React
- TypeScript
- TanStack Start
- TanStack Router
- Vite
- Tailwind CSS
- shadcn/ui

### DevOps / Cloud

- Git
- GitHub
- GitHub Actions
- Cloudflare Workers
- Nitro
- Node.js

### Quality & Testing

- ESLint
- Prettier
- Vitest
- Automated production builds

---

## CI/CD

The project uses separate CI and CD workflows.

### Continuous Integration

CI runs when a Pull Request targets `main`.

```text
Pull Request
     │
     ▼
Install dependencies
     │
     ▼
Lint
     │
     ▼
Unit Tests
     │
     ▼
Production Build
     │
     ▼
    PASS
```

The CI workflow validates:

```bash
npm ci
npm run lint
npm test
npm run build
```

The `main` branch requires the CI status check to pass before changes can be merged.

### Continuous Deployment

CD runs after changes reach `main`.

```text
PR
 │
 ▼
CI passes
 │
 ▼
Merge → main
 │
 ▼
Deploy Portfolio
 │
 ├── npm ci
 ├── npm run build
 └── nitro deploy
         │
         ▼
   Cloudflare Worker
```

Cloudflare credentials are stored as **GitHub Actions Secrets** rather than being committed to the repository.

---

## Project Structure

```text
myPortfolio/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── public/
│
├── src/
│   ├── components/
│   ├── lib/
│   │   ├── portfolioSearch.ts
│   │   └── portfolioSearch.test.ts
│   ├── routes/
│   └── ...
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Automated Testing

The portfolio includes automated tests for its search functionality.

Current test coverage includes:

- Empty search queries
- Whitespace-only queries
- Project searches
- AWS-related searches
- Result limits
- Search relevance scores
- Result grouping

Run tests locally:

```bash
npm test
```

Expected result:

```text
Test Files  1 passed
Tests       6 passed
```

---

## Local Development

### Prerequisites

Install:

- Node.js 24+
- npm
- Git

### Clone

```bash
git clone https://github.com/vikashanand23/myPortfolio.git
cd myPortfolio
```

### Install dependencies

```bash
npm ci
```

### Start development server

```bash
npm run dev
```

### Run lint

```bash
npm run lint
```

### Run tests

```bash
npm test
```

### Build production application

```bash
npm run build
```

---

## Git Workflow

Development follows a feature-branch and Pull Request workflow.

```text
main
 │
 ├── feature/*
 │       │
 │       ▼
 │    Development
 │       │
 │       ▼
 │    Pull Request
 │       │
 │       ▼
 │      CI
 │       │
 │       ▼
 │    CI PASS
 │       │
 │       ▼
 │      Merge
 │       │
 │       ▼
 │      main
 │       │
 │       ▼
 │      CD
```

Direct changes to `main` are avoided.

---

## Security

The repository does not contain Cloudflare credentials.

Deployment credentials are provided through GitHub Actions Secrets:

```text
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

Secrets are injected only during the deployment workflow.

---

## DevOps Improvements Roadmap

The project is intentionally evolving as a real DevOps project.

### Completed

- [x] Remove unused Worker configuration
- [x] Review deployment secrets
- [x] Add automated linting
- [x] Add automated unit tests
- [x] Add production build validation
- [x] Separate CI and CD workflows
- [x] Protect `main`
- [x] Require CI before merging
- [x] Deploy automatically to Cloudflare after merge

### Planned

- [ ] Deployment rollback strategy
- [ ] Custom domain
- [ ] CI/CD status dashboard
- [ ] Deployment notifications
- [ ] Staging environment
- [ ] Production environment
- [ ] Environment-specific secrets
- [ ] Deployment health checks
- [ ] Automated smoke tests
- [ ] Infrastructure as Code for Cloudflare resources
- [ ] Observability and monitoring

---

## Engineering Philosophy

I use this project to experiment with practical DevOps patterns rather than simply building a static portfolio.

The goal is to continuously improve:

```text
Code
 ↓
Test
 ↓
Validate
 ↓
Automate
 ↓
Deploy
 ↓
Observe
 ↓
Improve
```

Every infrastructure or CI/CD improvement is implemented, tested, and documented as part of the project.

---

## Author

**Vikash Anand**
vikashanand04@gmail.com

## License

This project is primarily a personal portfolio and demonstration project.
