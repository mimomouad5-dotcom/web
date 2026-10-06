# DEXTER Architecture

## 1. Project context

DEXTER is an AI research-to-presentation platform that turns a user topic into a source-grounded, editable PowerPoint deck. The platform must balance research quality, source verification, presentation quality, and cloud execution.

The architecture follows a weak-client / cloud-heavy execution model:
- The browser is responsible for UX, preview, editing, and export orchestration.
- The server is responsible for research, orchestration, AI, persistence, and presentation generation.
- Long-running jobs are executed asynchronously in background workers.
- Large AI workloads do not run on the user device.

## 2. Core architecture

User Request
→ Intent Analysis
→ Research Planning
→ Web + Academic Search
→ Source Processing
→ Claim/Evidence Mapping
→ Synthesis
→ Presentation Outline
→ Slide Content
→ Design Engine
→ Presentation JSON
→ Preview Renderer
→ PPTX Renderer
→ QA
→ Export

This sequence is deliberate and required. The product must not collapse into a single prompt-to-PPTX step because that would be brittle, unverifiable, and difficult to debug.

## 3. System overview

The system is composed of six major layers:

1. Frontend application layer
2. API and orchestration layer
3. Research and retrieval layer
4. AI provider abstraction layer
5. Presentation generation and rendering layer
6. Data, storage, cache, and jobs layer

## 4. Frontend architecture

### Stack
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zod
- next-intl or next-i18next for localization

### Responsibilities
- Research request capture
- Project management
- Versioning and deck history
- Live preview UI
- Slide editor and AI chat editor
- Export controls
- Language switching between Arabic, English, French
- RTL/LTR awareness

### Architecture pattern
- Server components used for data fetching and safe server-side rendering
- Client components for interactive preview and editing
- Streaming endpoints for generation progress
- Progressive UI updates for long-running jobs

### Key frontend modules
- app/
  - /(auth)
  - /(dashboard)
  - /(projects)
  - /(projects/[id])
  - /(preview)
  - /(export)
- components/
  - editor/
  - preview/
  - layout/
  - forms/
  - ui/
- lib/
  - i18n/
  - routes/
  - utils/

### RTL support
The frontend must treat language direction as data, not a hardcoded special case:
- HTML dir attribute based on locale
- CSS logical properties (margin-inline, padding-inline, text-align: start/end)
- Arabic-capable fonts and fallback fonts
- Layout mirroring for navigation, tables, and slide controls

## 5. Backend architecture

### Core backend runtime
- Next.js server runtime
- API routes under app/api
- Background workers via BullMQ
- Redis for queueing and caching
- PostgreSQL as the primary transactional database

### Responsibilities
- Authentication and user management
- Project CRUD
- Research workflow orchestration
- Job scheduling and progress tracking
- Source and claim persistence
- Presentation JSON persistence
- Export orchestration
- Security enforcement and rate limiting

