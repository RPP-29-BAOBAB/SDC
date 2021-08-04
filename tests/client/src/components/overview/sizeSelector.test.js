import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import SizeSelector from '../../../../../client/src/components/overview/SizeSelector.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

// skus={ skusList }
// sizes={ sizes }
// onSelect={this.handleSizeSelect}

describe('<SizeSelector />', () => {
  it('renders without crashing given the required props', () => {
    const props = {
      skus: ['941206', '941207', '941208', '941209', '941210', '941211'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XL']
    };
    const wrapper = shallow(<SizeSelector {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have expected default properties classes', function () {
    const props = {
      skus: ['941206', '941207', '941208', '941209', '941210', '941211'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XL']
    };
    const wrapper = shallow(<SizeSelector {...props} />);
    expect(wrapper.find('#size-selector')).toHaveLength(1);
    expect(wrapper.find('#sizes')).toHaveLength(1);
    expect(wrapper.find('#sizes').children()).toHaveLength(props.sizes.length + 1);
  });

  it('should execute a callback:', function () {
    const mockCallBack = jest.fn();

    const props = {
      skus: ['941206', '941207', '941208', '941209', '941210', '941211'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XL'],
      onSelect: mockCallBack
    };
    const wrapper = shallow(<SizeSelector {...props} />);
    wrapper.find('#sizes').simulate('change');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('should be disabled if no quantities available', function () {
    const props = {
      skus: [],
      sizes: []
    };
    const wrapper = shallow(<SizeSelector {...props} />);
    expect(wrapper.find('#sizes').props().disabled).toEqual(true);
    expect(wrapper.find('#sizes').children().first().text()).toEqual('Out of Stock');
  });
});