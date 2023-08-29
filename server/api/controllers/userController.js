const express = require("express");
const userService = require("../services/userService.js");
const router = express.Router();

const endpoint = "/api/users";

router.get(endpoint, async (req, res) => {
    const id = req.query.id;

    userService
        .getUser(id)
        .then((user) => {
            res.status(200);
            res.send(user);
        })
        .catch((err) => {
            console.log(`[-] Error fetching user with id ${id}\n${err}`);
            res.status(500);
            res.send(`Error fetching user with id ${id}`);
        });
});

router.post(endpoint, async (req, res) => {
    const { username } = req.body;

    userService
        .saveUser(username, [])
        .then((user) => {
            res.status(200);
            res.send(user);
        })
        .catch((err) => {
            console.log(`[-] Error saving user\n${err}`);
            res.status(500);
            res.send("Error saving user");
        });
});

router.put(endpoint, async (req, res) => {
    const { id } = req.body;
    const { username } = req.body;
    const { categories } = req.body;

    userService
        .updateUser(id, username, categories)
        .then((user) => {
            res.status(200);
            res.send(user);
        })
        .catch((err) => {
            console.log(`[-] Error updating user with id ${id}\n${err}`);
            res.status(500);
            res.send(`Error updating user with id ${id}`);
        });
});

module.exports = router;
