const mongoose = require('mongoose');

const fileschema = new mongoose({
    fileName:{
        type: String
    },
    filePath:{
        type: String
    },
    file:{
        type: String
    }
},
    {
    timestamps: {
        options: {timezone: 'Asia/Kolkata'}
    }
    }
);