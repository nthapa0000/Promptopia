
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import {connectToDB} from '@utils/database'

// NextAuth.js documentation study it once

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            // console.log to check whether you are getting it or not
        })
    ],
    async session({session}){
        // We want data about user everytime to run sesion
        const sessionUser = await User.findOne({
            email: session.user.email
        })
        session.user.id = sessionUser._id.toString();
        return session;
    },
    async signIn({profile}){
        // will also create a new user
        // every next js route is serverless route which means that lamba function opens up only when it is called it means whenever it is called it has to connect to server and make connection to database
        try{
            await connectToDB();

            //check if user already exit and if not create a user and save it to database 
            const userExists = await User.findOne({
               email: profile.email
            })

            // if not create a new user
            if(!userExists){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(" ","").toLowerCase(),
                    image: profile.picture
                })
            }
            return true;
        } catch(error){
            // if not sign in succesfull
            console.log(error);
            return false;
        }
    }
})