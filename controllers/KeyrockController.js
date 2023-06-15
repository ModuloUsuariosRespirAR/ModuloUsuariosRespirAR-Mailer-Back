import {KeyrockService} from "../service/KeyrockService.js";

export class KeyrockController {

    static async changePassword(req, res) {
        const { id,password } = req.body;
        let result = await KeyrockService.changePassword(id,password);
        res.send(result);
    }
    static async activateUser(req, res) {
        const { id } = req.body;
        let result = await KeyrockService.activateUser(id);
        res.send(result);
    }
}