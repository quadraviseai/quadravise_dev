INSERT INTO client_users (email, full_name, password_hash, is_active)
VALUES (
  'client.demo@quadravise.com',
  'Demo Client',
  crypt('Client@123', gen_salt('bf')),
  TRUE
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO client_projects (
  name,
  slug,
  description,
  status,
  developer_note_public,
  note_updated_at
)
VALUES (
  'Phoenix Wellness Portal',
  'phoenix-wellness-portal',
  'Client-facing issue tracking workspace for the Phoenix Wellness Portal rollout.',
  'active',
  'This week we are focusing on login stability, mobile validation issues, and final QA for the booking flow.',
  NOW() - INTERVAL '2 hours'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO client_project_memberships (client_user_id, client_project_id, is_active)
SELECT cu.id, cp.id, TRUE
FROM client_users cu
INNER JOIN client_projects cp ON cp.slug = 'phoenix-wellness-portal'
WHERE cu.email = 'client.demo@quadravise.com'
ON CONFLICT (client_user_id, client_project_id) DO NOTHING;

INSERT INTO bug_tickets (
  client_project_id,
  title,
  description,
  page_url,
  severity,
  category,
  status,
  eta_at,
  created_by_client_user_id,
  created_at,
  updated_at,
  resolved_at,
  is_archived
)
SELECT
  cp.id,
  demo.title,
  demo.description,
  demo.page_url,
  demo.severity,
  demo.category,
  demo.status,
  demo.eta_at,
  cu.id,
  demo.created_at,
  demo.updated_at,
  demo.resolved_at,
  FALSE
FROM client_projects cp
INNER JOIN client_users cu ON cu.email = 'client.demo@quadravise.com'
INNER JOIN (
  VALUES
    (
      'Login form does not submit on Safari',
      'On Safari mobile, tapping the login button sometimes does not trigger submission until the page is refreshed.',
      'https://phoenix.example.com/login',
      'high',
      'Authentication',
      'in_progress',
      NOW() + INTERVAL '2 days',
      NOW() - INTERVAL '5 days',
      NOW() - INTERVAL '3 hours',
      NULL::timestamptz
    ),
    (
      'Booking confirmation page shows stale appointment time',
      'After rescheduling an appointment, the confirmation summary still shows the previous slot for some users.',
      'https://phoenix.example.com/booking/confirm',
      'medium',
      'Booking',
      'need_clarification',
      NOW() + INTERVAL '4 days',
      NOW() - INTERVAL '4 days',
      NOW() - INTERVAL '6 hours',
      NULL::timestamptz
    ),
    (
      'Contact form success toast overlaps footer on small screens',
      'On narrow mobile devices, the success toast covers the footer CTA and remains visible longer than expected.',
      'https://phoenix.example.com/contact',
      'low',
      'UI',
      'new',
      NULL::timestamptz,
      NOW() - INTERVAL '2 days',
      NOW() - INTERVAL '1 day',
      NULL::timestamptz
    ),
    (
      'Password reset email now delivers correctly',
      'SMTP retry configuration was updated and password reset emails are now being delivered successfully.',
      'https://phoenix.example.com/forgot-password',
      'medium',
      'Email',
      'resolved',
      NOW() - INTERVAL '1 day',
      NOW() - INTERVAL '7 days',
      NOW() - INTERVAL '12 hours',
      NOW() - INTERVAL '12 hours'
    )
) AS demo(title, description, page_url, severity, category, status, eta_at, created_at, updated_at, resolved_at) ON TRUE
WHERE cp.slug = 'phoenix-wellness-portal'
  AND NOT EXISTS (
    SELECT 1
    FROM bug_tickets bt
    WHERE bt.client_project_id = cp.id
      AND bt.title = demo.title
  );

INSERT INTO bug_ticket_comments (bug_ticket_id, author_type, author_label, body, is_internal, created_at)
SELECT bt.id, 'developer', 'Quadravise Dev Team', comment_body.body, FALSE, comment_body.created_at
FROM bug_tickets bt
INNER JOIN client_projects cp ON cp.id = bt.client_project_id
INNER JOIN (
  VALUES
    ('Login form does not submit on Safari', 'We reproduced this on iOS Safari and are testing a fix for the submit handler.', NOW() - INTERVAL '1 day'),
    ('Booking confirmation page shows stale appointment time', 'We need one additional failing example with exact time and timezone to complete the patch safely.', NOW() - INTERVAL '5 hours'),
    ('Password reset email now delivers correctly', 'This has been verified in staging and marked resolved. Please confirm from your side as well.', NOW() - INTERVAL '10 hours')
) AS comment_body(ticket_title, body, created_at)
  ON comment_body.ticket_title = bt.title
WHERE cp.slug = 'phoenix-wellness-portal'
  AND NOT EXISTS (
    SELECT 1
    FROM bug_ticket_comments existing
    WHERE existing.bug_ticket_id = bt.id
      AND existing.body = comment_body.body
  );

INSERT INTO bug_ticket_status_history (bug_ticket_id, previous_status, next_status, note, created_at)
SELECT bt.id, history.previous_status, history.next_status, history.note, history.created_at
FROM bug_tickets bt
INNER JOIN client_projects cp ON cp.id = bt.client_project_id
INNER JOIN (
  VALUES
    ('Login form does not submit on Safari', 'new', 'in_progress', 'Issue accepted and moved into active development.', NOW() - INTERVAL '2 days'),
    ('Booking confirmation page shows stale appointment time', 'new', 'need_clarification', 'Awaiting one more reproducible session recording from QA.', NOW() - INTERVAL '8 hours'),
    ('Password reset email now delivers correctly', 'in_progress', 'resolved', 'SMTP retry fix deployed and verified.', NOW() - INTERVAL '12 hours')
) AS history(ticket_title, previous_status, next_status, note, created_at)
  ON history.ticket_title = bt.title
WHERE cp.slug = 'phoenix-wellness-portal'
  AND NOT EXISTS (
    SELECT 1
    FROM bug_ticket_status_history existing
    WHERE existing.bug_ticket_id = bt.id
      AND existing.next_status = history.next_status
      AND existing.note = history.note
  );
