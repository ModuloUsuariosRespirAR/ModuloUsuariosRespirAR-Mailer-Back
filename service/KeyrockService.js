import axios from 'axios';
import dotenv from 'dotenv';
import { Constants } from "../utils/Constants.js";
import { AuthKeyRockModel } from "../models/AuthKeyRockModel.js";
import {EmailService} from "./EmailService.js";
import {Msg} from "../models/MsgModel.js";

dotenv.config();

export class KeyrockService {
    static async changePassword(id,password) {
        try {
            const auth = await this.authKeyRock();
            const updateData = { password: password };
            const message = await this.updateUser(id,auth,updateData);
            console.log("changePassword:",message);
            return message;
        } catch (error) {
            console.error("changePassword:",error);
        }
    }

    static async activateUser(id) {
        try {
            const auth = await this.authKeyRock();
            const user = await this.findUserById(auth,id)
            if (user !== undefined) {
                if(user.enabled === false){
                    const updateData = { enabled: true};
                    const message = await this.updateUser(id,auth,updateData);
                    console.log("activateUser:",message);
                    return Constants.USER_ACTIVE;
                }else{
                    return Constants.USER_ALREADY_ACTIVE;
                }
            } else {
                return Constants.USER_DONT_FOUND;
            }
        } catch (error) {
            console.error("activateUser:",error);
        }
    }

    static async updateUser(id, auth, updateData) {
        try {
            const response = await axios.put(`${process.env.HTTP_HOST}:${process.env.BACK_PORT}/users/update/${id}`, {
                user: updateData
            }, {
                headers: {
                    "X-Auth-token": auth.authToken,
                    "accessToken": auth.accessToken
                }
            });
            return response.data;
        } catch (error) {
            console.log('updateUser:', error);
        }
    }

    static async authKeyRock() {
        try {
            const response = await axios.post(`${process.env.HTTP_HOST}:${process.env.BACK_PORT}/login`, {
                username: process.env.KEYROCK_USERNAME,
                password: process.env.KEYROCK_PASSWORD
            });
            return new AuthKeyRockModel(response.data.accessToken, response.data['X-Auth-token']);
        } catch (error) {
            console.error(error);
        }
    }

    static async findUserById(auth,id) {
        try {
            const response = await axios.get(`${process.env.HTTP_HOST}:${process.env.BACK_PORT}/users/user/${id}`, {
                headers: {
                    "X-Auth-token": auth.authToken,
                }
            });
            return response.data.user;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.error('Usuario no encontrado:', id);
                return undefined;
            } else {
                console.error('findUserById:', error);
            }
        }
    }

    static async findUsers(auth) {
        try {
            const response = await axios.get(`${process.env.HTTP_HOST}:${process.env.BACK_PORT}/users/list`, {
                headers: {
                    "X-Auth-token": auth.authToken,
                }
            });
            return response.data.users;
        } catch (error) {
            console.error('findUsers:', error);
        }
    }
    static async findUserByEmailAndSendEmail(email) {
        try {
            const auth = await this.authKeyRock();
            const users = await this.findUsers(auth);
            const user = users.find(user => user.email === email);
            if (user) {
                console.log('Usuario encontrado:', user);
                return await EmailService.sendEmail(new Msg(user.email,process.env.EMAIL ,Constants.SUBJECT_CHANGE_PASSWORD, Constants.GENERATE_TEXT_CHANGE_PASSWORD(`${process.env.HTTP_HOST_FRONT}:${process.env.FRONT_PORT}/pages/modify-password/${user.id}`)));
            } else {
                console.log(Constants.GENERATE_EMAIL_NOT_FOUND(email));
                return Constants.GENERATE_EMAIL_NOT_FOUND(email)
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }    static async findUserByIdAndSendEmail(id) {
        try {
            const auth = await this.authKeyRock();
            const user = await this.findUserById(auth,id);
            console.log(user);
            if (user !== undefined) {
                console.log('Usuario encontrado:', user);
                return await EmailService.sendEmail(new Msg(user.email,process.env.EMAIL ,Constants.SUBJECT_ACTIVE_USER, Constants.GENERATE_TEXT_ACTIVE_USER(`${process.env.HTTP_HOST_FRONT}:${process.env.FRONT_PORT}/pages/activate-user/${user.id}`)));
            } else {
                return Constants.USER_DONT_FOUND;
            }
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

}
