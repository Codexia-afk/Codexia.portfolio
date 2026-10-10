-- ==============================================================================
-- THE MARGINS // PORTAL OS GUESTBOOK & AUTHENTICATION SCHEMA
-- PostgreSQL schema & Row-Level Security (RLS) policies for Supabase
-- ==============================================================================

-- Enable pgcrypto for UUID generation if not already enabled
create extension if not exists "pgcrypto";

-- 1. PROFILES TABLE (Stores user display name and avatar)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  display_name text,
  avatar_url text,
  provider text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 2. GUESTBOOK_NOTES TABLE (Persistent public and user notes)
create table if not exists public.guestbook_notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  display_name_snapshot text not null,
  message text not null check (length(trim(message)) >= 5 and length(message) <= 400),
  category text not null,
  rating smallint check (rating is null or (rating >= 1 and rating <= 5)),
  moderation_status text not null default 'approved' check (moderation_status in ('pending', 'approved', 'rejected')),
  is_featured boolean not null default false,
  reaction_count integer not null default 0 check (reaction_count >= 0),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- 3. NOTE_REPORTS TABLE (Abuse & spam reports for moderation)
create table if not exists public.note_reports (
  id uuid default gen_random_uuid() primary key,
  note_id uuid references public.guestbook_notes(id) on delete cascade not null,
  reporter_id uuid references auth.users(id) on delete set null,
  reason text not null check (length(trim(reason)) >= 3),
  created_at timestamptz default now() not null
);

-- 4. PERFORMANCE INDEXES
create index if not exists idx_notes_status_created on public.guestbook_notes(moderation_status, created_at desc);
create index if not exists idx_notes_user_id on public.guestbook_notes(user_id);
create index if not exists idx_notes_featured on public.guestbook_notes(is_featured) where is_featured = true;
create index if not exists idx_reports_note_id on public.note_reports(note_id);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.guestbook_notes enable row level security;
alter table public.note_reports enable row level security;

-- Profiles policies
create policy "Public can read profiles"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Guestbook Notes policies
create policy "Public can read approved notes or own notes"
  on public.guestbook_notes for select
  using (
    moderation_status = 'approved' 
    or (auth.uid() is not null and auth.uid() = user_id)
  );

create policy "Authenticated users can create notes"
  on public.guestbook_notes for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and moderation_status in ('approved', 'pending')
    and is_featured = false
  );

create policy "Users can update their own notes"
  on public.guestbook_notes for update
  to authenticated
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and is_featured = false
  );

create policy "Users can delete their own notes"
  on public.guestbook_notes for delete
  to authenticated
  using (auth.uid() = user_id);

-- Note Reports policies
create policy "Authenticated or public users can submit reports"
  on public.note_reports for insert
  with check (true);

create policy "Only service role can read reports"
  on public.note_reports for select
  using (auth.role() = 'service_role');

-- 6. AUTOMATIC TRIGGER FOR USER SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, avatar_url, provider)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'user_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', ''),
    coalesce(new.raw_app_meta_data->>'provider', new.raw_user_meta_data->>'provider', 'google')
  )
  on conflict (id) do update set
    display_name = coalesce(excluded.display_name, profiles.display_name),
    avatar_url = coalesce(excluded.avatar_url, profiles.avatar_url),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
