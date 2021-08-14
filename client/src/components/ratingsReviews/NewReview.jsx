import React from 'react';
import './newReview.css';

const NewReview = (props) => {
  const { reviews } = props;

  const handleAddReview = () => {
    console.log('Add Clicked');
  };

  return (
    <div id='rr-new-review'>
      <div id='rr-add-review' class='button uppercase' onClick={handleAddReview}>ADD A REVIEW<div class='plus'>+</div></div>
    </div>
  );
};

export default NewReview;