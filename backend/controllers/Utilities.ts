import { Request } from "express";
import bcrypt from "bcrypt";

const Utilities = {
    getBaseURL (req: Request): string{
        return `${req.protocol}://${req.get("host")}`;
    },
    async gimmePassword(password: string): Promise<string>{
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    },
    async lemmeIn(GivenPassword: string, GivenHash: string): Promise<boolean>{
        return await bcrypt.compare(GivenPassword, GivenHash)
    }
}

export default Utilities; 