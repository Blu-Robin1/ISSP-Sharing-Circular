drop extension if exists "pg_net";

drop trigger if exists "research_text_trigger" on "public"."research";

drop trigger if exists "research_update_trigger" on "public"."research_updates";

drop policy "tenant_isolation" on "public"."news";

drop policy "tenant_isolation" on "public"."research";

drop policy "tenant_isolation" on "public"."research_updates";

drop policy "tenant_isolation" on "public"."tags";

revoke delete on table "public"."news" from "anon";

revoke insert on table "public"."news" from "anon";

revoke references on table "public"."news" from "anon";

revoke select on table "public"."news" from "anon";

revoke trigger on table "public"."news" from "anon";

revoke truncate on table "public"."news" from "anon";

revoke update on table "public"."news" from "anon";

revoke delete on table "public"."news" from "authenticated";

revoke insert on table "public"."news" from "authenticated";

revoke references on table "public"."news" from "authenticated";

revoke select on table "public"."news" from "authenticated";

revoke trigger on table "public"."news" from "authenticated";

revoke truncate on table "public"."news" from "authenticated";

revoke update on table "public"."news" from "authenticated";

revoke delete on table "public"."news" from "service_role";

revoke insert on table "public"."news" from "service_role";

revoke references on table "public"."news" from "service_role";

revoke select on table "public"."news" from "service_role";

revoke trigger on table "public"."news" from "service_role";

revoke truncate on table "public"."news" from "service_role";

revoke update on table "public"."news" from "service_role";

revoke delete on table "public"."research" from "anon";

revoke insert on table "public"."research" from "anon";

revoke references on table "public"."research" from "anon";

revoke select on table "public"."research" from "anon";

revoke trigger on table "public"."research" from "anon";

revoke truncate on table "public"."research" from "anon";

revoke update on table "public"."research" from "anon";

revoke delete on table "public"."research" from "authenticated";

revoke insert on table "public"."research" from "authenticated";

revoke references on table "public"."research" from "authenticated";

revoke select on table "public"."research" from "authenticated";

revoke trigger on table "public"."research" from "authenticated";

revoke truncate on table "public"."research" from "authenticated";

revoke update on table "public"."research" from "authenticated";

revoke delete on table "public"."research" from "service_role";

revoke insert on table "public"."research" from "service_role";

revoke references on table "public"."research" from "service_role";

revoke select on table "public"."research" from "service_role";

revoke trigger on table "public"."research" from "service_role";

revoke truncate on table "public"."research" from "service_role";

revoke update on table "public"."research" from "service_role";

revoke delete on table "public"."research_updates" from "anon";

revoke insert on table "public"."research_updates" from "anon";

revoke references on table "public"."research_updates" from "anon";

revoke select on table "public"."research_updates" from "anon";

revoke trigger on table "public"."research_updates" from "anon";

revoke truncate on table "public"."research_updates" from "anon";

revoke update on table "public"."research_updates" from "anon";

revoke delete on table "public"."research_updates" from "authenticated";

revoke insert on table "public"."research_updates" from "authenticated";

revoke references on table "public"."research_updates" from "authenticated";

revoke select on table "public"."research_updates" from "authenticated";

revoke trigger on table "public"."research_updates" from "authenticated";

revoke truncate on table "public"."research_updates" from "authenticated";

revoke update on table "public"."research_updates" from "authenticated";

revoke delete on table "public"."research_updates" from "service_role";

revoke insert on table "public"."research_updates" from "service_role";

revoke references on table "public"."research_updates" from "service_role";

revoke select on table "public"."research_updates" from "service_role";

revoke trigger on table "public"."research_updates" from "service_role";

revoke truncate on table "public"."research_updates" from "service_role";

revoke update on table "public"."research_updates" from "service_role";

revoke delete on table "public"."tags" from "anon";

revoke insert on table "public"."tags" from "anon";

