import { describe, expect, vi, test, beforeEach } from "vitest";

/*
describe, organiseerib teste
it - on üks test case, on sama nagu test()
expect - on assert, "expect(10).toBe(5)", expected ja actuali analoog
vi - virtualiseerija millega tehakse mockobjekte, meetodeid, andmebaase jne - on kui "virtual"
beforeEach käivitab setupi enne igat testi
*/


import type { Request, Response } from "express";
import { v7 as uuidv7 } from "uuid";

const mocks = vi.hoisted(()=>({
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
}))

vi.mock("../../db.ts", () => ({
    db: {
        posts: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
            update: mocks.update
        }
    }
}));

import _PostsController from "../../controllers/PostsController.ts"

describe("PostsController", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("Return_AllPosts_With200Status", async () => {
        mocks.findAll.mockResolvedValue([
            {id: "01a18724-66dd-73d4-8c1c-8abbd5fa45f9", PostTitle: "Galaxies"}, // , ContentLink: "Ababa",PostDescription: "Ababa", ReleaseDate: "01/01/2001"
            {id: "01a18753-a318-778f-bd34-ecd0b2f0924c", PostTitle: "Universes"},
         ])

        const req = {} as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        await _PostsController.getAll(req, res);

        expect(mocks.findAll).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([
            {id: "01a18724-66dd-73d4-8c1c-8abbd5fa45f9", PostTitle: "Galaxies"}, // , ContentLink: "Ababa",PostDescription: "Ababa", ReleaseDate: "01/01/2001"
            {id: "01a18753-a318-778f-bd34-ecd0b2f0924c", PostTitle: "Universes"},
         ])
    });

    test("Return_OnePostbyId_With200Status", async() =>{
        const post = {
            id:	"01a18724-66dd-73d4-8c1c-8abbd5fa45f9",
            PostTitle: "Galaxies",
            ContentLink: "Ababa",
            PostDescription: "Ababa",
            ReleaseDate: "2000-12-31T22:00:00.000Z",
            createdAt: "2026-10-29T08:35:36.000Z",
            updatedAt: "2026-10-29T10:11:12.000Z"
        }
        const req = {params:{
            id: post.id
        }} as unknown as Request

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        mocks.findByPk.mockResolvedValue(post)

        await _PostsController.getByID(req, res);

        expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(post.id);
        console.log("!!!! Status: " + res.status)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(post)
    })

    test("Return_CreatedPost_With201Status", async () =>{
        const id = "7bef1e04-e5a2-4671-bff4-51588445b176"
        mocks.create.mockResolvedValue({ id: id})
        const req = {
            protocol: "http",
            get: vi.fn(()=>"localhost:8080"),
            body: {
                id:	"7bef1e04-e5a2-4671-bff4-51588445b176",
                PostTitle: "Galaxies",
                ContentLink: "Ababa",
                PostDescription: "Ababa",
                ReleaseDate: "2000-12-31T22:00:00.000Z",
                createdAt: "2026-10-29T08:35:36.000Z",
                updatedAt: "2026-10-29T10:11:12.000Z"
            }
        } as unknown as Request
        const res = {
            location: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as Response


        //tegevus
        await _PostsController.create(req,res)

        //CHECKITY CHECK DIS SHIZ
        expect(mocks.create).toHaveBeenCalledOnce()
        expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/posts/${id}`)
        expect(res.sendStatus).toHaveBeenCalledWith(201)
    })

    test("ReturnModifiedGameById_With201Status", async()=>{
        mocks.findByPk.mockResolvedValue({id:
            "7bef1e04-e5a2-4671-bff4-51588445b176"
        })
        const post = {
            id:	"7bef1e04-e5a2-4671-bff4-51588445b176",
            PostTitle: "Galaxies",
            ContentLink: "Ababa",
            PostDescription: "Ababa",
            ReleaseDate: "2000-12-31T22:00:00.000Z",
            createdAt: "2026-10-29T08:35:36.000Z",
            updatedAt: "2026-10-29T10:11:12.000Z"
        }
        const req ={
            id: "7bef1e04-e5a2-4671-bff4-51588445b176",
            PostTitle: "Galaxies",
            ContentLink:"Ababa",
            PostDescription:"Ababa",
            ReleaseDate:new Date(),
            createdAt:new Date(),
            updatedAt:new Date()
        } as unknown as Request
        const res= {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response


        await _PostsController.modifyById(req,res)

        expect(mocks.findByPk).toHaveBeenCalledWith(post.id)
        expect(mocks.update).toHaveBeenCalledOnce()
        expect(mocks.update).toHaveBeenCalledWith(
            expect.objectContaining({
                PostTitle: "Galaxies",
                ContentLink:"Ababa",
                PostDescription:"Ababa",
                ReleaseDate:new Date(),
                createdAt:new Date(),
                updatedAt:new Date()
            }),
            {where:{
                id: post.id
            }}
        )
        expect(res.status).toHaveBeenCalledWith(201)
    })
});
