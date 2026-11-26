import { describe, expect, vi, test, beforeEach } from "vitest";

import type { Request, Response } from "express";

const mocks = vi.hoisted(() => ({
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
}));

vi.mock("../../db.ts", () => ({
    db: {
        badges: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
        }
    }
}));

import BadgesController from "../../controllers/BadgesController.ts";

const makeRes = () => {
    const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
    } as unknown as Response;
    return res;
};

describe("BadgesController", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    describe("create", () => {
        test("Return_400_WhenTitleMissing", async () => {
            const req = { body: { Description: "Some description" } } as unknown as Request;
            const res = makeRes();

            await BadgesController.create(req, res);

            expect(mocks.create).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "Missing parameters, please review data"
            });
        });

        test("Return_400_WhenDescriptionMissing", async () => {
            const req = { body: { Title: "Verified Artist" } } as unknown as Request;
            const res = makeRes();

            await BadgesController.create(req, res);

            expect(mocks.create).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "Missing parameters, please review data"
            });
        });

        test("Return_CreatedBadge_With201Status_AndDefaultFlags", async () => {
            const created = {
                id: "01a18710-a6c5-73c8-b9bc-f07aeb27dcc4",
                Title: "Verified Artist",
                Description: "Awarded to verified artists on Notates",
            };
            mocks.create.mockResolvedValue(created);

            const req = {
                body: {
                    Title: "Verified Artist",
                    Description: "Awarded to verified artists on Notates",
                }
            } as unknown as Request;
            const res = makeRes();

            await BadgesController.create(req, res);

            expect(mocks.create).toHaveBeenCalledOnce();
            expect(mocks.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    id: expect.any(String),
                    Title: "Verified Artist",
                    Description: "Awarded to verified artists on Notates",
                    isAdmin: false,
                    isPlusMember: false,
                    isVerifiedArtist: false,
                    postCount: 0,
                    reactionCount: 0,
                })
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(created);
        });

        test("Return_CreatedBadge_With201Status_KeepsProvidedCountsAndDates", async () => {
            const created = { id: "01a18710-a6c5-73c8-b9bc-f07aeb27dcc4" };
            mocks.create.mockResolvedValue(created);

            const req = {
                body: {
                    Title: "Prolific Poster",
                    Description: "Awarded for 25 posts",
                    DateObtained: "2026-10-29T10:00:00.000Z",
                    JoinDate: "2026-01-15T00:00:00.000Z",
                    postCount: 25,
                    reactionCount: 150,
                }
            } as unknown as Request;
            const res = makeRes();

            await BadgesController.create(req, res);

            expect(mocks.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    Title: "Prolific Poster",
                    Description: "Awarded for 25 posts",
                    DateObtained: "2026-10-29T10:00:00.000Z",
                    JoinDate: "2026-01-15T00:00:00.000Z",
                    postCount: 25,
                    reactionCount: 150,
                })
            );
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(created);
        });
    });
});
