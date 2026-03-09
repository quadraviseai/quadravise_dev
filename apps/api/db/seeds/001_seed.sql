INSERT INTO blog_categories (name)
VALUES
  ('SaaS Development'),
  ('Startup Technology'),
  ('Website Development'),
  ('Mobile App Development'),
  ('AI Technology')
ON CONFLICT (name) DO NOTHING;

INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  meta_title,
  meta_description,
  author,
  category_id,
  published_at,
  is_published
)
SELECT
  'How to Build a SaaS Product from Scratch',
  'how-to-build-a-saas-product-from-scratch',
  'A practical roadmap from validation to launch.',
  'This article explains planning, architecture, MVP scope, and launch strategy.',
  'How to Build a SaaS Product | Quadravise',
  'A practical guide to building a SaaS product from idea to launch.',
  'Quadravise Team',
  bc.id,
  NOW() - INTERVAL '20 days',
  true
FROM blog_categories bc
WHERE bc.name = 'SaaS Development'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  meta_title,
  meta_description,
  author,
  category_id,
  published_at,
  is_published
)
SELECT
  'Startup MVP Development Guide',
  'startup-mvp-development-guide',
  'How founders can ship quickly without technical debt.',
  'Define problem, prioritize core workflows, build, test, iterate.',
  'Startup MVP Development Guide | Quadravise',
  'Ship a startup MVP quickly with a practical product strategy.',
  'Quadravise Team',
  bc.id,
  NOW() - INTERVAL '10 days',
  true
FROM blog_categories bc
WHERE bc.name = 'Startup Technology'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO portfolio_projects (
  title,
  slug,
  category,
  description,
  tech_stack,
  outcome,
  is_published
)
VALUES
  (
    'Startup SaaS Platform',
    'startup-saas-platform',
    'SaaS',
    'SaaS platform for subscription-based operations.',
    ARRAY['React', 'Node.js', 'PostgreSQL'],
    'Reduced manual operations by 60%',
    true
  ),
  (
    'Educational Platform',
    'educational-platform',
    'Education',
    'Interactive learning platform with assessments.',
    ARRAY['React', 'Express', 'PostgreSQL'],
    'Increased learner retention by 35%',
    true
  )
ON CONFLICT (slug) DO NOTHING;
