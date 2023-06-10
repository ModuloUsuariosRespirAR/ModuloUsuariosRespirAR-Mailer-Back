import axios from 'axios';
import dotenv from 'dotenv';
import { Constants } from "../utils/Constants.js";
import { AuthKeyRockModel } from "../models/AuthKeyRockModel.js";
import {EmailService} from "./EmailService.js";
import {Msg} from "../models/MsgModel.js";

dotenv.config();

export class KeyrockService {
    static async updatePassword(password) {
        try {
            // TODO: lógica
            console.log(Constants.EMAIL_SENT_SUCCESSFULLY);
            return Constants.EMAIL_SENT_SUCCESSFULLY;
        } catch (error) {
            console.error(error);
            throw new Error(Constants.ERROR_SEND_EMAIL);
        }
    }

    static async authKeyRock() {
        try {
            const response = await axios.post('http://localhost:8000/login', {
                // TODO: pasar esto a variables de entorno
                // username: 'admin@test.com',
                // password: '1234'
                username: process.env.KEYROCK_USERNAME,
                password: process.env.KEYROCK_PASSWORD
            });
            return new AuthKeyRockModel(response.data.accessToken, response.data['X-Auth-token']);
        } catch (error) {
            console.error(error);
        }
    }

    static async findUsers(auth) {
        try {
            const response = await axios.get('http://localhost:8000/users/list', {
                headers: {
                    "X-Auth-token": auth.authToken,
                }
            });
            //TODO: modelo response user y userlist
            return response.data.users;
        } catch (error) {
            console.error('findUsers:', error);
        }
    }
    static async findUserByEmail(email) {
        try {
            const auth = await this.authKeyRock();
            console.log("auth", auth);
            const users = await this.findUsers(auth);

            console.log("users:", users);
            const user = users.find(user => user.email === email);
            if (user) {
                console.log('Usuario encontrado:', user);
                return await EmailService.sendEmail(new Msg(user.email,process.env.EMAIL ,Constants.SUBJECT_CHANGE_PASSWORD, Constants.GENERATE_TEXT_CHANGE_PASSWORD(Constants.TEST_URL)));
            } else {
                console.log(Constants.GENERATE_EMAIL_NOT_FOUND(email));
                //devolver mensaje de se envio mail a user o  no se encontro user
                return Constants.GENERATE_EMAIL_NOT_FOUND(email)
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    // static async findUserByEmail(email) {
    //     try {
    //         const auth = await this.authKeyRock();
    //         console.log("auth", auth);
    //         const response = await axios.get('http://localhost:8000/users/list', {
    //             headers: {
    //                 "X-Auth-token": auth.authToken,
    //             },
    //         });
    //
    //         console.log("data", response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error(error);
    //     }
    // }
}
