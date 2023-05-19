const {query} = require('../../modules/db');
const {nanoid} = require('nanoid');

const post = async (req, res) => {
    let url = req.body.url;

    if (url.toLowerCase().includes('urls.cl')) {
        return Promise.reject('Are you kidding me?');
    }

    let slug = nanoid(Math.floor(Math.random() * (7 - 3) + 3));
    try {
        let shrt = await query('SELECT * FROM slugs WHERE slug = ?', [slug])
        if (shrt.length != 0) {
            slug = nanoid(Math.floor(Math.random() * (7 - 3) + 3));
        }
    }
    catch (error) {
        console.log(error)
    }

    try {
        let shrt = await query('INSERT INTO slugs (slug, url) VALUES (?, ?)', [slug, url])
        res.status(200).json({ slug: slug, url: url })
        return;
    }
    catch (error) {
        console.log(error)
    }


    res.status(500).json({ error: 'Something went wrong' })


}

module.exports = {
    post
}