revoke references on table "public"."tags" from "anon";

revoke select on table "public"."tags" from "anon";

revoke trigger on table "public"."tags" from "anon";

revoke truncate on table "public"."tags" from "anon";

revoke update on table "public"."tags" from "anon";

revoke delete on table "public"."tags" from "authenticated";

revoke insert on table "public"."tags" from "authenticated";

revoke references on table "public"."tags" from "authenticated";

revoke select on table "public"."tags" from "authenticated";

revoke trigger on table "public"."tags" from "authenticated";

revoke truncate on table "public"."tags" from "authenticated";

revoke update on table "public"."tags" from "authenticated";

revoke delete on table "public"."tags" from "service_role";

revoke insert on table "public"."tags" from "service_role";

revoke references on table "public"."tags" from "service_role";

revoke select on table "public"."tags" from "service_role";

revoke trigger on table "public"."tags" from "service_role";

revoke truncate on table "public"."tags" from "service_role";

revoke update on table "public"."tags" from "service_role";

alter table "public"."news" drop constraint "news_category_fkey";

alter table "public"."news" drop constraint "news_created_by_fkey";

alter table "public"."news" drop constraint "news_profile_badge_fkey";

alter table "public"."news" drop constraint "news_tenant_id_slug_key";

alter table "public"."research" drop constraint "research_category_fkey";

alter table "public"."research" drop constraint "research_created_by_fkey";

alter table "public"."research_updates" drop constraint "research_update_research_id_fkey";

alter table "public"."research_updates" drop constraint "research_updates_created_by_fkey";

drop function if exists "public"."news_search_fields"(public.news);

alter table "public"."news" drop constraint "news_pkey";

alter table "public"."research" drop constraint "research_pkey";

alter table "public"."research_updates" drop constraint "research_updates_pkey";

alter table "public"."tags" drop constraint "tags_pkey";

drop index if exists "public"."news_category_idx";

drop index if exists "public"."news_created_by_idx";

drop index if exists "public"."news_deleted_moderation_category_total_views_tags_created_a_idx";

drop index if exists "public"."news_pkey";

drop index if exists "public"."news_tags_idx";

drop index if exists "public"."news_tenant_id_slug_key";

drop index if exists "public"."research_created_by_idx";

drop index if exists "public"."research_fts_idx";

drop index if exists "public"."research_pkey";

drop index if exists "public"."research_updates_created_by_idx";

drop index if exists "public"."research_updates_pkey";

drop index if exists "public"."tags_pkey";

drop table "public"."news";

drop table "public"."research";

drop table "public"."research_updates";

drop table "public"."tags";


  create table "public"."Project_Contributions" (
    "Cont _id" bigint generated by default as identity not null,
    "User_id" bigint not null,
    "Proj_id" bigint not null,
    "Cont_Type" bigint
      );


alter table "public"."Project_Contributions" enable row level security;


  create table "public"."Type_of_Contribution" (
    "CType_id" bigint generated by default as identity not null,
    "ContType" text
      );


alter table "public"."Type_of_Contribution" enable row level security;

alter table "public"."map_pins" drop column "country";

alter table "public"."map_pins" drop column "country_code";

alter table "public"."map_pins" add column "city" text not null;

alter table "public"."profile_types" drop column "image_url";

alter table "public"."profile_types" drop column "small_image_url";

alter table "public"."profiles" drop column "country";

alter table "public"."profiles" add column "city" text;

alter table "public"."project_steps" drop column "order";

alter table "public"."project_steps" add column "stage" smallint;

alter table "public"."projects" drop column "difficulty_level";

alter table "public"."projects" drop column "file_download_count";

CREATE UNIQUE INDEX "Project_Contributions_pkey" ON public."Project_Contributions" USING btree ("Cont _id");

CREATE UNIQUE INDEX "Type_of_Contribution_pkey" ON public."Type_of_Contribution" USING btree ("CType_id");

