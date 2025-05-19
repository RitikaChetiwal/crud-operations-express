const express = require('express');
const members = require('./members');
const uuid = require('uuid');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello crud!')
});

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

// POST REQUEST ------------------------------------------->
app.post("/postUser", (req, res) => {
    // console.log("User : ", req.body);
    // const name = req.body.name;
    // const email = req.body.email;

    const { name, email } = req.body;
    // console.log(name, email)

    members.push({
        id: uuid.v4(),
        name,
        email
    })
    res.status(200).json(members);

});

// DELETE REQUEST ------------------------------------------------->
app.delete("/deleteUser/:uid", (req, res) => {
    const userId = parseInt(req.params.uid);
    // console.log(id)
    const found = members.some(member => member.id === userId);

    if (found) {
        const updatedMember = members.filter(member => member.id !== userId);
        res.status(200).json(updatedMember);

    } else {
        res.status(400).json({ message: `User not found with id ${userId}` })
    }
})

// PUT REQUEST ---------------------------------------------------->
app.put("/updateUser/:uid", (req, res) => {
    const userId = parseInt(req.params.uid)
    const found = members.some(member => member.id === userId)
    // console.log(found)

    if (found) {
        const updateMember = req.body;
        // console.log(updateMember)
        members.forEach(member => {
            if (member.id ===  userId){
                member.name = updateMember.name
                member.email = updateMember.email
            }
        })
        res.status(200).json(members)
        
    } else {
        res.status(404).json({message: "User not found!!"})
    }
})

app.listen(port, () => {
    console.log(`server is running at port:${port}`);
    
})