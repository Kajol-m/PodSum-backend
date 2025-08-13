const express=require('express');
const cors=require('cors');
require('dotenv').config();

const transcriptRoutes=require('./routes/transcript');

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api',transcriptRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log("API Key:", process.env.OPENAPI_APIKEY);
});