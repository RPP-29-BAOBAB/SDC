import React from 'react';
import ProductCompare from './ProductCompare.jsx';
import ProductsCarousel from './ProductsCarousel.jsx';
import Outfit from './Outfit.jsx';
import axios from 'axios';
import '../css/RelatedProducts.css';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);

    this.selectProduct = this.selectProduct.bind(this);
    this.compareProduct = this.compareProduct.bind(this);

    this.state = {
      selectedId: null,
      related: [],
      compareTo: null
    };
  }

  collectRelatedProducts(product) {
    this.fetchRelatedIds(product, (ids) => {
      this.collectProductsById(ids);
    });
  }

  fetchRelatedIds(product, callback = () => {}) {
    const id = product.id;
    const { checkCache, updateCache } = this.props;
    let ids = checkCache('relatedIds', id);

    if (ids) {
      callback(ids);
    } else {
      axios.get(`/products/${id}/related`)
        .then(res => {
          ids = Array.from(new Set(res.data));
          updateCache('relatedIds', id, ids);
          callback(ids);
        })
        .catch(err => {
          console.log(err.stack);
        });
    }
  }

  selectProduct(product) {
    this.setState({compareTo: null}, () => {
      this.props.selectProduct(product);
    });
  }

  compareProduct(productId) {
    if (productId) {
      const product = this.props.checkCache('products', productId);
      this.setState({ compareTo: product });
    } else {
      this.setState({ compareTo: null });
    }
  }

  componentDidMount() {
    this.fetchRelatedIds(this.props.selectedProduct, (ids) => {
      this.setState({
        selectedId: this.props.selectedProduct.id,
        related: ids
      });
    });
  }

  componentDidUpdate() {
    const { selectedProduct } = this.props;
    const matchId = selectedProduct.id;
    if (this.state.selectedId !== matchId) {
      this.setState({ selectedId: matchId });
      this.fetchRelatedIds(selectedProduct, (ids) => {
        this.setState({ related: ids });
      });
    }
  }

  render() {
    const { compareProduct } = this;
    const { related, outfit, compareTo } = this.state;
    const { selectedProduct, selectProduct, checkCache, updateCache } = this.props;

    return (
      <div id='RelatedProducts' >
        <ProductsCarousel
          productIds={ related }
          selectedProduct={ selectedProduct }
          selectProduct={ selectProduct }
          checkCache={ checkCache }
          updateCache={ updateCache }
          compare={compareProduct}
        />
        <Outfit
          selectedProduct={ selectedProduct }
          selectProduct={ selectProduct }
          checkCache={ checkCache }
          updateCache={ updateCache }
        />
        <ProductCompare
          selectedProduct={selectedProduct}
          compareTo={compareTo}
          resetCompare={compareProduct}
          checkCache={checkCache}
          updateCache={updateCache}
        />
      </div>
    );
  }
}

export default RelatedProducts;
