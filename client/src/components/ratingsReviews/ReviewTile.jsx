import React from 'react';
import Helpfulness from '../shared/Helpfulness.jsx';
import Report from '../shared/Report.jsx';
import StarRating from '../shared/StarRating.jsx';
import DisplayPhotos from '../shared/DisplayPhotos.jsx';
import './reviewTile.css';

const ReviewTile = (props) => {
  const { reviews, averageRating } = props;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let key = 0;

  return reviews ? (
    <div className='rr-review-tile'>
      {reviews.map((review) => (
        <div className='rr-tile' key={key++}>
          <div className='rr-user-stamp'>
            <span className='rr-star-rating'>
              <StarRating rating={averageRating} max={5} />
            </span>
            <span className='rr-review-date'>{review.reviewer_name}, {new Date(review.date).toLocaleDateString('en-EN', options)}</span>
          </div>
          <br></br>
          <div className='rr-review'>
            <div className='rr-review-summary'>{review.summary}</div>
            <br></br>
            <div className='rr-review-body'>{review.body}</div>
            <br></br>
            {review.photos.length > 0 ?
              <div id='rr-review-photos' className='rr-review-photos'>
                <DisplayPhotos photos={review.photos} />
              </div> : null}
            {review.recommend ?
              <div className='rr-review-recommend'>&#10003; I recommend this product!</div>
              : null
            }
            {review.response ?
              <div>
                <br></br>
                <div className='rr-review-response'>
                  <div className='rr-review-response title'>Response from seller</div>
                  <div className='rr-review-response text'>{review.response}</div>
                </div>
              </div>
              : null
            }
            <br></br>
            <div className='rr-review-feedback'>
              <Helpfulness review={review} />
              <span> | </span>
              <Report reviewId={review.review_id} />
              <hr></hr>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
    : (null);
};

export default ReviewTile;