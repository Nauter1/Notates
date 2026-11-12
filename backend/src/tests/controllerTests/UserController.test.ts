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
    update: vi.fn(),
    destroy: vi.fn()
}))

vi.mock("../../db.ts", () => ({
    db: {
        posts: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
            update: mocks.update,
            destroy: mocks.destroy
        }
    }
}));

import _UserController from "../../controllers/UserController.ts"

describe("UserController", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("Return_AllPosts_With200Status", async () => {
        mocks.findAll.mockResolvedValue([
            {
                id: "01a18724-66dd-73d4-8c1c-8abbd5fa45f9",
                UserName: "TestUser",
                AccountType: "unverified",
                EmailAddress: "test@test.com"
            },
            {
                id: "01a18753-a318-778f-bd34-ecd0b2f0924c",
                UserName: "AnotherUser",
                AccountType: "verified",
                EmailAddress: "another@test.com"
            }
         ])

        const req = {} as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        await _UserController.getAll(req, res);

        expect(mocks.findAll).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([
            {
                id: "01a18724-66dd-73d4-8c1c-8abbd5fa45f9",
                UserName: "TestUser",
                AccountType: "unverified",
                EmailAddress: "test@test.com"
            },
            {
                id: "01a18753-a318-778f-bd34-ecd0b2f0924c",
                UserName: "AnotherUser",
                AccountType: "verified",
                EmailAddress: "another@test.com"
            }
        ]);
    });

    test("Return_OnePostbyId_With200Status", async() =>{

        const user = {
            id: "01a18724-66dd-73d4-8c1c-8abbd5fa45f9",
            UserName: "TestUser",
            AvatarName: "TestName",
            AccountType: "unverified",
            EmailAddress: "test@test.com",
        };

        const req = {params:{
            id: user.id
        }} as unknown as Request

        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        mocks.findByPk.mockResolvedValue(user);

        await _UserController.getById(req, res);

        expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(user.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(user);
    });

    test("Return_CreatedPost_With201Status", async () =>{
        const id = "7bef1e04-e5a2-4671-bff4-51588445b176"
        mocks.create.mockResolvedValue({ id: id})
        const req = {
            protocol: "http",
            get: vi.fn(() => "localhost:8080"),
            body: {
                UserName: "TestUser",
                AvatarName: "TestName",
                EmailAddress: "test@test.com",
            }
        } as unknown as Request;
        const res = {
            location: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as Response


        //tegevus
        await _UserController.create(req,res)

        //CHECKITY CHECK DIS SHIZ
        expect(mocks.create).toHaveBeenCalledOnce()
        expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/users/${id}`)
        expect(res.sendStatus).toHaveBeenCalledWith(201)
    })

    test("ReturnModifiedUserById_With201Status", async()=>{
        const id = "7bef1e04-e5a2-4671-bff4-51588445b176";

        const user = {
            id: id,
            UserName: "OldUsername",
            AvatarName: "avatarName",
            SignupDate: "2026-01-01",
            AccountType: "unverified",
            EmailAddress: "test@test.com",
            UserCollectionID: null,
            ReviewListID: null,
            ProfileID: null,
            CredentialID: null,
            createdAt: new Date()
        };

        mocks.findByPk.mockResolvedValue(user);

        mocks.update.mockResolvedValue([1]);

        const req ={
            id: "7bef1e04-e5a2-4671-bff4-51588445b176",
            UserName: "NewUsername",
            AvatarName: "testName",
            SignupDate: "2026-01-01",
            AccountType: "verified",
            EmailAddress: "test@test.com",
            ReleaseDate:new Date(),
            createdAt:new Date(),
            updatedAt:new Date()
        } as unknown as Request
        const res= {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response


        await _UserController.modifyById(req,res)

        expect(mocks.findByPk).toHaveBeenCalledWith(user.id)
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
                id: user.id
            }}
        )
        expect(res.status).toHaveBeenCalledWith(201)
    })
    test("Return_NoContentOnDelete_With204Status", async() => {
        const thisid = "01a18e66-5fdb-73f6-9f36-fec1238c7d30"
        const user = {
            id: thisid,
            destroy: vi.fn().mockResolvedValue(undefined)
        }
        mocks.findByPk.mockResolvedValue(user)
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
        await _UserController.deleteById(req, res)

        //kontroll
        expect(mocks.findByPk).toHaveBeenCalledWith(thisid)
        expect(user.destroy).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(204);
    })
});
