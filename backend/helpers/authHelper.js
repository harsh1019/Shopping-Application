import bcrypt from "bcrypt";

export const hashPassword = async (pass) => {

    try{
        const saltRounds = 10; 
        const hashed = await bcrypt.hash(pass,saltRounds);
        return hashed;
    }catch(err){
        console.log(err);
    }
}

export const compare = async (pass,hashedpass) => {
    return bcrypt.compare(pass,hashedpass);
};