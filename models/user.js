const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {type:String, required: true},
    password: {type:String, required: true, select:false}
});

userSchema.methods.encryptPassword = async (password) => {
    let salt = await bcryptjs.genSalt(5);
    let hash = await bcryptjs.hash(password, salt);
    return hash;
};

userSchema.methods.validPassword = async (candidatePassword, password  ) => {
    let result = await bcryptjs.compare(candidatePassword, password);
    return result;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
