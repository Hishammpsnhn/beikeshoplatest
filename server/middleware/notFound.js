// middleware/notFound.js
export default function notFound(req, res, next) {
    res.status(404).send('404 Not found');
}