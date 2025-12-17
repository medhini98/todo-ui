# Todo UI - React + TypeScript Frontend

- A lightweight React + TypeScript frontend for a FastAPI-based Todo API.
- Built to demonstrate clean frontend architecture, robust error handling, and test-driven UI development.

---

## Features
- View existing tasks
- Create new tasks with client-side validation
- Toggle task completion
- Delete tasks with confirmation
- Loading and error states handled gracefully
- Fully tested using React Testing Library + Vitest

---

## Design Decisions & Rationale:

**1.	API Abstraction Layer**:

All network calls are centralized in src/api/tasks.ts, keeping components free of fetch logic and making the UI easy to test via mocks.

**2.	Type Safety with TypeScript**:

Shared Task, CreateTaskInput, and API types ensure consistency between backend responses and frontend state.

**3.	Single Source of Truth (App State)**:

Task state is owned by App.tsx and passed down via props, keeping state management predictable without overengineering.

**4.	Explicit Loading & Error UX**:

Separate loading spinner and error banner components make async states visible and user-friendly.

**5.	Client-Side Validation Before Submit**:

Form validation runs before API calls to prevent unnecessary requests and provide immediate feedback.

**6.	Safe Destructive Actions**:

Task deletion is protected by a confirmation dialog to prevent accidental data loss.

**7.	Test-Driven UI Behavior**:

All core user flows (fetch, create, toggle, delete, error states) are covered with React Testing Library tests using mocked APIs.

**8.	Minimal, Intentional Styling**:

Styling is kept simple and functional to prioritize clarity, accessibility, and maintainability.

---

## Design & Architecture

The application follows a simple, layered architecture designed for clarity, testability, and incremental growth.

### High-Level Architecture:
```code
UI Components
     ↓
App State (App.tsx)
     ↓
API Client (tasks.ts)
     ↓
FastAPI Backend
```

### 1. UI Layer (Presentational Components)

#### Files:
- TaskForm
- TaskList
- LoadingSpinner
- ErrorBanner

#### Responsibilities:
- Render data
- Capture user interactions
- Emit events upward via props

#### What they do NOT do:
- No API calls
- No global state
- No side effects

#### This keeps components:
- Easy to reason about
- Easy to reuse
- Easy to test in isolation

---

### 2. State & Orchestration Layer (App.tsx)

Role: Single source of truth for application state.

#### Responsibilities:
- Owns task data
- Coordinates API calls
- Handles async transitions (loading, error, success)
- Applies UI safety logic (confirmation before delete)

#### This avoids:
- Prop-drilling chaos
- Premature state libraries
- Implicit side effects in child components

---

### 3. API Client Layer (src/api/tasks.ts)

#### Purpose: 

1. Abstract all backend communication.
2. Why this layer exists:
- Decouples UI from HTTP implementation
- Makes mocking trivial in tests
- Centralizes error handling patterns

All API interactions (fetch, create, toggle, delete) are defined here, allowing the UI to remain declarative and test-focused.

---

### 4. Type System as a Contract

#### Files:
- src/types/task.ts
- src/types/validation.ts

#### TypeScript types act as:
- A contract between backend and frontend
- Documentation for data flow
- Early error detection during development

This reduces runtime bugs and ensures consistency across layers.

---

### 5. Testing Architecture

#### Testing approach mirrors architecture:
- API layer is mocked
- Tests interact with the UI as a user would
- Assertions focus on visible outcomes, not implementation details

#### This results in:
- Fast, deterministic tests
- Confidence in real user behavior
- Easy refactoring without test breakage

---

## What Was Achieved (and How)

Incrementally builds a production-style frontend by focusing on end-to-end user workflows, not just isolated components.

**1. End-to-End CRUD UI**
- Implemented a complete task lifecycle: fetch → create → update → delete
- Each operation is wired from UI → API client → backend and reflected back in UI state
- State updates are immutable and scoped to the affected task only

**2. Robust Async State Handling**
- Introduced explicit loading, success, and error states for all async actions
- Prevented UI actions (e.g. submit) when inputs are invalid or requests are in flight
- Ensured failures are surfaced clearly to users via an error banner

**3. Safe User Interactions**
- Added confirmation before destructive actions (task deletion)
- Handled cancellation paths explicitly so no unintended API calls are made
- Reflected these behaviors in automated tests

**4. Strong Separation of Concerns**
- UI components focus only on rendering and user interaction
- API layer encapsulates all network logic
- App state acts as the single source of truth
- This makes the system easy to extend (e.g. add optimistic updates or pagination)

**5. Test-Driven Frontend Development**
- Built UI behavior around tests rather than snapshots or implementation details
- Covered both happy paths and failure cases, including:
- Initial load failures
- Validation errors
- Toggle failures
- Cancelled deletes
- Used mocked APIs to keep tests fast, deterministic, and isolated

---


## Testing Strategy
- Framework: Vitest + React Testing Library
- Approach:
- Mock API layer to isolate UI behavior
- Assert visible user outcomes, not implementation details
- Include negative-path tests (API failures, cancelled deletes)
- Run tests:
  ```bash
  npx vitest
  ```

---

## Tech Stack
- React
- TypeScript
- Vite
- FastAPI (backend)
- Vitest
- React Testing Library

---

## Running the App Locally

1. Start the backend
```bash
uvicorn main:app --reload
```
Backend should be available at:
```bash
http://127.0.0.1:8000
```

2. Start the frontend:
```bash
npm install
npm run dev
```
Frontend will run at:
```bash
http://localhost:5173
```