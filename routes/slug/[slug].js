const { query } = require('../../modules/db');
const { nanoid } = require('nanoid');

const get = async (req, res) => {
    const { slug } = req.params;
    try {
        let shrt = await query('SELECT * FROM slugs WHERE slug = ?', [slug])
        if (shrt.length != 0) {
            res.status(200).json(shrt[0])
        } else {
            res.status(404).json({ error: 'Slug not found' })
        }
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    get
}