import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const games = sqliteTable('games', { id:text('id').primaryKey(), state:text('state').notNull(), revision:integer('revision').notNull().default(0), createdAt:integer('created_at').notNull() });
export const profiles=sqliteTable('profiles',{id:text('id').primaryKey(),recoveryHash:text('recovery_hash').unique(),appearance:text('appearance'),createdAt:integer('created_at').notNull()});
export const collection=sqliteTable('collection',{key:text('key').primaryKey(),playerId:text('player_id').notNull(),item:text('item').notNull(),createdAt:integer('created_at').notNull()},t=>[index('collection_player_idx').on(t.playerId)]);
export const playerGames=sqliteTable('player_games',{key:text('key').primaryKey(),playerId:text('player_id').notNull(),gameId:text('game_id').notNull(),updatedAt:integer('updated_at').notNull()},t=>[index('player_games_player_updated_idx').on(t.playerId,t.updatedAt)]);

export const requestLimits=sqliteTable('request_limits',{key:text('key').primaryKey(),count:integer('count').notNull(),expiresAt:integer('expires_at').notNull()},t=>[index('request_limits_expiry_idx').on(t.expiresAt)]);
