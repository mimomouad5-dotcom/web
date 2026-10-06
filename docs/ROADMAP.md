# DEXTER Roadmap

## Phase 0 — Repository initialization
- initialize Next.js app with TypeScript
- configure Tailwind CSS and shadcn/ui
- set up project structure and conventions
- add .env.example and secret management policy
- configure ESLint, Prettier, and Git hygiene
- establish docs and architecture baseline

## Phase 1 — Foundation
- set up PostgreSQL and Prisma schema
- configure Redis and BullMQ
- add authentication and user model
- define project and project version models
- create API skeleton and route conventions
- add structured logging and error handling
- build RTL-aware base UI primitives

## Phase 2 — AI provider system
- create provider abstraction interface
- integrate OpenRouter
- add Groq adapter
- add Gemini fallback adapter
- add Ollama self-hosted adapter
- add usage tracking and routing metadata
- support streaming responses and retry logic

## Phase 3 — Research system
- build search provider abstraction
- integrate Tavily
- integrate Semantic Scholar
- integrate Crossref and arXiv
- add source normalization and deduplication
- add source credibility scoring
- implement structured evidence retrieval

## Phase 4 — Multi-agent system
- define agent roles and stages
- integrate LangChain / LangGraph
- implement intent analysis agent
- implement research planning agent
- implement synthesis and verification agents
- add structured trace and review checkpoints

## Phase 5 — Presentation generation
- convert validated evidence into deck outline
- generate slide-by-slide content model
- produce citations and speaker notes
- assemble structured Presentation JSON
- validate schema before rendering

## Phase 6 — Design engine
- create theme and palette engine
- select deck layouts by slide purpose
- place charts, tables, shapes, and images
- support Arabic, English, and French rendering
- preserve visual hierarchy and consistency

## Phase 7 — Preview/editor
- build browser-based preview renderer
- support slide editing and AI-assisted revision
- add source highlighting and confidence markers
- add version comparison and history
- support multilingual preview UI

## Phase 8 — PPTX export
- integrate PptxGenJS
- convert Presentation JSON to PPTX slides
- support 16:9 layouts, notes, citations, links
- ensure RTL and locale-aware export
- generate downloadable files and artifacts

## Phase 9 — QA
- validate slide schema and structure
- verify source integrity and evidence mapping
- detect unsupported claims and weak citations
- run automated tests across generation pipeline
- implement deck quality scoring

## Phase 10 — Deployment
- deploy frontend and API to production host
- configure PostgreSQL, Redis, and object storage
- set up CI/CD and environment separation
- deploy workers for background jobs
- add monitoring, alerts, and health checks

## Phase 11 — Production hardening
- load testing and performance tuning
- security review and secret rotation
- cost monitoring and model optimization
- reliability hardening and retry policies
- user analytics and feature flags
- finalize documentation and onboarding
