export class UsersMiddleware {
    // todo types
    /**
     * Requires a login, but not a specific user's login
     */
    public requiresLogin = (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }

        next();
    }
}
