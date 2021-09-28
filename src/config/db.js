import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(
      'mongodb+srv://teamgeez:teamgeezcrewfinder1@cluster0.7z7ko.mongodb.net/crew_finder?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Database connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

export default connectDatabase;
