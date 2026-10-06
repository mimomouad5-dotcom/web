# DEXTER Technical Decisions

## Decision 1: Next.js + TypeScript + Tailwind + shadcn/ui
Why:
- strong developer experience
- server and client rendering support
- built-in API support for backend endpoints
- excellent fit for a modern SaaS product
- strong ecosystem for UI and product iteration

## Decision 2: PostgreSQL as the primary database
Why:
- relational integrity and versioning workflows
- JSONB is useful for project metadata and presentation JSON
- supports pgvector for future embedding-heavy features
- predictable operational model for a startup-grade application

## Decision 3: Redis + BullMQ for async execution
Why:
- research generation and export are long-running jobs
- queue-based execution prevents user-facing timeouts
- easy to track progress, retries, and failure state
- works well with cloud deployment and background workers

## Decision 4: OpenRouter as the main AI routing layer
Why:
- prevents hard dependence on a single model provider
- allows cost-aware and capability-aware routing
- supports provider fallback and experimentation
- enables future expansion to different model families

## Decision 5: Multi-provider search strategy
Why:
- no single search provider is sufficient for all research needs
- web search, academic search, and image retrieval all require distinct APIs
- provider diversity improves recall and source coverage
- source normalization and ranking are essential for quality

## Decision 6: Use Tavily + academic APIs as the core retrieval layer
Why:
- Tavily is optimized for AI-friendly retrieval workflows
- Semantic Scholar, Crossref, and arXiv cover different parts of the academic research stack
- together they give broad and practical coverage for source-grounded and evidence-based research

## Decision 7: Use Presentation JSON as the central intermediate representation
Why:
- it decouples generation from rendering
- it enables testing, validation, preview, and export to operate independently
- it prevents direct LLM-to-PPTX generation from becoming brittle
- it allows future support for other export formats without rewriting the core pipeline

## Decision 8: Use PptxGenJS for final PPTX export
Why:
- strong JS ecosystem support
- mature and well-maintained
- can generate rich PowerPoint slides with charts, tables, shapes, and notes
- suitable for server-side generation in a cloud workflow

## Decision 9: Use LangChain / LangGraph for orchestration
Why:
- production-oriented orchestration and workflow state management
- better fit than a single monolithic prompt chain
- supports tool calling, traces, retry logic, and agent-style pipelines
- integrates well with search and provider abstraction layers

## Decision 10: Prefer source-grounded generation over raw generation
Why:
- quality is improved by evidence-first synthesis
- source verification matters for trust and credibility
- better for academic and professional use cases
- critical to avoid hallucinated or weak research output

## Decision 11: Support RTL and internationalization from day one
Why:
- the target market includes Arabic speakers
- RTL support is easier to build early than retrofitted later
- multilingual product quality is a core product requirement

## Decision 12: Keep jobs and workers separate from the web app
Why:
- research pipeline steps are long-running
- export generation must not block the request lifecycle
- this improves resilience and operational clarity
- supports background retries and scaling

## Decision 13: Use PostgreSQL + Redis + object storage
Why:
- relational metadata and JSON-based project data fit a database-first workflow
- Redis handles transient state and queues
- object storage is appropriate for generated exports and preview assets
- this is a standard production pattern for SaaS platforms

## Decision 14: Do not implement a superficial demo
Why:
- the product has real requirements: research, citations, export, versioning, validation
- a lightweight prototype would not reflect the actual complexity or long-term value
- the platform must be structurally sound before product polish

## Decision 15: Build modularity before optimization
Why:
- provider and search abstractions will change over time
- the product needs to evolve without a rewrite
- modularity lowers risk and makes incremental delivery possible
