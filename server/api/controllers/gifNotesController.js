const express = require("express")
const gifNotesService = require("../services/gifNotesService.js")
const router = express.Router()

const endpoint = "/api/gifnotes"

router.get(endpoint, async (req, res) => {
    gifNotesService.getGifNotes()
    .then(gifNotes => {
        res.status(200);
        res.send(gifNotes);
    })
    .catch(err => {
        console.log(`[-] Error fetching GIF note\n${err}`);
        res.status(500);
        res.send("Error fetching GIF notes");
    })
})

router.post(endpoint, async (req, res) => {
    const note = req.body.note;
    const category = req.body.category;
    const gifUrl = req.body.gifUrl;

    gifNotesService.saveGifNote(note, category, gifUrl)
    .then(gifNote => {
        res.status(200);
        res.send(gifNote);
    })
    .catch(err => {
        console.log(`[-] Error saving GIF note\n${err}`);
        res.status(500);
        res.send("Error saving GIF note");
    });
})

router.delete(endpoint, async (req, res) => {
    const id = req.query.id;

    gifNotesService.deleteGifNote(id)
    .then(() => {
        res.status(200);
        res.send(id);
    })
    .catch(err => {
        console.log(`[-] Error deleting GIF Note with id ${id}\n${err}`);
        res.status(500);
        res.send(`Error deleting GIF Note with id ${id}`);
    })
})

module.exports = router