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

    describe("getBadge", () => {
        test("Return_400_WhenIdMissing", async () => {
            const req = { params: {} } as unknown as Request;
            const res = makeRes();

            await BadgesController.getBadge(req, res);

            expect(mocks.findByPk).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Invalid or missing badge id"
            });
        });

        test("Return_404_WhenBadgeNotFound", async () => {
            mocks.findByPk.mockResolvedValue(null);
            const id = "01a18710-a6c5-73c8-b9bc-f07aeb27dcc4";
            const req = { params: { id } } as unknown as Request;
            const res = makeRes();

            await BadgesController.getBadge(req, res);

            expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                error: `Badge not found with id: ${id}`
            });
        });

        test("Return_OneBadge_With200Status", async () => {
            const badge = {
                id: "01a18710-a6c5-73c8-b9bc-f07aeb27dcc4",
                Title: "Verified Artist",
                Description: "Awarded to verified artists on Notates",
            };
            mocks.findByPk.mockResolvedValue(badge);
            const req = { params: { id: badge.id } } as unknown as Request;
            const res = makeRes();

            await BadgesController.getBadge(req, res);

            expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(badge.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(badge);
        });

        test("Return_500_WhenDatabaseFails", async () => {
            mocks.findByPk.mockRejectedValue(new Error("db down"));
            const req = { params: { id: "some-id" } } as unknown as Request;
            const res = makeRes();

            await BadgesController.getBadge(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Failed to retrieve badge"
            });
        });
    });

    describe("modifyById", () => {
        test("Return_400_WhenIdMissing", async () => {
            const req = {
                params: {},
                body: { Title: "New title", Description: "New description" }
            } as unknown as Request;
            const res = makeRes();

            await BadgesController.modifyById(req, res);

            expect(mocks.findByPk).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Invalid or missing badge id"
            });
        });

        test("Return_400_WhenBodyParametersMissing", async () => {
            const id = "01a18710-a6c5-73c8-b9bc-f07aeb27dcc4";
            const req = { params: { id }, body: {} } as unknown as Request;
            const res = makeRes();

            await BadgesController.modifyById(req, res);

            expect(mocks.findByPk).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: "Missing parameters, please review data"
            });
        });

        test("Return_404_WhenBadgeNotFound", async () => {
            mocks.findByPk.mockResolvedValue(null);
            const id = "01a18710-a6c5-73c8-b9bc-f07aeb27dcc4";
            const req = {
                params: { id },
                body: { Title: "New title", Description: "New description" }
            } as unknown as Request;
            const res = makeRes();

            await BadgesController.modifyById(req, res);

            expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                error: `Badge not found with id: ${id}`
            });
        });

        test("Return_ModifiedBadge_With200Status", async () => {
            const id = "01a18710-a6c5-73c8-b9bc-f07aeb27dcc4";
            const update = vi.fn().mockResolvedValue(undefined);
            const badge = { id, Title: "Old title", Description: "Old description", update };
            mocks.findByPk.mockResolvedValue(badge);

            const req = {
                params: { id },
                body: {
                    Title: "New title",
                    Description: "New description",
                    DateObtained: "2026-10-29T10:00:00.000Z",
                    JoinDate: "2026-01-15T00:00:00.000Z",
                    postCount: 5,
                    reactionCount: 9,
                }
            } as unknown as Request;
            const res = makeRes();

            await BadgesController.modifyById(req, res);

            expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(id);
            expect(update).toHaveBeenCalledOnce();
            expect(update).toHaveBeenCalledWith(
                expect.objectContaining({
                    Title: "New title",
                    Description: "New description",
                    DateObtained: "2026-10-29T10:00:00.000Z",
                    JoinDate: "2026-01-15T00:00:00.000Z",
                    postCount: 5,
                    reactionCount: 9,
                })
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(badge);
        });

        test("Return_500_WhenDatabaseFails", async () => {
            mocks.findByPk.mockRejectedValue(new Error("db down"));
            const req = {
                params: { id: "some-id" },
                body: { Title: "New title", Description: "New description" }
            } as unknown as Request;
            const res = makeRes();

            await BadgesController.modifyById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                error: "Failed to update badge"
            });
        });
    });

    describe("deleteById", () => {
        test("Return_400_WhenNoIdSupplied", async () => {
            const req = { params: {} } as unknown as Request;
            const res = makeRes();

            await BadgesController.deleteById(req, res);

            expect(mocks.findByPk).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({
                error: "No badge id supplied"
            });
        });

        test("Return_404_WhenBadgeDoesNotExist", async () => {
            mocks.findByPk.mockResolvedValue(null);
            const id = "01a18710-a6c5-73c8-b9bc-f07aeb27dcc4";
            const req = { params: { id } } as unknown as Request;
            const res = makeRes();

            await BadgesController.deleteById(req, res);

            expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(id);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({
                error: `Badge with this id does not exist: ${id}`
            });
        });

        test("Return_204_WhenBadgeDeleted", async () => {
            const id = "01a18710-a6c5-73c8-b9bc-f07aeb27dcc4";
            const destroy = vi.fn().mockResolvedValue(undefined);
            const badge = { id, destroy };
            mocks.findByPk.mockResolvedValue(badge);
            const req = { params: { id } } as unknown as Request;
            const res = makeRes();

            await BadgesController.deleteById(req, res);

            expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(id);
            expect(destroy).toHaveBeenCalledOnce();
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledWith();
        });
    });
});
