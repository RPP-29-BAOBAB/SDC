import React from 'react';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const RatingList = (props) => {
  const { reviews, ratings, characteristics, recommended, handleRatingProgressFilter, ratingDetails } = props;

  return (
    <div id='rating-list'>
      <RatingBreakdown
        ratings={ratings}
        ratingDetails={ratingDetails}
        averageRating={props.averageRating}
        totalRating={props.totalRating}
        reviews={reviews}
        recommended={recommended}
        handleRatingProgressFilter={handleRatingProgressFilter}
      />
      <br></br>
      <ProductBreakdown
        characteristics={characteristics}
      />
    </div>
  );
};

export default RatingList;