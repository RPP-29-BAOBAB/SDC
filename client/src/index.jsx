import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './style.css';
import RelatedProducts from './components/relatedProducts/RelatedProducts.jsx';
import RatingsAndReviews from './components/ratingsReviews/RatingsAndReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleUpdate.bind(this);

    this.state = {
      ready: false,
      products: [],
      selectedProduct: null
    };
  }

  handleUpdate(urlToReload, stateKeyToUpdate) {
    return axios.get(urlToReload)
      .then(res => {
        this.setState({
          [stateKeyToUpdate]: res.data
        });
      })
      .catch(err => {
        console.log(err.stack);
      });
  }

  selectProduct(product) {
    this.setState({
      selectedProduct: product.id
    });
  }

  componentDidMount() {
    this.handleUpdate('/products', 'products')
      .then(() => {
        this.selectProduct(this.state.products[0]);
        this.setState({
          ready: true
        });
      });
  }

  render() {
    const { products, ready } = this.state;
    return (
      ready ? (
        <div id='App'>
          <h3>Temporary Product Selector</h3>
          <select name='productSelector' onChange={(e) => { this.setState({ selectedProduct: e.currentTarget.value }); }}>
            { products.map(product => (<option key={product.id} value={product.id}>{product.name}</option>)) }
          </select>
          <RelatedProducts selectedProduct={ this.state.selectedProduct } selectProduct={ this.selectProduct } />
          {/* <RatingsAndReviews /> */}
        </div>
      ) : (
        <p>Loading...</p>
      )
    );
  }
}

export default App;

const div = document.createElement('div');
div.setAttribute('id', 'Atelier');
document.body.appendChild(div);
ReactDOM.render(<App />, div);
