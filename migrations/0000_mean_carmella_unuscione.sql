CREATE TABLE IF NOT EXISTS "workspaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone,
	"workspaces_owner" uuid NOT NULL,
	"title" text NOT NULL,
	"icon_id" uuid NOT NULL,
	"data" text NOT NULL,
	"in_trash" text,
	"logo" text,
	"banner_url" text
);
