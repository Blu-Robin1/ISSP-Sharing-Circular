-- Create project_supports table for storing support actions on projects
create table "public"."project_supports" (
    "id" text not null default gen_random_uuid()::text,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text),
    "project_id" bigint not null,
    "type" text not null,
    "user_id" text,
    "display_name" text,
    "email" text,
    "payload" jsonb,
    "tenant_id" text not null
);

alter table "public"."project_supports" enable row level security;

CREATE UNIQUE INDEX project_supports_pkey ON public.project_supports USING btree (id);

alter table "public"."project_supports" add constraint "project_supports_pkey" PRIMARY KEY using index "project_supports_pkey";

alter table "public"."project_supports" add constraint "project_supports_project_id_fkey" FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;