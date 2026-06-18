import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_services_variant" AS ENUM('cream', 'warm', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_about_variant" AS ENUM('cream', 'warm', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_methodology_variant" AS ENUM('cream', 'warm', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_variant" AS ENUM('cream', 'warm', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_contact_variant" AS ENUM('cream', 'warm', 'dark');
  CREATE TABLE "pages_blocks_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Vezetői coaching, ami valódi változást hoz',
  	"title" varchar DEFAULT 'Vezetői döntések<br/><span class="text-[#F7A5A5] italic font-medium">tisztábban</span>,<br/>stratégia <span class="underline decoration-[#FFDBB6] decoration-[6px] underline-offset-8">bátrabban</span>.',
  	"subtitle" varchar DEFAULT 'Az Executive Insights tapasztalt mentorok hálózata...',
  	"primary_cta_text" varchar DEFAULT 'Foglalj diagnosztikát',
  	"primary_cta_link" varchar DEFAULT '#contact',
  	"secondary_cta_text" varchar DEFAULT 'Hogyan dolgozunk?',
  	"secondary_cta_link" varchar DEFAULT '#methodology',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"tag" varchar,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_services_variant" DEFAULT 'cream' NOT NULL,
  	"eyebrow" varchar DEFAULT '01 — Szolgáltatások',
  	"title" varchar DEFAULT 'Programok, amik<br/><span class="italic font-medium text-[#1A2A4F]/70">a vezetődet építik.</span>',
  	"subtitle" varchar DEFAULT 'Hat különböző formátum — egy közös cél: tisztább gondolkodás...',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_about_variant" DEFAULT 'warm' NOT NULL,
  	"eyebrow" varchar DEFAULT '02 — Rólunk',
  	"title" varchar DEFAULT '12 év, 240+ vezető,<br/><span class="italic font-medium">egyetlen küldetés.</span>',
  	"description" varchar,
  	"image_id" integer,
  	"floating_card_title" varchar,
  	"floating_card_value" varchar,
  	"cta_text" varchar,
  	"cta_link" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_methodology_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_methodology" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_methodology_variant" DEFAULT 'cream' NOT NULL,
  	"eyebrow" varchar DEFAULT '03 — Módszertan',
  	"title" varchar DEFAULT 'Négy lépés. Nincs trükk,<br/><span class="italic font-medium text-[#1A2A4F]/70">csak rendszer.</span>',
  	"bottom_strip_title" varchar DEFAULT 'Készen állsz egy 30 perces beszélgetésre?',
  	"bottom_strip_desc" varchar DEFAULT 'Díjmentes diagnosztikai konzultáció — kötelezettség nélkül.',
  	"bottom_strip_cta_text" varchar DEFAULT 'Időpont foglalása',
  	"bottom_strip_cta_link" varchar DEFAULT '#contact',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author_name" varchar NOT NULL,
  	"author_title" varchar NOT NULL,
  	"author_image_id" integer
  );
  
  CREATE TABLE "pages_blocks_testimonials_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_testimonials_variant" DEFAULT 'dark' NOT NULL,
  	"eyebrow" varchar DEFAULT '04 — Ügyfeleink mondták',
  	"title" varchar DEFAULT 'Valós kihívások,<br/><span class="italic font-medium text-[#FFF2EF]/80">valódi áttörések.</span>',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_contact_info" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_contact_variant" DEFAULT 'cream' NOT NULL,
  	"eyebrow" varchar DEFAULT '05 — Kapcsolat',
  	"title" varchar DEFAULT 'Beszéljünk.<br/><span class="italic font-medium text-[#1A2A4F]/70">Diszkréten.</span>',
  	"description" varchar DEFAULT 'Egy 30 perces, kötelezettség nélküli konzultáció...',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_hero_stats" ADD CONSTRAINT "pages_blocks_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_cards" ADD CONSTRAINT "pages_blocks_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services" ADD CONSTRAINT "pages_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_bullets" ADD CONSTRAINT "pages_blocks_about_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_methodology_steps" ADD CONSTRAINT "pages_blocks_methodology_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_methodology"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_methodology" ADD CONSTRAINT "pages_blocks_methodology_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_stats" ADD CONSTRAINT "pages_blocks_testimonials_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_contact_info" ADD CONSTRAINT "pages_blocks_contact_contact_info_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact" ADD CONSTRAINT "pages_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_stats_order_idx" ON "pages_blocks_hero_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_stats_parent_id_idx" ON "pages_blocks_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_cards_order_idx" ON "pages_blocks_services_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_cards_parent_id_idx" ON "pages_blocks_services_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_order_idx" ON "pages_blocks_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_parent_id_idx" ON "pages_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_path_idx" ON "pages_blocks_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_bullets_order_idx" ON "pages_blocks_about_bullets" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_bullets_parent_id_idx" ON "pages_blocks_about_bullets" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_image_idx" ON "pages_blocks_about" USING btree ("image_id");
  CREATE INDEX "pages_blocks_methodology_steps_order_idx" ON "pages_blocks_methodology_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_methodology_steps_parent_id_idx" ON "pages_blocks_methodology_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_methodology_order_idx" ON "pages_blocks_methodology" USING btree ("_order");
  CREATE INDEX "pages_blocks_methodology_parent_id_idx" ON "pages_blocks_methodology" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_methodology_path_idx" ON "pages_blocks_methodology" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_testimonials_order_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_testimonials_parent_id_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_testimonials_author_image_idx" ON "pages_blocks_testimonials_testimonials" USING btree ("author_image_id");
  CREATE INDEX "pages_blocks_testimonials_stats_order_idx" ON "pages_blocks_testimonials_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_stats_parent_id_idx" ON "pages_blocks_testimonials_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_contact_info_order_idx" ON "pages_blocks_contact_contact_info" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_contact_info_parent_id_idx" ON "pages_blocks_contact_contact_info" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_order_idx" ON "pages_blocks_contact" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_parent_id_idx" ON "pages_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_path_idx" ON "pages_blocks_contact" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_methodology_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_methodology" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_contact_info" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_stats" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_services_cards" CASCADE;
  DROP TABLE "pages_blocks_services" CASCADE;
  DROP TABLE "pages_blocks_about_bullets" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_methodology_steps" CASCADE;
  DROP TABLE "pages_blocks_methodology" CASCADE;
  DROP TABLE "pages_blocks_testimonials_testimonials" CASCADE;
  DROP TABLE "pages_blocks_testimonials_stats" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_contact_contact_info" CASCADE;
  DROP TABLE "pages_blocks_contact" CASCADE;
  DROP TABLE "pages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_blocks_services_variant";
  DROP TYPE "public"."enum_pages_blocks_about_variant";
  DROP TYPE "public"."enum_pages_blocks_methodology_variant";
  DROP TYPE "public"."enum_pages_blocks_testimonials_variant";
  DROP TYPE "public"."enum_pages_blocks_contact_variant";`)
}
