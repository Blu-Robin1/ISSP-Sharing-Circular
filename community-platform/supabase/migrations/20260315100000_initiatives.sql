-- SCIS initiatives tables (compatible with proposal schema)
create table if not exists "public"."initiatives" (
    "id" uuid primary key default gen_random_uuid(),
    "created_at" timestamptz not null default now(),
    "updated_at" timestamptz not null default now(),
    "tenant_id" text not null,
    "title" text not null,
    "description" text default '',
    "project_type" text default 'other',
    "stage" smallint not null default 1,
    "stage_override" smallint,
    "location_lat" numeric not null,
    "location_lng" numeric not null,
    "location_status" text default 'preliminary',
    "created_by_profile_id" bigint,
    "status" text not null default 'pending',
    "stage3_milestones" jsonb,
    "image_url" text
);

alter table "public"."initiatives" enable row level security;

create index "initiatives_tenant_id_idx" on "public"."initiatives" using btree ("tenant_id");
create index "initiatives_status_idx" on "public"."initiatives" using btree ("status");
create index "initiatives_stage_idx" on "public"."initiatives" using btree ("stage");

alter table "public"."initiatives"
    add constraint "initiatives_created_by_profile_id_fkey"
    foreign key ("created_by_profile_id") references "public"."profiles"("id") on update cascade on delete set null;

create policy "tenant_isolation" on "public"."initiatives"
    as permissive for all to public
    using ((tenant_id = ((current_setting('request.headers'::text, true))::json ->> 'x-tenant-id'::text)));

grant select, insert, update, delete on "public"."initiatives" to "anon";
grant select, insert, update, delete on "public"."initiatives" to "authenticated";
grant all on "public"."initiatives" to "service_role";

-- initiative_supports (Stage 1: name, email, postal_code)
create table if not exists "public"."initiative_supports" (
    "id" uuid primary key default gen_random_uuid(),
    "created_at" timestamptz not null default now(),
    "initiative_id" uuid not null,
    "profile_id" bigint,
    "name" text,
    "email" text,
    "postal_code" text
);

alter table "public"."initiative_supports" enable row level security;

create index "initiative_supports_initiative_id_idx" on "public"."initiative_supports" using btree ("initiative_id");

alter table "public"."initiative_supports"
    add constraint "initiative_supports_initiative_id_fkey"
    foreign key ("initiative_id") references "public"."initiatives"("id") on update cascade on delete cascade;
alter table "public"."initiative_supports"
    add constraint "initiative_supports_profile_id_fkey"
    foreign key ("profile_id") references "public"."profiles"("id") on update cascade on delete set null;

create policy "tenant_isolation" on "public"."initiative_supports"
    as permissive for all to public
    using (exists (
        select 1 from initiatives i
        where i.id = initiative_supports.initiative_id
        and i.tenant_id = ((current_setting('request.headers'::text, true))::json ->> 'x-tenant-id'::text)
    ));

grant select, insert, update, delete on "public"."initiative_supports" to "anon";
grant select, insert, update, delete on "public"."initiative_supports" to "authenticated";
grant all on "public"."initiative_supports" to "service_role";

-- initiative_contributions (Stage 2+: membership, volunteer, donate, champion)
create table if not exists "public"."initiative_contributions" (
    "id" uuid primary key default gen_random_uuid(),
    "created_at" timestamptz not null default now(),
    "initiative_id" uuid not null,
    "profile_id" bigint,
    "type" text not null,
    "payload" jsonb
);

alter table "public"."initiative_contributions" enable row level security;

create index "initiative_contributions_initiative_id_idx" on "public"."initiative_contributions" using btree ("initiative_id");
create index "initiative_contributions_type_idx" on "public"."initiative_contributions" using btree ("type");

alter table "public"."initiative_contributions"
    add constraint "initiative_contributions_initiative_id_fkey"
    foreign key ("initiative_id") references "public"."initiatives"("id") on update cascade on delete cascade;
alter table "public"."initiative_contributions"
    add constraint "initiative_contributions_profile_id_fkey"
    foreign key ("profile_id") references "public"."profiles"("id") on update cascade on delete set null;

create policy "tenant_isolation" on "public"."initiative_contributions"
    as permissive for all to public
    using (exists (
        select 1 from initiatives i
        where i.id = initiative_contributions.initiative_id
        and i.tenant_id = ((current_setting('request.headers'::text, true))::json ->> 'x-tenant-id'::text)
    ));

grant select, insert, update, delete on "public"."initiative_contributions" to "anon";
grant select, insert, update, delete on "public"."initiative_contributions" to "authenticated";
grant all on "public"."initiative_contributions" to "service_role";
