# THE PERSONAL INTERNET // SECURITY & DATA INTEGRITY REVIEW
**Edition 03 — Human After All**  
**Author:** Srinjoy Pramanick (@Codexia-afk)  
**Repository:** `Codexia-afk/Codexia.portfolio`  
**Security Classification:** Public Application Security Assessment  
**Date:** October 2026  

---

## 1. Threat Model & Security Posture

The application surface consists of:
1. **Public Static Client**: Delivered via Vercel Edge CDN over TLS 1.3.
2. **Visitor Identity Layer**: Supabase Auth utilizing OAuth 2.0 with PKCE (Proof Key for Code Exchange) flow.
3. **Visitor Contribution Layer**: "The Margins" Guestbook allowing authenticated visitors to submit messages and reviews.
4. **Outbound Anchors**: Direct navigation to external profiles (GitHub, LinkedIn, X, Peerlist, etc.).

---

## 2. Secrets & Environment Configuration Audit

### 2.1 Analysis of Client Credentials
- **Finding**: The environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present in `src/lib/supabase.ts` with valid fallback defaults.
- **Verification**: In Supabase architecture, the `anon` (anonymous) key is **by design public and publishable**. It grants only the privileges explicitly defined by Postgres Row Level Security (RLS) policies.
- **Critical Check**: The `service_role` key (which bypasses RLS) is **strictly absent** from client source code, build scripts, git history, and environment templates.
- **Status**: **PASS (Zero Privileged Secrets Exposed)**.

```typescript
// Verified in src/lib/supabase.ts:
// Uses PKCE auth flow with public anon key; enforces RLS on all operations
export const getSupabase = (): SupabaseClient | null => {
  if (!supabaseInstance && isSupabaseConfigured()) {
    supabaseInstance = createClient(url, key, {
      auth: {
        flowType: 'pkce',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return supabaseInstance;
};
```

---

## 3. Database Row Level Security (RLS) Audit

The database schema is defined in `supabase/schema.sql`. RLS is enabled on all tables:

```sql
alter table public.profiles enable row level security;
alter table public.guestbook_notes enable row level security;
alter table public.note_reports enable row level security;
```

### 3.1 Policy Breakdown & Verification

| Table | Operation | Target Role | Policy Rule | Security Guarantee |
| :--- | :--- | :--- | :--- | :--- |
| `profiles` | `SELECT` | Public | `true` | Public display names & avatars only |
| `profiles` | `INSERT` | Authenticated | `auth.uid() = id` | Cannot spoof user profiles |
| `profiles` | `UPDATE` | Authenticated | `auth.uid() = id` | Users can only modify their own name/avatar |
| `guestbook_notes`| `SELECT` | Public | `moderation_status = 'approved' OR auth.uid() = user_id` | Hidden or unapproved notes remain invisible to the public |
| `guestbook_notes`| `INSERT` | Authenticated | `auth.uid() = user_id AND is_featured = false` | Cannot impersonate author; cannot elevate note to 'featured' |
| `guestbook_notes`| `UPDATE` | Authenticated | `auth.uid() = user_id AND is_featured = false` | Notes can only be edited by their original author |
| `guestbook_notes`| `DELETE` | Authenticated | `auth.uid() = user_id` | Notes can only be removed by their original author |
| `note_reports` | `INSERT` | Authenticated / Public | `true` | Any visitor can report spam or abusive content |
| `note_reports` | `SELECT` | Service Role | `auth.role() = 'service_role'` | Reports are inaccessible to regular visitors |

---

## 4. Cross-Site Scripting (XSS) & Input Validation Safeguards

### 4.1 Client-Side Rendering
- React 19 automatically escapes all interpolated strings during JSX evaluation (`<div>{note.message}</div>`).
- There are **zero** instances of `dangerouslySetInnerHTML` handling untrusted visitor notes.
- HTML tags in visitor messages are rendered as raw plain text, nullifying stored XSS attack vectors.

### 4.2 Database Input Constraints
The database enforces strict length and format checks:
```sql
message text not null check (length(trim(message)) >= 5 and length(message) <= 400),
rating smallint check (rating is null or (rating >= 1 and rating <= 5)),
moderation_status text not null default 'approved' check (moderation_status in ('pending', 'approved', 'rejected'))
```
- Empty whitespace-only messages are rejected at the database level.
- Payloads exceeding 400 characters are rejected at the database level.
- Rating values outside `1..5` are rejected.

---

## 5. Authentication & OAuth Security

### 5.1 PKCE Flow
The application uses the `pkce` flow rather than the deprecated implicit grant flow. The temporary authorization code is exchanged for tokens over a direct secure channel with the Supabase authorization server, preventing code interception via URL referrers.

### 5.2 Open Redirect Prevention
In `src/components/portal/authService.ts`, redirect targets for OAuth callbacks are derived strictly from:
```typescript
const redirectTo = `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(returnPath)}`;
```
External or attacker-controlled callback origins cannot be injected.

---

## 6. External Link Security

Every external link (LinkedIn, GitHub, X, Instagram, Facebook, Linktree, Peerlist, and project live demos) has been verified to enforce:
```html
target="_blank" rel="noopener noreferrer"
```
This isolates the execution context of third-party domains, preventing reverse tabnabbing and protecting `window.opener` references.

---

## 7. Security Action Summary

- [x] Zero server secrets in client repository or Vite build bundle.
- [x] Strict Row Level Security active on all Supabase tables.
- [x] React JSX escaping protects against stored and reflected XSS.
- [x] Database check constraints enforce message length and rating validation.
- [x] OAuth 2.0 PKCE protects visitor authentication sessions.
- [x] All outbound hyperlinks enforce `rel="noopener noreferrer"`.
- [x] Spam reporting workflow restricted to administrative service role review.
