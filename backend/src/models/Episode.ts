// src/models/Episode.ts

import { database, database as sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import { WatchTimeInstance } from "./WatchTime";
export interface Episode {
  id: number;
  name: string;
  synopsis: string;
  order: number;
  videoUrl: string;
  secondsLong: number;
  courseId: number;
}

export interface EpisodeCreationAttributes
  extends Optional<Episode, "id" | "videoUrl" | "secondsLong"> {
  watchTime: WatchTimeInstance;
}

export interface EpisodeInstance
  extends Model<Episode, EpisodeCreationAttributes>,
    Episode {}

export const Episode = database.define<EpisodeInstance, Episode>("Episode", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  synopsis: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  order: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  videoUrl: {
    type: DataTypes.STRING,
  },
  secondsLong: {
    type: DataTypes.INTEGER,
  },
  courseId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: { model: "courses", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
