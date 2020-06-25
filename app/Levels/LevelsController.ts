export class LevelsController {
    /**
     * Show the current Level. todo types
     */
    public read = (req, res) => {
        return res.jsonp(req.level);
    }
}