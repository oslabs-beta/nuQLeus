// const serverField = require('../ServerField');
import MainContainer from '../../src/client/containers/MainContainer';
import LeftContainer from '../../src/client/containers/LeftContainer';
import MiddleContainer from '../../src/client/containers/MiddleContainer';
import RightContainer from '../../src/client/containers/RightContainer';
import Enzyme, { shallow, mount, render } from 'enzyme';

// Enzyme test to check MainContainer rendering
describe('Should render MainContainer', () => {
  let container = shallow(<MainContainer />);

  it('Renders a div and three other container divs', () => {
    expect(container.type()).toEqual('div');
    expect(container.find('LeftContainer').length === 1, true);
    expect(container.find('RightContainer').length === 1, true);
    expect(container.find('MiddleContainer').length === 1, true);
  })
  
  // it('render correctly text component', () => {  
  //   const TextInputComponent = renderer.create(<LeftContainer />).toJSON();
  //   expect(TextInputComponent).toMatchSnapshot();
  // });

});

// Enzyme test to check LeftContainer rendering
xdescribe('Should render LeftContainer', () => {


});
// Enzyme test to check MiddleContainer rendering
xdescribe('Should render MiddleContainer', () => {

});

// Enzyme test to check RightContainer rendering
xdescribe('Should render RightContainer', () => {

});
