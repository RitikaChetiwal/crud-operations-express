const express = require('express');
const app = express();
const port = 3000;

const members = [
    {
        id: 1,
        name: "John Doe",
        email: "john@gmail.com",
        status: "active",
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "jane@gmail.com",
        status: "inactive",
    },
    {
        id: 3,
        name: "steve",
        email: "steve@gmail.com",
        status: "active",
    },
]

app.get('/', (req, res) => {
    res.send('Hello Home!')
})

// GET REQUEST------------------------

app.get("/getAllUsers", (req, res) => {
    res.status(200).json(members);
    res.json({ status: 'success', data: members });
})

app.get("/getUser/:uid", (req, res) => {
    // console.log(typeof req.params.userId)
    const userId = parseInt(req.params.uid);
    let user = members.filter(member => member.id === userId);
    console.log(user);    // user is an empty array,  
    console.log(members);

    user.length !== 0 ? res.status(200).json(user) : res.status(400).json({ message: `User not found with id ${userId}` });
    // if (user.length !== 0) res.status(200).json(user) 
    //     else res.status(404).json({message : `User not found with id ${id}`})
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
