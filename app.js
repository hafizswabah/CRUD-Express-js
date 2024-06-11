const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let items = [];

// Get all items
app.get('/items', (req, res) => {
    if(items.length===0){
        res.json("Nothing added to the list please add something to the list")
    }else{
        res.json(items);
    }
});

// Add a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        ...req.body
    };
    items.push(newItem);
    res.status(201).json({newItem,message:"Succefully added new item to the list"});
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    items[itemIndex] = {
        id,
        ...req.body
    };
    res.json(items[itemIndex]);
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    items.splice(itemIndex, 1);
    res.status(204).json({message:`succesfully deleted the item with id ${id}`});
});

// Handle 404 - Not Found
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
