// src/components/reviews/reviews.tsx

import React from 'react';

interface Review {
  id: number;
  title: string;
  rating: number;
  comment: string;
}

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} className="review">
          <h3>{review.title}</h3>
          <p>Rating: {review.rating}</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
