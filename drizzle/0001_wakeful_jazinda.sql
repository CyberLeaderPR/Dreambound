CREATE TABLE `collection` (
	`key` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`item` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `player_games` (
	`key` text PRIMARY KEY NOT NULL,
	`player_id` text NOT NULL,
	`game_id` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`recovery_hash` text,
	`appearance` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_recovery_hash_unique` ON `profiles` (`recovery_hash`);