# Lakshmi Iron Company — B2B Product Catalog Platform

A B2B e-commerce platform built for **Lakshmi Iron Company**, one of the oldest and largest iron traders in Chandigarh, operating 5 physical shops. The project moved their category-wise, brand-wise product catalog online on a limited budget, giving customers a way to browse and search their inventory without a full-scale e-commerce rebuild.

Solo project — architecture, backend, and schema design.

---

## The problem

Lakshmi Iron Company needed an online presence to match how their business actually runs: a large, well-defined catalog organized by category and brand, built and delivered within a tight budget — not a generic storefront template.

## What was built

- **Relational schema design** for a multi-category, multi-brand product catalog, modeling the real structure of their inventory (categories → sub-categories → brands → products) rather than forcing it into a flat product list.
- **Dynamic filtering logic** letting customers narrow products by category, brand, and other attributes without slow, full-table queries.
- **SSR-based search indexing** using Next.js server-side rendering so product pages are both fast to load and indexable by search engines — important for a business relying on organic discovery rather than paid ads.

## Tech stack

- **Frontend:** Next.js (SSR for catalog/search pages)
- **Backend/Data:** Supabase (Postgres) — relational schema, filtering queries
- **Deployment:** Vercel

## Status

Delivered and live for Lakshmi Iron Company. Built as an independent consulting engagement, from schema design through deployment.