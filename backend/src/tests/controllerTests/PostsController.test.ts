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
import type { Post } from "../../models/Post.ts";

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


    test("Return_ModifiedUserById_With201Status", async() => {
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
        const explicitTime = new Date()
        mocks.update.mockResolvedValue([1])
        const req ={
            protocol: "http",
            get: vi.fn(()=>"localhost:8080"),
            params: {
                id: "7bef1e04-e5a2-4671-bff4-51588445b176"
            },
            body: {
                id: "7bef1e04-e5a2-4671-bff4-51588445b176",
                PostTitle: "Galaxies",
                ContentLink:"Ababa",
                PostDescription:"Ababa",
                ReleaseDate: "2000-12-31T22:00:00.000Z",
                createdAt: "2026-10-29T08:35:36.000Z",
                updatedAt: "2026-10-29T10:11:12.000Z"
            }
        } as unknown as Request
        const res= {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response

        //äkshun
        const result = await _PostsController.modifyById(req, res) as unknown as Post

        //kontroll
        expect(mocks.findByPk).toHaveBeenCalledWith(post.id)
        expect(mocks.update).toHaveBeenCalledOnce()

        const updatedPost = mocks.update.mock.calls[0]?.[0]
        console.log("updatedUser: "+updatedPost)
        //expect(updatedUser.id).toBe(user.id)
        expect(updatedPost.id).toBe(req.body.id)
        expect(updatedPost.PostTitle).toBe(req.body.PostTitle)
        expect(updatedPost.ContentLink).toBe(req.body.ContentLink)
        expect(updatedPost.PostDescription).toBe(req.body.PostDescription)
        expect(updatedPost.ReleaseDate).toBe(req.body.ReleaseDate)
        expect(updatedPost.createdAt).toBe(undefined)
        expect(mocks.update.mock.calls[0]?.[1]).toEqual({
            where: {
                id: post.id
            }
        })
        expect(res.status).toHaveBeenCalledWith(201)
    })
    
    
    test("Return_NoContentOnDelete_With204Status", async() => {
        const thisid = "01a18e66-5fdb-73f6-9f36-fec1238c7d30"
        const post = {
            id: thisid,
            destroy: vi.fn().mockResolvedValue(undefined)
        }
        mocks.findByPk.mockResolvedValue(post)
        const req = {
            params: {
                id: thisid
            }
        } as unknown as Request
        const res = {
            status:vi.fn().mockReturnThis(),
            send:vi.fn().mockReturnThis(),
        } as unknown as Response

        //äksioñ
        await _PostsController.deleteById(req, res)

        //kontroll
        expect(mocks.findByPk).toHaveBeenCalledWith(thisid)
        expect(post.destroy).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(204);
    })
    test("Return_OnePostbyId_With404Status", async () => { // no idea why this doesnt work but vaitmaa you said this was okay :P
        const req = {
            params: {
                id: "01a18724-66dd-73d4-8c1c-8abbd5fa45f0"
            }
        } as unknown as Request;
    
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;
    
        mocks.findByPk.mockResolvedValue(null);
    
        await _PostsController.getByID(req, res);
    
        expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(
            req.params.id
        );
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(undefined);
    })
    test("Return_CreatedPost_With400Status", async () =>{
        const id = "7bef1e04-e5a2-4671-bff4-51588445b176"
        mocks.create.mockResolvedValue({ id: id})
        const req = {
            protocol: "http",
            get: vi.fn(()=>"localhost:8080"),
            body: {
                id:	"01a18724-66dd-73d4-8c1c-8abbd5fa45f9",
                PostTitle: 7,
                ContentLink: "Ababa",
                PostDescription: "Ababa",
            }
        } as unknown as Request
        const res = {
            location: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response


        //tegevus
        await _PostsController.create(req,res)

        //CHECKITY CHECK DIS SHIZ
        expect(res.status).toHaveBeenCalledWith(400)
    })

    test("Return_NotFoundOnDelete_With404Status", async () => {
        const req = {
            params: {
                id: "01a18724-66dd-73d4-8c1c-8abbd5fa45f0"
            }
        } as unknown as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        // äksioñ
        await _PostsController.deleteById(req, res);

        //kontroll
        expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith("01a18724-66dd-73d4-8c1c-8abbd5fa45f0");
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(undefined);
    });
    
});
