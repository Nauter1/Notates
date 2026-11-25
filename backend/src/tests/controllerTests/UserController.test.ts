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
        users: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
            update: mocks.update,
            destroy: mocks.destroy
        }
    }
}));

import _UserController from "../../controllers/UserController.ts"
import type { User } from "../../models/User.ts";

describe("UserController", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("Return_AllUsers_With200Status", async () => {
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

    test("Return_OneUserbyId_With200Status", async() =>{

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

    test("Return_CreatedUser_With201Status", async () =>{
        const id = "7bef1e04-e5a2-4671-bff4-51588445b176"
        mocks.create.mockResolvedValue({ id: id})
        const req = {
            protocol: "http",
            get: vi.fn(() => "localhost:8080"),
            body: {
                UserName: "TestUser2",
                AvatarName: "TestName",
                EmailAddress: "test@test.com",
                Password: "Tester",
                PasswordConfirmation: "Tester"
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

    /*test("ReturnModifiedUserById_With201Status", async()=>{
        const id = "7bef1e04-e5a2-4671-bff4-51588445b176";
        const now = new Date()

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
            createdAt: now
        };

        mocks.findByPk.mockResolvedValue(user);

        mocks.update.mockResolvedValue([1]);

        const req ={
            params: {
                id: id
            },
            body:{
                id: id,
                UserName: "NewUsername",
                AvatarName: "testName",
                SignupDate: "2026-01-01",
                AccountType: "verified",
                EmailAddress: "test@test.com",
                ReleaseDate: now,
                createdAt: now,
                updatedAt: now,
            }

        } as unknown as Request
        const res= {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response


        await _UserController.modifyById(req,res)

        expect(mocks.findByPk).toHaveBeenCalledWith(id)
        expect(mocks.update).toHaveBeenCalledOnce()
        expect(mocks.update).toHaveBeenCalledWith(
            expect.objectContaining({
                id: id,
                UserName: "NewUsername",
                AvatarName: "testName",
                SignupDate: "2026-01-01",
                AccountType: "verified",
                EmailAddress: "test@test.com",
                ReleaseDate: now,
                createdAt: now,
                updatedAt: now,
            }),
            {where:{
                id: user.id
            }}
        )
        expect(res.status).toHaveBeenCalledWith(201)
    })*/

   /* test("Return_ModifiedUserById_With201Status", async() => {
        mocks.findByPk.mockResolvedValue({ id: "7bef1e04-e5a2-4671-bff4-51588445b176"})
        const id = "7bef1e04-e5a2-4671-bff4-51588445b176";
        const now = new Date()
        const user = 
        {
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
            createdAt: now
        }
        const explicitTime = new Date()
        mocks.update.mockResolvedValue([1])
        const req = {
            protocol: "http",
            get: vi.fn(()=>"localhost:8080"),
            params: {
                id: id,
            },
            body:        
            {
                id: id,
                UserName: "NewUsername",
                AvatarName: "testName",
                SignupDate: "2026-01-01",
                AccountType: "verified",
                EmailAddress: "test@test.com",
                ReleaseDate: now,
                createdAt: now,
                updatedAt: now,
            }
        } as unknown as Request
        const res = {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response

        //äkshun
        const result = await _UserController.modifyById(req, res) as unknown as User

        //kontroll
        expect(mocks.findByPk).toHaveBeenCalledWith(user.id)
        expect(mocks.update).toHaveBeenCalledOnce()

        const updatedUser = mocks.update.mock.calls[0]?.[0]
        console.log("updatedUser: "+updatedUser)
        //expect(updatedUser.id).toBe(user.id)
        expect(updatedUser.UserName).toBe(req.body.UserName)
        expect(updatedUser.id).toBe(req.body.id)
        expect(updatedUser.AvatarName).toBe(req.body.AvatarName)
        expect(updatedUser.SignupDate).toBe(req.body.SignupDate)
        expect(updatedUser.AccountType).toBe(req.body.AccountType)
        expect(updatedUser.EmailAddress).toBe(req.body.EmailAddress)
        expect(updatedUser.ReleaseDate).toBe(req.body.ReleaseDate)
        expect(updatedUser.createdAt).toBe(req.body.createdAt)
        expect(updatedUser.updatedAt).toBe(req.body.updatedAt)
        expect(updatedUser.updatedAt).toBeInstanceOf(Date)
        //console.log("call log:"+mocks.update.mock.calls[0])
        expect(mocks.update.mock.calls[0]?.[1]).toEqual({
            where: {
                id: user.id
            }
        })
        expect(res.status).toHaveBeenCalledWith(201)
    })*/
    
    
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
