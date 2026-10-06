# DEXTER

DEXTER is an AI-powered research-to-presentation platform that turns a topic into a source-grounded PowerPoint presentation.

## Current status

The repository now includes:
- Next.js foundation with TypeScript and Tailwind CSS
- app shell and dashboard starter
- basic API route scaffolding
- project creation skeleton
- health endpoint
- architecture and roadmap docs

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Redis / BullMQ
- OpenRouter + Groq + Gemini fallback
- Tavily + Semantic Scholar + Crossref + arXiv
- PptxGenJS
- LangChain / LangGraph

## Next upgrades

1. Add Prisma migration and DB schema sync
2. Add real project persistence and user auth flow
3. Add search provider orchestration
4. Add AI claim/evidence workflow
5. Add presentation JSON builder and slide generation
6. Add PPTX export and preview browser renderer

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Project goal

Research topic -> evidence -> outline -> slide content -> presentation JSON -> preview -> PPTX export.

## Notes

This repository is intentionally structured in phases. The current scaffold is a base for the next production features.

## Repository

https://github.com/mimomouad5-dotcom/web