alter table "public"."Project_Contributions" add constraint "Project_Contributions_pkey" PRIMARY KEY using index "Project_Contributions_pkey";

alter table "public"."Type_of_Contribution" add constraint "Type_of_Contribution_pkey" PRIMARY KEY using index "Type_of_Contribution_pkey";

alter table "public"."Project_Contributions" add constraint "Project_Contributions_Cont_Type_fkey" FOREIGN KEY ("Cont_Type") REFERENCES public."Type_of_Contribution"("CType_id") not valid;

alter table "public"."Project_Contributions" validate constraint "Project_Contributions_Cont_Type_fkey";

alter table "public"."Project_Contributions" add constraint "Project_Contributions_Proj_id_fkey" FOREIGN KEY ("Proj_id") REFERENCES public.projects(id) not valid;

alter table "public"."Project_Contributions" validate constraint "Project_Contributions_Proj_id_fkey";

alter table "public"."Project_Contributions" add constraint "Project_Contributions_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES public.profiles(id) not valid;

alter table "public"."Project_Contributions" validate constraint "Project_Contributions_User_id_fkey";

grant delete on table "public"."Project_Contributions" to "anon";

grant insert on table "public"."Project_Contributions" to "anon";

grant references on table "public"."Project_Contributions" to "anon";

grant select on table "public"."Project_Contributions" to "anon";

grant trigger on table "public"."Project_Contributions" to "anon";

grant truncate on table "public"."Project_Contributions" to "anon";

grant update on table "public"."Project_Contributions" to "anon";

grant delete on table "public"."Project_Contributions" to "authenticated";

grant insert on table "public"."Project_Contributions" to "authenticated";

grant references on table "public"."Project_Contributions" to "authenticated";

grant select on table "public"."Project_Contributions" to "authenticated";

grant trigger on table "public"."Project_Contributions" to "authenticated";

grant truncate on table "public"."Project_Contributions" to "authenticated";

grant update on table "public"."Project_Contributions" to "authenticated";

grant delete on table "public"."Project_Contributions" to "service_role";

grant insert on table "public"."Project_Contributions" to "service_role";

grant references on table "public"."Project_Contributions" to "service_role";

grant select on table "public"."Project_Contributions" to "service_role";

grant trigger on table "public"."Project_Contributions" to "service_role";

grant truncate on table "public"."Project_Contributions" to "service_role";

grant update on table "public"."Project_Contributions" to "service_role";

grant delete on table "public"."Type_of_Contribution" to "anon";

grant insert on table "public"."Type_of_Contribution" to "anon";

grant references on table "public"."Type_of_Contribution" to "anon";

grant select on table "public"."Type_of_Contribution" to "anon";

grant trigger on table "public"."Type_of_Contribution" to "anon";

grant truncate on table "public"."Type_of_Contribution" to "anon";

grant update on table "public"."Type_of_Contribution" to "anon";

grant delete on table "public"."Type_of_Contribution" to "authenticated";

grant insert on table "public"."Type_of_Contribution" to "authenticated";

grant references on table "public"."Type_of_Contribution" to "authenticated";

grant select on table "public"."Type_of_Contribution" to "authenticated";

grant trigger on table "public"."Type_of_Contribution" to "authenticated";

grant truncate on table "public"."Type_of_Contribution" to "authenticated";

grant update on table "public"."Type_of_Contribution" to "authenticated";

grant delete on table "public"."Type_of_Contribution" to "service_role";

grant insert on table "public"."Type_of_Contribution" to "service_role";

grant references on table "public"."Type_of_Contribution" to "service_role";

grant select on table "public"."Type_of_Contribution" to "service_role";

grant trigger on table "public"."Type_of_Contribution" to "service_role";

grant truncate on table "public"."Type_of_Contribution" to "service_role";

grant update on table "public"."Type_of_Contribution" to "service_role";


