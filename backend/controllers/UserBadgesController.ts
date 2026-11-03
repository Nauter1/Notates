import type { Request, Response } from "express";
import {
    UniqueConstraintError,
    ForeignKeyConstraintError
} from "sequelize";
import { validate as isUuid } from "uuid";
import { db } from "../db.ts";