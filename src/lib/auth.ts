import NextAuth from "next-auth"
import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import dbConnnet from "@/lib/database"
import { UserModel } from "@/lib/models/UserModel";
import bcrypt from "bcrypt";

export const authOptions: NextAuthConfig = {
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username", type:"text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any, req): Promise<any> {
                await dbConnnet(); 

                try {
                    const user = await UserModel.findOne({ 
                        $or : [ 
                            {username:credentials.identifier },
                            {email:credentials.identifier }
                        ]
                    })

                    if(!user) { 
                        throw new Error("Invalid Credentials: User Dosn't Exists ")
                    }

                    if(!user.isVerified) { 
                        throw new Error("Please verify your account before logging in!")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password )

                    if(!isPasswordCorrect) { 
                        throw new Error("Invalid Username/Password")
                    }
                    
                    return user; 

                } catch (error:any) {
                    throw new Error(error?.message)
                }
            },
        }),
    ],
    callbacks: {
        async session({ 
            session, token
        }) {
            if(token) { 
                session.user._id = token._id?.toString();
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
            }
            return session
        }, 
        async jwt({ token, user}) {
            if(user){
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
            }   

            return token
        }
    },
    pages: {
        signIn: "/sign-in"
    },
    secret: process.env.AUTH_SECRET,
    session: {
        strategy: "jwt"
    }
}
export const { handlers , signIn, signOut, auth} = NextAuth(authOptions)