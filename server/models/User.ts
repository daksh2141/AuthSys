import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });


userSchema.pre('save', async function (this: any) {
   
    if (!this.isModified('password')) return;
    
    try {
       
        this.password = await bcrypt.hash(this.password, 10);
       
    } catch (error: any) {
       
        throw error;
    }
});

export default mongoose.model('User', userSchema);
