import { userAccountStatus } from "../global/userAccountStatus";
import { DB } from "../lib/db";
import { IUser } from "../types/User";


const userSchema = new DB.Schema({
    name: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: "assets/user.png"
    },
    password: String,
    email: {
        type: String,
        index: {
            unique: true,
        }
    },
    status: {
        type: Number,
        default: userAccountStatus.INACTIVE,
    },
    coins: {
        type: Number,
        default: 0,

    }
}, { autoCreate: true, autoIndex: true, timestamps: true })

export const userModel = DB.model<IUser & Document>('users', userSchema)
