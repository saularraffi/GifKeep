const express = require("express");
const danceNoteService = require("../services/danceNoteService.js");
const router = express.Router();

const endpoint = "/api/dancenotes";

const getAllDanceNotes = (res) => {
    danceNoteService
        .getDanceNotes()
        .then((danceNotes) => {
            res.status(200);
            res.send(danceNotes);
        })
        .catch((err) => {
            console.log(`[-] Error fetching dance note\n${err}`);
            res.status(500);
            res.send("Error fetching dance notes");
        });
};

const getDanceNotesByCategory = (res, category) => {
    danceNoteService
        .getDanceNotesByCategory(category)
        .then((danceNotes) => {
            res.status(200);
            res.send(danceNotes);
        })
        .catch((err) => {
            console.log(`[-] Error fetching dance note\n${err}`);
            res.status(500);
            res.send("Error fetching dance notes");
        });
};

router.get(endpoint, async (req, res) => {
    const { category } = req.query;

    if (category !== undefined) {
        getDanceNotesByCategory(res, category);
    } else {
        getAllDanceNotes(res);
    }
});

router.post(endpoint, async (req, res) => {
    const { note } = req.body;
    const { category } = req.body;
    const { videoUrl } = req.body;

    danceNoteService
        .saveDanceNote(note, category, videoUrl)
        .then((danceNote) => {
            res.status(200);
            res.send(danceNote);
        })
        .catch((err) => {
            console.log(`[-] Error saving dance note\n${err}`);
            res.status(500);
            res.send("Error saving dance note");
        });
});

router.delete(endpoint, async (req, res) => {
    const id = req.query.id;

    danceNoteService
        .deleteDanceNote(id)
        .then(() => {
            res.status(200);
            res.send(id);
        })
        .catch((err) => {
            console.log(`[-] Error deleting dance Note with id ${id}\n${err}`);
            res.status(500);
            res.send(`Error deleting dance Note with id ${id}`);
        });
});

router.put(endpoint, async (req, res) => {
    const { id } = req.body;
    const { note } = req.body;
    const { category } = req.body;
    const { videoUrl } = req.body;

    danceNoteService
        .updateDanceNote(id, note, category, videoUrl)
        .then((danceNote) => {
            res.status(200);
            res.send(danceNote);
        })
        .catch((err) => {
            console.log(`[-] Error updating dance Note with id ${id}\n${err}`);
            res.status(500);
            res.send(`Error updating dance Note with id ${id}`);
        });
});

module.exports = router;
