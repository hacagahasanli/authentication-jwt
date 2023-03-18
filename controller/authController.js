class AuthController {
    async registration() {
        try {

        } catch (err) {
            console.log(err);

        }
    }
    async login() {
        try {

        } catch (err) {
            console.log(err);

        }
    }
    async getUsers(req, res) {
        try {
            res.json('server work')
        } catch (err) {
            console.log(err);

        }
    }
}

export default new AuthController()