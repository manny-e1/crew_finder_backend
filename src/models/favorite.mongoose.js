import mongoose from 'mongoose';

const favoriteSchema = mongoose.Schema(
  {
    auditionPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AuditionPost',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FavoriteModel = mongoose.model('Favorite', favoriteSchema);

export default FavoriteModel;