### API structure
- /api/auth/*
- /api/projects/*
- /api/projects/[id]/research
- /api/projects/[id]/slides
- /api/projects/[id]/preview
- /api/projects/[id]/export
- /api/jobs/*
- /api/providers/*

## 6. AI provider abstraction

The system must support multiple AI backends and avoid vendor lock-in.

### Required abstraction contract
- model metadata
- provider availability
- request/response schema
- streaming support
- cost metadata
- reliability and retry policy
- region or latency preference

### Design
- AIProvider interface
- LLMClient factory
- model selection policies
- fallbacks by capability

### Supported providers
- OpenRouter (primary routing layer)
- Groq (low-latency generation)
- Gemini (fallback / alternative provider)
- Ollama (self-hosted / private mode)
- OpenAI-compatible endpoints
- Hugging Face Inference Endpoints
- Custom provider endpoint for enterprise deployments

### Model routing policy
The system should choose models by capability, not by a single provider preference:
- quick classification and topic extraction → fast small model
- research synthesis → strong reasoning model
- slide writing → presentation-optimized model
- QA and verification → strict, grounded model

## 7. Search provider abstraction

Search is not a single source of truth. It is a coordinated set of retrieval sources.

### Search interfaces
- SearchResult
- SearchProvider
- SearchQueryPlan
- SearchResponse
- SourceMetadata

### Supported providers
- Web search
  - Tavily
  - Brave Search
  - SerpAPI fallback
- Academic search
  - Semantic Scholar
  - Crossref
  - arXiv
  - OpenAlex
- Images
  - Pexels
  - Wikimedia Commons
  - Pixabay / Openverse as optional additions

### Retrieval policy
- Use both broad and fine-grained retrieval
- Deduplicate results across providers
- Score sources by authority, freshness, and relevance
- Prefer peer-reviewed or primary sources when available
- Track URLs and citations as structured metadata

## 8. Agent architecture

The product is built around specialized agents, not one giant monolithic model call.

### Agent roles
- Intent Analyzer
  - interprets topic, domain, objective, and constraints
- Research Planner
  - creates search queries and source strategy
- Web Researcher
  - obtains public web content
- Academic Researcher
  - queries academic sources and citation metadata
- Source Verifier
  - checks source quality and retrieval trustworthiness
- Claim Mapper
  - links evidence to claims and identifies gaps
- Synthesizer
  - builds a coherent narrative from research
- Outline Generator
  - converts narrative into presentation structure
- Slide Writer
  - composes slide content in multilingual format
- Design Agent
  - selects layout, theme, and visual treatment
- QA Agent
  - validates PPT quality, source integrity, and slide coherence

### Agent orchestration
- LangChain / LangGraph as the primary orchestration layer
- Agent state stored as structured workflow state
- Each step emits a trace record
- Multi-agent work is not fully autonomous; it is policy-governed and reviewable

## 9. Research pipeline

The research pipeline is a structured and auditable sequence.

### Stage 1: Intake
- project title
- research topic
- desired audience
- tone and output language
- presentation length
- required source types

### Stage 2: Intent analysis
- convert user request into structured analysis
- identify domain, audience, and constraints
- generate research questions

### Stage 3: Search planning
- choose provider mix
- define keyword sets
- define academic vs web ratio
- plan for gaps and verification

### Stage 4: Source collection
- issue parallel searches
- merge and normalize results
- deduplicate by URL / DOI / hash

### Stage 5: Source processing
- extract title, abstract, snippet, markdown, and metadata
- normalize content and citations
- store source objects in structured form

### Stage 6: Evidence mapping
- identify claims
- attach supporting evidence
- detect contradictions or unsupported statements
- create claim confidence score

### Stage 7: Synthesis
- merge validated evidence into narratives
- filter weak or unsupported content
- keep provenance intact

## 10. Presentation pipeline

The presentation pipeline begins only after evidence is structured and verified.

### Pipeline stages
1. outline creation
2. section planning
3. slide-level content generation
4. visual language selection
5. metadata injection
6. Presentation JSON assembly
7. preview rendering
8. PPTX export
9. QA checks

### Guardrails
- No raw PPTX JavaScript is emitted directly by the LLM.
- LLM output is transformed into Presentation JSON first.
- JSON is validated using Zod schemas.
- Renderer logic is deterministic and explicit.

## 11. Presentation JSON

Presentation JSON is the central intermediate representation.

It must support:
- text
- images
- shapes
- tables
- charts
- diagrams
- citations
- notes
- hyperlinks
- layouts
- themes
- RTL

### Example structure
```ts
interface PresentationJSON {
  metadata: {
    title: string;
    topic: string;
    language: 'ar' | 'en' | 'fr';
    direction: 'rtl' | 'ltr';
    version: string;
    createdAt: string;
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  slides: Slide[];
  sources: SourceReference[];
}
```

This is the contract that allows preview, editing, and export to be implemented independently.

## 12. PPTX renderer

### Primary renderer
- PptxGenJS

### Renderer responsibilities
- convert Presentation JSON to PPTX structure
- create 16:9 slides
- maintain proper slide spacing and layout
- apply fonts, theme, colors, and RTL direction
- embed notes
- embed citations and references
- support hyperlink insertion
- maintain native PowerPoint shape semantics where possible

### Important rule
The renderer must be deterministic. It should not depend on any direct LLM-generated PPTX script. All visuals are assembled from validated JSON.

## 13. Preview renderer

The preview renderer is a browser-first representation of the slide deck.

### Responsibilities
- show a near-final deck preview
- enable editing of text and element positions
- maintain source highlighting
- render Arabic and French content correctly
- support training or board-room view modes

### Suggested implementation
- React components render slides from Presentation JSON
- slides are cached for performance
- preview uses an optimized layout pipeline
- a separate editor mode can allow limited manual adjustments without overriding AI output

## 14. Database design

### Primary database
- PostgreSQL

### Why PostgreSQL
- strong relational integrity
- JSONB for flexible metadata
- pgvector support for vector embeddings
- good ecosystem and operational maturity

### Core tables
- users
- projects
- project_versions
- research_runs
- sources
- claims
- evidence_links
- slides
- slide_elements
- images
- jobs
- project_comments
- exports

### Key design choices
- Store source metadata as structured records
- Store presentation JSON in JSONB columns
- Keep versioned snapshots for every deck revision
- Keep job logs for debugging and audit

## 15. Background jobs

### Why jobs matter
Research, slide generation, export, and QA can take minutes. They must not block a web request.

### Queue platform
- BullMQ + Redis

### Job types
- research_run
- source_ingestion
- claim_mapping
- synthesis
- outline_generation
- slide_writing
- design_generation
- preview_render
- pptx_export
- qa_validation

### Observability
Each job logs:
- start/end timestamps
- progress
- provider/model used
- failure reason
- token usage summary
- source count

## 16. Storage

### Storage needs
- project files
- generated deck artifacts
- source snapshots
- exported PPTX
- preview images

### Recommendations
- PostgreSQL for metadata and JSON
- object storage for generated files (S3-compatible storage)
- CDN for static preview assets and downloadable assets

## 17. Caching

### Cache layers
- Redis for short-lived job state and real-time progress
- in-memory caches for provider metadata and search result normalization
- HTTP caching for public API responses where appropriate

### Cache use-cases
- model availability checks
- provider metadata
- hot project summaries
- slide preview thumbnails
- deduplicated search results

## 18. Security

### Security controls
- AuthN/AuthZ with secure session handling
- API keys managed via environment variables or secret manager
- rate limiting on user and API endpoints
- CSRF protection for state-changing routes
- signed URLs for export downloads
- data retention policies
- controlled access to user projects

### Production concerns
- sanitize all user inputs before model calls
- do not expose raw provider credentials
- log structured details without leaking secrets
- restrict provider access by tenant or environment

## 19. Error handling

### Error taxonomy
- provider failures
- retrieval failures
- parsing failures
- validation failures
- export failures
- content quality issues
- user input errors

### Policies
- never fail silently
- emit structured job errors with stage and retry metadata
- support partial recovery
- provide user-visible fallback states
- keep checkpointed progress so work is not lost

## 20. Testing strategy

### Testing layers
- unit tests for provider adapters and validators
- integration tests for DB and API routes
- contract tests for presentation JSON schemas
- job runner tests for queue orchestration
- end-to-end tests for preview/export flows
- snapshot tests for slide structure normalization

### Coverage focus
- provider abstraction reliability
- source deduplication logic
- claim/evidence mapping quality
- JSON schema validation
- export stability

## 21. Deployment strategy

### Cloud-first target
- Vercel for frontend and API
- Postgres managed service
- Redis managed service
- optional queue worker service or containerized worker
- object storage service for exports
- CDN for static preview assets

### Deployment principles
- environment separation: dev, staging, prod
- infra as code
- health checks
- autoscaling for workers
- structured logs and traces
- CI/CD with preview deployments

## 22. Missing infrastructure

The repository is currently empty. The primary missing infrastructure is:
- base Next.js project
- dependencies and lockfile
- TypeScript config
- Tailwind configuration
- design system setup
- Prisma schema and migration setup
- Redis connection and BullMQ configuration
- environment variables and secret management
- CI workflow
- docs and architecture baseline

This is the foundation required before product work can begin.

## 23. Recommended implementation posture

The project should not begin with a single “all-in-one demo generator.”
It should begin with a disciplined foundation:
- provider abstraction
- structured research pipeline
- presentation JSON schema
- versioned project model
- queue architecture
- export pipeline

That will make the later AI functionality reliable and extendable.

## 24. Success criteria for the architecture

This architecture is successful if it can safely support:
- multilingual research generation
- source-grounded primary content
- auditable project history
- versioned deck outputs
- robust export generation
- cloud deployment without user-side model execution
- structured AI orchestration with external verification

## 25. Final recommendation

DEXTER should be implemented as a modular, provider-agnostic AI research and presentation system with a clear intermediate representation (Presentation JSON) and a strict orchestration pipeline. The architecture prioritizes trust, verifiability, extensibility, and cloud execution over demo speed.
