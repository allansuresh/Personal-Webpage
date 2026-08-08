import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Short standfirst shown on the index and at the top of the post.
    summary: z.string(),
    date: z.coerce.date(),
    // Optional: link this post back to a project entry by its slug.
    project: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    // Short field tags shown as metadata, e.g. ["Inspect AI", "Docker", "Flask"]
    stack: z.array(z.string()).default([]),
    // A short status label — grounded in the eval-log motif used across the site.
    status: z.enum(['active', 'complete', 'archived']).default('complete'),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    writeupUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
