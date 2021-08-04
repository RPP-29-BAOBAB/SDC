import React from 'react';
import roundByIncrement from '../../model/Calcs';
import './starRating.css';
// import starRatings0 from '../../../assets/images/starRatings-0.png';
// import starRatings25 from '../../../assets/images/starRatings-25.png';
// import starRatings50 from '../../../assets/images/starRatings-50.png';
// import starRatings75 from '../../../assets/images/starRatings-75.png';
// import starRatings100 from '../../../assets/images/starRatings-100.png';

// props: rating, max, callback
class StarRating extends React.Component {
  constructor(props) {
    super(props);

    this.maxStars = props.max ? props.max : 5;
    this.isClickable = (props.callback !== undefined);

    const rating = props.rating ? props.rating : 0;
    console.log('Rendering Star Rating');
    this.state = {
      currentRating: Math.min(rating, this.maxStars)
    };

    this.getStarsEmpty = this.getStarsEmpty.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  getImage(rating) {
    return `assets/images/starRatings-${rating}.png`;
    // if (rating === 0) {
    //   return starRatings0;
    // } else if (rating === 25) {
    //   return starRatings25;
    // } else if (rating === 50) {
    //   return starRatings50;
    // } else if (rating === 75) {
    //   return starRatings75;
    // } else if (rating === 100) {
    //   return starRatings100;
    // } else {
    //   return null;
    // }
  }

  getStarsFull(rating) {
    const ratingInteger = Math.floor(rating);
    const starsFull = [];
    for (let i = 0; i < ratingInteger; i++) {
      starsFull.push(i);
    }
    return starsFull;
  }

  getStarsEmpty(rating) {
    const ratingEmpty = this.maxStars - Math.ceil(rating);
    const starsEmpty = [];
    for (let i = 0; i < ratingEmpty; i++) {
      starsEmpty.push(i);
    }
    return starsEmpty;
  }

  getStarClasses(isClickable) {
    let imgClass = 'star';
    if (isClickable) {
      imgClass += ' clickable';
    }
    return imgClass;
  }

  handleMouseOver(e) {
    const rating = e?.target?.dataset?.rating;
    console.log('rating: ', rating);
    if (rating && rating !== this.state.currentRating) {
      console.log('Rating:', rating);
      this.setState({
        currentRating: rating
      });
    }
  }

  handleMouseOut() {
    const rating = this.props.rating ? this.props.rating : 0;
    this.setState({
      currentRating: rating
    });
  }

  render() {
    const starsFull = this.getStarsFull(this.state.currentRating);
    const starsEmpty = this.getStarsEmpty(this.state.currentRating);
    const ratingDecimalRounded25 = roundByIncrement(this.state.currentRating, 25) * 100;

    const imgClass = this.getStarClasses(this.isClickable);
    const callback = this.isClickable ? this.props.callback : () => {};
    const mouseOver = this.isClickable ? this.handleMouseOver : () => {};
    const mouseOut = this.isClickable ? this.handleMouseOut : () => {};

    let key = 0;
    return (
      <div class="star-rating" onMouseOut={mouseOut}>
        {
          starsFull.map(() =>
            <img
              key={key++}
              src={this.getImage(100)}
              class={imgClass}
              data-rating={key}
              onClick={callback}
              onMouseOver={mouseOver}
            ></img>
          )
        }
        {
          ratingDecimalRounded25 > 0 &&
          <img
            key={key++}
            src={this.getImage(ratingDecimalRounded25)}
            class={imgClass}
          ></img>
        }
        {
          starsEmpty.map(() =>
            <img
              key={key++}
              src={this.getImage(0)}
              class={imgClass}
              data-rating={key}
              onClick={callback}
              onMouseOver={mouseOver}
            ></img>
          )
        }
      </div>
    );
  }
}

export default StarRating;