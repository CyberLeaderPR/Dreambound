CREATE INDEX `collection_player_idx` ON `collection` (`player_id`);--> statement-breakpoint
CREATE INDEX `player_games_player_updated_idx` ON `player_games` (`player_id`,`updated_at`);