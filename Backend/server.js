import express from 'express'

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) =>{
res.send('Hi, SWAPAN');
return;
})

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
})