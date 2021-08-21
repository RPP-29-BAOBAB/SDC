/* eslint-disable camelcase */
import React from 'react';
import Sort from './Sort.jsx';
import ReviewTile from './ReviewTile.jsx';
import NewReview from './NewReview.jsx';
import KeywordSearch from './KeywordSearch.jsx';
import './reviewsList.css';

const ReviewsList = (props) => {
  const {
    characteristics,
    callback,
    averageRating,
    selectedProduct,
    loadMoreReviews,
    displayedReviews,
    reviewsLength,
    count,
    reviews,
    sortOptions,
    handleReviewSort,
    expanded,
    expandBody,
    getReviews,
    getRatings
  } = props;

  const handleMoreReviews = () => {
    loadMoreReviews();
  };

  return (
    <div id='rr-reviews-list'>
      <Sort
        reviews={displayedReviews}
        fullReviews={reviews}
        sortOptions={sortOptions}
        handleReviewSort={handleReviewSort} />

      <KeywordSearch
        reviews={reviews}
        callback={callback} />

      {reviews ?
        <div className='rr-displayed-reviews'>
          <ReviewTile
            reviews={displayedReviews}
            fullReviews={reviews}
            averageRating={averageRating}
            expanded={expanded}
            expandBody={expandBody} />
        </div>
        : null}
      <div className='rr-review-buttons'>
        {count < reviewsLength ?
          <div className='rr-more-reviews button uppercase' onClick={handleMoreReviews}>MORE REVIEWS</div>
          : null
        }
        <NewReview
          reviews={reviews}
          selectedProduct={selectedProduct}
          characteristics={characteristics}
          getReviews={getReviews}
          getRatings={getRatings}
        />
      </div>
    </div>
  );
};

export default ReviewsList;