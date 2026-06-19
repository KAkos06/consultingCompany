import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_quote_slider_items_icon" AS ENUM('ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowUpRight', 'Award', 'BarChart', 'BarChart2', 'Battery', 'Bell', 'Bluetooth', 'BookOpen', 'Briefcase', 'Building', 'Calendar', 'Camera', 'Check', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'Clock', 'Cloud', 'Compass', 'Copy', 'CreditCard', 'Download', 'Edit', 'Facebook', 'File', 'FileText', 'Folder', 'Gift', 'Github', 'Globe', 'Headphones', 'Heart', 'Home', 'Image', 'Instagram', 'Key', 'Lightbulb', 'Linkedin', 'Lock', 'Mail', 'Map', 'MapPin', 'Menu', 'MessageCircle', 'MessageSquare', 'Mic', 'Monitor', 'Moon', 'MoreHorizontal', 'MoreVertical', 'Package', 'Paperclip', 'Pause', 'Phone', 'PieChart', 'Play', 'PlayCircle', 'Printer', 'Quote', 'Save', 'Search', 'Send', 'Settings', 'Share', 'Share2', 'Shield', 'ShoppingBag', 'ShoppingCart', 'Smartphone', 'Sparkles', 'Speaker', 'Star', 'Sun', 'Tablet', 'Tag', 'Target', 'Trash', 'Trash2', 'TrendingDown', 'TrendingUp', 'Tv', 'Twitter', 'Umbrella', 'Unlock', 'Upload', 'User', 'UserCheck', 'UserMinus', 'UserPlus', 'Users', 'Video', 'VideoOff', 'Wifi', 'X', 'Youtube', 'Zap');
  CREATE TYPE "public"."enum_pages_blocks_services_cards_icon" AS ENUM('ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowUpRight', 'Award', 'BarChart', 'BarChart2', 'Battery', 'Bell', 'Bluetooth', 'BookOpen', 'Briefcase', 'Building', 'Calendar', 'Camera', 'Check', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'Clock', 'Cloud', 'Compass', 'Copy', 'CreditCard', 'Download', 'Edit', 'Facebook', 'File', 'FileText', 'Folder', 'Gift', 'Github', 'Globe', 'Headphones', 'Heart', 'Home', 'Image', 'Instagram', 'Key', 'Lightbulb', 'Linkedin', 'Lock', 'Mail', 'Map', 'MapPin', 'Menu', 'MessageCircle', 'MessageSquare', 'Mic', 'Monitor', 'Moon', 'MoreHorizontal', 'MoreVertical', 'Package', 'Paperclip', 'Pause', 'Phone', 'PieChart', 'Play', 'PlayCircle', 'Printer', 'Quote', 'Save', 'Search', 'Send', 'Settings', 'Share', 'Share2', 'Shield', 'ShoppingBag', 'ShoppingCart', 'Smartphone', 'Sparkles', 'Speaker', 'Star', 'Sun', 'Tablet', 'Tag', 'Target', 'Trash', 'Trash2', 'TrendingDown', 'TrendingUp', 'Tv', 'Twitter', 'Umbrella', 'Unlock', 'Upload', 'User', 'UserCheck', 'UserMinus', 'UserPlus', 'Users', 'Video', 'VideoOff', 'Wifi', 'X', 'Youtube', 'Zap');
  CREATE TYPE "public"."enum_pages_blocks_contact_contact_info_icon" AS ENUM('ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowUpRight', 'Award', 'BarChart', 'BarChart2', 'Battery', 'Bell', 'Bluetooth', 'BookOpen', 'Briefcase', 'Building', 'Calendar', 'Camera', 'Check', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'Clock', 'Cloud', 'Compass', 'Copy', 'CreditCard', 'Download', 'Edit', 'Facebook', 'File', 'FileText', 'Folder', 'Gift', 'Github', 'Globe', 'Headphones', 'Heart', 'Home', 'Image', 'Instagram', 'Key', 'Lightbulb', 'Linkedin', 'Lock', 'Mail', 'Map', 'MapPin', 'Menu', 'MessageCircle', 'MessageSquare', 'Mic', 'Monitor', 'Moon', 'MoreHorizontal', 'MoreVertical', 'Package', 'Paperclip', 'Pause', 'Phone', 'PieChart', 'Play', 'PlayCircle', 'Printer', 'Quote', 'Save', 'Search', 'Send', 'Settings', 'Share', 'Share2', 'Shield', 'ShoppingBag', 'ShoppingCart', 'Smartphone', 'Sparkles', 'Speaker', 'Star', 'Sun', 'Tablet', 'Tag', 'Target', 'Trash', 'Trash2', 'TrendingDown', 'TrendingUp', 'Tv', 'Twitter', 'Umbrella', 'Unlock', 'Upload', 'User', 'UserCheck', 'UserMinus', 'UserPlus', 'Users', 'Video', 'VideoOff', 'Wifi', 'X', 'Youtube', 'Zap');
  CREATE TYPE "public"."enum_pages_blocks_one_column_background" AS ENUM('cream', 'warm', 'dark', 'solidDark');
  CREATE TYPE "public"."enum_pages_blocks_one_column_padding" AS ENUM('none', 'small', 'normal');
  CREATE TYPE "public"."enum_pages_blocks_two_column_background" AS ENUM('cream', 'warm', 'dark', 'solidDark');
  CREATE TYPE "public"."enum_pages_blocks_two_column_padding" AS ENUM('none', 'small', 'normal');
  CREATE TYPE "public"."enum_pages_blocks_two_column_ratio" AS ENUM('1/2-1/2', '1/3-2/3', '2/3-1/3', '1/4-3/4', '3/4-1/4');
  CREATE TYPE "public"."enum_pages_blocks_three_column_background" AS ENUM('cream', 'warm', 'dark', 'solidDark');
  CREATE TYPE "public"."enum_pages_blocks_three_column_padding" AS ENUM('none', 'small', 'normal');
  CREATE TYPE "public"."enum_main_menu_menu_items_mega_items_icon" AS ENUM('ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowUpRight', 'Award', 'BarChart', 'BarChart2', 'Battery', 'Bell', 'Bluetooth', 'BookOpen', 'Briefcase', 'Building', 'Calendar', 'Camera', 'Check', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'Clock', 'Cloud', 'Compass', 'Copy', 'CreditCard', 'Download', 'Edit', 'Facebook', 'File', 'FileText', 'Folder', 'Gift', 'Github', 'Globe', 'Headphones', 'Heart', 'Home', 'Image', 'Instagram', 'Key', 'Lightbulb', 'Linkedin', 'Lock', 'Mail', 'Map', 'MapPin', 'Menu', 'MessageCircle', 'MessageSquare', 'Mic', 'Monitor', 'Moon', 'MoreHorizontal', 'MoreVertical', 'Package', 'Paperclip', 'Pause', 'Phone', 'PieChart', 'Play', 'PlayCircle', 'Printer', 'Quote', 'Save', 'Search', 'Send', 'Settings', 'Share', 'Share2', 'Shield', 'ShoppingBag', 'ShoppingCart', 'Smartphone', 'Sparkles', 'Speaker', 'Star', 'Sun', 'Tablet', 'Tag', 'Target', 'Trash', 'Trash2', 'TrendingDown', 'TrendingUp', 'Tv', 'Twitter', 'Umbrella', 'Unlock', 'Upload', 'User', 'UserCheck', 'UserMinus', 'UserPlus', 'Users', 'Video', 'VideoOff', 'Wifi', 'X', 'Youtube', 'Zap');
  CREATE TYPE "public"."enum_main_menu_menu_items_type" AS ENUM('link', 'mega');
  CREATE TYPE "public"."enum_main_menu_cta_button_icon" AS ENUM('ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowUpRight', 'Award', 'BarChart', 'BarChart2', 'Battery', 'Bell', 'Bluetooth', 'BookOpen', 'Briefcase', 'Building', 'Calendar', 'Camera', 'Check', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ChevronUp', 'Clock', 'Cloud', 'Compass', 'Copy', 'CreditCard', 'Download', 'Edit', 'Facebook', 'File', 'FileText', 'Folder', 'Gift', 'Github', 'Globe', 'Headphones', 'Heart', 'Home', 'Image', 'Instagram', 'Key', 'Lightbulb', 'Linkedin', 'Lock', 'Mail', 'Map', 'MapPin', 'Menu', 'MessageCircle', 'MessageSquare', 'Mic', 'Monitor', 'Moon', 'MoreHorizontal', 'MoreVertical', 'Package', 'Paperclip', 'Pause', 'Phone', 'PieChart', 'Play', 'PlayCircle', 'Printer', 'Quote', 'Save', 'Search', 'Send', 'Settings', 'Share', 'Share2', 'Shield', 'ShoppingBag', 'ShoppingCart', 'Smartphone', 'Sparkles', 'Speaker', 'Star', 'Sun', 'Tablet', 'Tag', 'Target', 'Trash', 'Trash2', 'TrendingDown', 'TrendingUp', 'Tv', 'Twitter', 'Umbrella', 'Unlock', 'Upload', 'User', 'UserCheck', 'UserMinus', 'UserPlus', 'Users', 'Video', 'VideoOff', 'Wifi', 'X', 'Youtube', 'Zap');
  CREATE TYPE "public"."enum_footer_blocks_text_block_social_links_platform" AS ENUM('LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'YouTube');
  ALTER TYPE "public"."_locales" ADD VALUE 'hu' BEFORE 'en';
  CREATE TABLE "pages_blocks_quote_slider_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_quote_slider_items_icon",
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_quote_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_one_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_one_column_background" DEFAULT 'cream' NOT NULL,
  	"padding" "enum_pages_blocks_one_column_padding" DEFAULT 'normal' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_two_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_two_column_background" DEFAULT 'cream' NOT NULL,
  	"padding" "enum_pages_blocks_two_column_padding" DEFAULT 'normal' NOT NULL,
  	"ratio" "enum_pages_blocks_two_column_ratio" DEFAULT '1/2-1/2' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_three_column" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background" "enum_pages_blocks_three_column_background" DEFAULT 'cream' NOT NULL,
  	"padding" "enum_pages_blocks_three_column_padding" DEFAULT 'normal' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_name" varchar DEFAULT 'Executive Insights' NOT NULL,
  	"logo_id" integer,
  	"favicon_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "main_menu_menu_items_mega_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_main_menu_menu_items_mega_items_icon",
  	"title" varchar,
  	"description" varchar,
  	"link_id" integer
  );
  
  CREATE TABLE "main_menu_menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_main_menu_menu_items_type" DEFAULT 'link',
  	"title" varchar NOT NULL,
  	"link_id" integer
  );
  
  CREATE TABLE "main_menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_button_label" varchar DEFAULT 'Kapcsolat',
  	"cta_button_link_id" integer,
  	"cta_button_icon" "enum_main_menu_cta_button_icon",
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_blocks_text_block_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_blocks_text_block_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_blocks_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" numeric DEFAULT 5,
  	"show_logo" boolean DEFAULT true,
  	"content" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_link_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"page_id" integer
  );
  
  CREATE TABLE "footer_blocks_link_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" numeric DEFAULT 2,
  	"title" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_blocks_newsletter_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"width" numeric DEFAULT 3,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"placeholder_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "footer_bottom_bar_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"page_id" integer
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"bottom_bar_copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_services_cards" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_services_cards_icon" USING "icon"::"public"."enum_pages_blocks_services_cards_icon";
  ALTER TABLE "pages_blocks_services_cards" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_contact_info" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_contact_contact_info_icon" USING "icon"::"public"."enum_pages_blocks_contact_contact_info_icon";
  ALTER TABLE "pages_blocks_contact_contact_info" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "users" ADD COLUMN "first_name" varchar;
  ALTER TABLE "users" ADD COLUMN "last_name" varchar;
  ALTER TABLE "users" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "pages_blocks_quote_slider_items" ADD CONSTRAINT "pages_blocks_quote_slider_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_quote_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote_slider" ADD CONSTRAINT "pages_blocks_quote_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_one_column" ADD CONSTRAINT "pages_blocks_one_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_two_column" ADD CONSTRAINT "pages_blocks_two_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_three_column" ADD CONSTRAINT "pages_blocks_three_column_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_menu_menu_items_mega_items" ADD CONSTRAINT "main_menu_menu_items_mega_items_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_menu_menu_items_mega_items" ADD CONSTRAINT "main_menu_menu_items_mega_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu_menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_menu_menu_items" ADD CONSTRAINT "main_menu_menu_items_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_menu_menu_items" ADD CONSTRAINT "main_menu_menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_menu" ADD CONSTRAINT "main_menu_cta_button_link_id_pages_id_fk" FOREIGN KEY ("cta_button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_text_block_social_links" ADD CONSTRAINT "footer_blocks_text_block_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_text_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_text_block" ADD CONSTRAINT "footer_blocks_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_link_block_links" ADD CONSTRAINT "footer_blocks_link_block_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_blocks_link_block_links" ADD CONSTRAINT "footer_blocks_link_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_blocks_link_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_link_block" ADD CONSTRAINT "footer_blocks_link_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_blocks_newsletter_block" ADD CONSTRAINT "footer_blocks_newsletter_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_bar_legal_links" ADD CONSTRAINT "footer_bottom_bar_legal_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_bottom_bar_legal_links" ADD CONSTRAINT "footer_bottom_bar_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_quote_slider_items_order_idx" ON "pages_blocks_quote_slider_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_slider_items_parent_id_idx" ON "pages_blocks_quote_slider_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_slider_order_idx" ON "pages_blocks_quote_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_slider_parent_id_idx" ON "pages_blocks_quote_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_slider_path_idx" ON "pages_blocks_quote_slider" USING btree ("_path");
  CREATE INDEX "pages_blocks_one_column_order_idx" ON "pages_blocks_one_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_one_column_parent_id_idx" ON "pages_blocks_one_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_one_column_path_idx" ON "pages_blocks_one_column" USING btree ("_path");
  CREATE INDEX "pages_blocks_two_column_order_idx" ON "pages_blocks_two_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_two_column_parent_id_idx" ON "pages_blocks_two_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_two_column_path_idx" ON "pages_blocks_two_column" USING btree ("_path");
  CREATE INDEX "pages_blocks_three_column_order_idx" ON "pages_blocks_three_column" USING btree ("_order");
  CREATE INDEX "pages_blocks_three_column_parent_id_idx" ON "pages_blocks_three_column" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_three_column_path_idx" ON "pages_blocks_three_column" USING btree ("_path");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "main_menu_menu_items_mega_items_order_idx" ON "main_menu_menu_items_mega_items" USING btree ("_order");
  CREATE INDEX "main_menu_menu_items_mega_items_parent_id_idx" ON "main_menu_menu_items_mega_items" USING btree ("_parent_id");
  CREATE INDEX "main_menu_menu_items_mega_items_link_idx" ON "main_menu_menu_items_mega_items" USING btree ("link_id");
  CREATE INDEX "main_menu_menu_items_order_idx" ON "main_menu_menu_items" USING btree ("_order");
  CREATE INDEX "main_menu_menu_items_parent_id_idx" ON "main_menu_menu_items" USING btree ("_parent_id");
  CREATE INDEX "main_menu_menu_items_link_idx" ON "main_menu_menu_items" USING btree ("link_id");
  CREATE INDEX "main_menu_cta_button_cta_button_link_idx" ON "main_menu" USING btree ("cta_button_link_id");
  CREATE INDEX "footer_blocks_text_block_social_links_order_idx" ON "footer_blocks_text_block_social_links" USING btree ("_order");
  CREATE INDEX "footer_blocks_text_block_social_links_parent_id_idx" ON "footer_blocks_text_block_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_text_block_order_idx" ON "footer_blocks_text_block" USING btree ("_order");
  CREATE INDEX "footer_blocks_text_block_parent_id_idx" ON "footer_blocks_text_block" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_text_block_path_idx" ON "footer_blocks_text_block" USING btree ("_path");
  CREATE INDEX "footer_blocks_link_block_links_order_idx" ON "footer_blocks_link_block_links" USING btree ("_order");
  CREATE INDEX "footer_blocks_link_block_links_parent_id_idx" ON "footer_blocks_link_block_links" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_link_block_links_page_idx" ON "footer_blocks_link_block_links" USING btree ("page_id");
  CREATE INDEX "footer_blocks_link_block_order_idx" ON "footer_blocks_link_block" USING btree ("_order");
  CREATE INDEX "footer_blocks_link_block_parent_id_idx" ON "footer_blocks_link_block" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_link_block_path_idx" ON "footer_blocks_link_block" USING btree ("_path");
  CREATE INDEX "footer_blocks_newsletter_block_order_idx" ON "footer_blocks_newsletter_block" USING btree ("_order");
  CREATE INDEX "footer_blocks_newsletter_block_parent_id_idx" ON "footer_blocks_newsletter_block" USING btree ("_parent_id");
  CREATE INDEX "footer_blocks_newsletter_block_path_idx" ON "footer_blocks_newsletter_block" USING btree ("_path");
  CREATE INDEX "footer_bottom_bar_legal_links_order_idx" ON "footer_bottom_bar_legal_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_bar_legal_links_parent_id_idx" ON "footer_bottom_bar_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_bar_legal_links_page_idx" ON "footer_bottom_bar_legal_links" USING btree ("page_id");
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_quote_slider_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_quote_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_one_column" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_two_column" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_three_column" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "main_menu_menu_items_mega_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "main_menu_menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "main_menu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_text_block_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_text_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_link_block_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_link_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_blocks_newsletter_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_bottom_bar_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_quote_slider_items" CASCADE;
  DROP TABLE "pages_blocks_quote_slider" CASCADE;
  DROP TABLE "pages_blocks_one_column" CASCADE;
  DROP TABLE "pages_blocks_two_column" CASCADE;
  DROP TABLE "pages_blocks_three_column" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "main_menu_menu_items_mega_items" CASCADE;
  DROP TABLE "main_menu_menu_items" CASCADE;
  DROP TABLE "main_menu" CASCADE;
  DROP TABLE "footer_blocks_text_block_social_links" CASCADE;
  DROP TABLE "footer_blocks_text_block" CASCADE;
  DROP TABLE "footer_blocks_link_block_links" CASCADE;
  DROP TABLE "footer_blocks_link_block" CASCADE;
  DROP TABLE "footer_blocks_newsletter_block" CASCADE;
  DROP TABLE "footer_bottom_bar_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_id_fk";
  
  DROP TYPE "public"."_locales";
  CREATE TYPE "public"."_locales" AS ENUM('en');
  DROP INDEX "users_avatar_idx";
  ALTER TABLE "pages_blocks_services_cards" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_services_cards" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_contact_info" ALTER COLUMN "icon" SET DATA TYPE varchar;
  ALTER TABLE "pages_blocks_contact_contact_info" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "users" DROP COLUMN "first_name";
  ALTER TABLE "users" DROP COLUMN "last_name";
  ALTER TABLE "users" DROP COLUMN "avatar_id";
  DROP TYPE "public"."enum_pages_blocks_quote_slider_items_icon";
  DROP TYPE "public"."enum_pages_blocks_services_cards_icon";
  DROP TYPE "public"."enum_pages_blocks_contact_contact_info_icon";
  DROP TYPE "public"."enum_pages_blocks_one_column_background";
  DROP TYPE "public"."enum_pages_blocks_one_column_padding";
  DROP TYPE "public"."enum_pages_blocks_two_column_background";
  DROP TYPE "public"."enum_pages_blocks_two_column_padding";
  DROP TYPE "public"."enum_pages_blocks_two_column_ratio";
  DROP TYPE "public"."enum_pages_blocks_three_column_background";
  DROP TYPE "public"."enum_pages_blocks_three_column_padding";
  DROP TYPE "public"."enum_main_menu_menu_items_mega_items_icon";
  DROP TYPE "public"."enum_main_menu_menu_items_type";
  DROP TYPE "public"."enum_main_menu_cta_button_icon";
  DROP TYPE "public"."enum_footer_blocks_text_block_social_links_platform";`)
}
