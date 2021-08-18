import React from 'react';
import { shallow, mount } from 'enzyme';

import RatingsAndReviews from '../../../../../client/src/components/ratingsReviews/RatingsAndReviews.jsx';

// ==== Test Template ====
// ====== index.jsx ======
// For Jest usage, see: https://jestjs.io/docs/getting-started
// For Enzyme usage, see: https://github.com/enzymejs/enzyme-matchers/tree/master/packages/jest-enzyme

describe('<RatingsAndReviews />', () => {
  test('should render correctly in debug mode', () => {
    const wrapper = shallow(<RatingsAndReviews debug/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain loading element if data not provided:', function () {
    const wrapper = mount(<RatingsAndReviews />);
    expect(wrapper.find('div')).toHaveLength(19);
  });
});