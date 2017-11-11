import mongoose from 'mongoose';

const Dog = new mongoose.Schema({
    name: String,
    type: String
});

const Dogs = mongoose.model('Dogs', Dog);

export default Dogs;
