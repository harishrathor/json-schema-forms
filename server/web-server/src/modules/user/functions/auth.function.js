export default function isAuthorizedUser(req, res) {
    return req.session && !!req.session.username;
}