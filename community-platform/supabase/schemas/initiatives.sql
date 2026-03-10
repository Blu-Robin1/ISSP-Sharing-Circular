-- SCIS initiatives tables (matches migration 20260315100000_initiatives.sql)
CREATE TABLE IF NOT EXISTS "public"."initiatives" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "updated_at" timestamptz NOT NULL DEFAULT now(),
    "tenant_id" text NOT NULL,
    "title" text NOT NULL,
    "description" text DEFAULT '',
    "project_type" text DEFAULT 'other',
    "stage" smallint NOT NULL DEFAULT 1,
    "stage_override" smallint,
    "location_lat" numeric NOT NULL,
    "location_lng" numeric NOT NULL,
    "location_status" text DEFAULT 'preliminary',
    "created_by_profile_id" bigint,
    "status" text NOT NULL DEFAULT 'pending',
    "stage3_milestones" jsonb,
    "image_url" text
);

ALTER TABLE "public"."initiatives" ENABLE ROW LEVEL SECURITY;

CREATE INDEX "initiatives_tenant_id_idx" ON "public"."initiatives" USING btree ("tenant_id");
CREATE INDEX "initiatives_status_idx" ON "public"."initiatives" USING btree ("status");
CREATE INDEX "initiatives_stage_idx" ON "public"."initiatives" USING btree ("stage");

ALTER TABLE "public"."initiatives"
    ADD CONSTRAINT "initiatives_created_by_profile_id_fkey"
    FOREIGN KEY ("created_by_profile_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE SET NULL;

CREATE POLICY "tenant_isolation" ON "public"."initiatives"
    AS PERMISSIVE FOR ALL TO public
    USING ((tenant_id = ((current_setting('request.headers'::text, true))::json ->> 'x-tenant-id'::text)));

-- initiative_supports (Stage 1: name, email, postal_code)
CREATE TABLE IF NOT EXISTS "public"."initiative_supports" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "initiative_id" uuid NOT NULL,
    "profile_id" bigint,
    "name" text,
    "email" text,
    "postal_code" text
);

ALTER TABLE "public"."initiative_supports" ENABLE ROW LEVEL SECURITY;

CREATE INDEX "initiative_supports_initiative_id_idx" ON "public"."initiative_supports" USING btree ("initiative_id");

ALTER TABLE "public"."initiative_supports"
    ADD CONSTRAINT "initiative_supports_initiative_id_fkey"
    FOREIGN KEY ("initiative_id") REFERENCES "public"."initiatives"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "public"."initiative_supports"
    ADD CONSTRAINT "initiative_supports_profile_id_fkey"
    FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE SET NULL;

CREATE POLICY "tenant_isolation" ON "public"."initiative_supports"
    AS PERMISSIVE FOR ALL TO public
    USING (exists (
        SELECT 1 FROM initiatives i
        WHERE i.id = initiative_supports.initiative_id
        AND i.tenant_id = ((current_setting('request.headers'::text, true))::json ->> 'x-tenant-id'::text)
    ));

-- initiative_contributions (Stage 2+: membership, volunteer, donate, champion)
CREATE TABLE IF NOT EXISTS "public"."initiative_contributions" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    "created_at" timestamptz NOT NULL DEFAULT now(),
    "initiative_id" uuid NOT NULL,
    "profile_id" bigint,
    "type" text NOT NULL,
    "payload" jsonb
);

ALTER TABLE "public"."initiative_contributions" ENABLE ROW LEVEL SECURITY;

CREATE INDEX "initiative_contributions_initiative_id_idx" ON "public"."initiative_contributions" USING btree ("initiative_id");
CREATE INDEX "initiative_contributions_type_idx" ON "public"."initiative_contributions" USING btree ("type");

ALTER TABLE "public"."initiative_contributions"
    ADD CONSTRAINT "initiative_contributions_initiative_id_fkey"
    FOREIGN KEY ("initiative_id") REFERENCES "public"."initiatives"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "public"."initiative_contributions"
    ADD CONSTRAINT "initiative_contributions_profile_id_fkey"
    FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON UPDATE CASCADE ON DELETE SET NULL;

CREATE POLICY "tenant_isolation" ON "public"."initiative_contributions"
    AS PERMISSIVE FOR ALL TO public
    USING (exists (
        SELECT 1 FROM initiatives i
        WHERE i.id = initiative_contributions.initiative_id
        AND i.tenant_id = ((current_setting('request.headers'::text, true))::json ->> 'x-tenant-id'::text)
    ));
