import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';

import QA from './components/QA/QA.jsx';

import RelatedProducts from './components/related/RelatedProducts.jsx';
import RatingsAndReviews from './components/ratingsReviews/RatingsAndReviews.jsx';
import ProductOverview from './components/overview/ProductOverview';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.selectProduct = this.selectProduct.bind(this);
    this.checkCache = this.checkCache.bind(this);
    this.updateCache = this.updateCache.bind(this);
    this.updateReviews = this.updateReviews.bind(this);
    this.updateRatings = this.updateRatings.bind(this);


    this.cache = {
      imageURLs: new Map(),
      products: new Map(),
      questions: new Map(),
      ratings: new Map(),
      relatedIds: new Map(),
      styles: new Map(),
    };

    this.state = {
      ready: false,
      selectedProduct: null,
      selectedProductRating: { ratingsCount: undefined, avgRating: undefined, ratings: [] },
      selectedProductReviews: [],
      selectedProductImageURLs: [],
      selectedProductThumbnailURLs: []
    };
  }

  selectProduct(product) {
    if (this.state.selectedProduct.id !== product.id) {
      // const product = this.checkCache('products', productId);
      if (product) {
        console.log(`${product.name} selected`);
        this.setState({
          selectedProduct: product
        });
      }
    }
  }

  checkCache(cacheName, productId) {
    return this.cache[cacheName].get(productId);
  }

  updateCache(cacheName, productId, data) {
    this.cache[cacheName].set(productId, data);
  }

  updateReviews(reviews) {
    this.setState({
      selectedProductReviews: reviews,
    }, () => {
      console.log('Reviews State: ', this.state.selectedProductReviews);
    });
  }

  updateRatings(ratings, characteristics, recommended, averageRating, totalRating) {
    this.setState({
      selectedProductRating: { ratingsCount: totalRating, avgRating: averageRating, ratings: ratings },
    }, () => (
      console.log('Ratings State: ', this.state.selectedProductRating)
    ));
  }


  componentDidMount() {
    axios.get('/products?page=1&count=1')
      .then(res => {
        console.log(res.data);
        const product = res.data[0];
        this.cache.products.set(product.id, product);
        this.setState({
          selectedProduct: product,
          ready: true
        });
      });
  }

  componentDidMount() {
    axios.get('/products')
      .then(res => {
        const products = res.data;
        const randomSelect = Math.round(Math.random() * products.length);
        const selectedId = products[randomSelect].id;
        this.getSelectedData(selectedId);
      });
  }

  render() {
    const { products, selectedProduct, ready } = this.state;
    if (ready) {
      console.log('select product', selectedProduct.id);

    }
    let key = 0;
    return ready ? (
      <React.Fragment>
        <ProductOverview
          selectedProduct={selectedProduct}
          isTesting={this.props.isTesting}
        />
        <RelatedProducts
          selectedProduct={selectedProduct}
          selectProduct={this.selectProduct}
          checkCache={this.checkCache}
          updateCache={this.updateCache}

        />
        <QA selectedProduct={selectedProduct} />
        <br></br>
        <RatingsAndReviews
          reviews={this.state.reviews}
          ratings={this.state.ratings}
          selectedProduct={selectedProduct}
          updateReviews={this.updateReviews}
          updateRatings={this.updateRatings} />
      </React.Fragment>
    ) : (
      <p>Loading...</p>
    );
  }
}

export default App;

const div = document.createElement('div');
div.setAttribute('id', 'App');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
