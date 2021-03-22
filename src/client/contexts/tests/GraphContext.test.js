import { useContext } from 'react';
import { GraphContext, GraphContextProvider } from '../GraphContext';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Check the server input and updated value after using setInfo', () => {
  const TestComponent = () => {
    // const [info, setInfo] = useContext(GraphContext);
    const { info, setInfo } = useContext(GraphContext);
    const testSetInfo = () => {
      setInfo(() => ({
        ...info,
        uri: 'http://localhost:1337',
        response: {resTest: 'some updated response data'},
        extensions: {extTest: 'some random test object'},
        queryTime: '6ms',
      }))
    };

    return (
      <>
        <div data-testid='value'>{info.uri.toString()}</div>
        <button onClick={testSetInfo}>Send Query</button>
      </>
    );
  };

  const wrapper = mount(
    <GraphContextProvider>
      <TestComponent />
    </GraphContextProvider>
  );

  expect(wrapper.find('[data-testid="value"]').text().toEqual('http://localhost:4001'));
  
  wrapper.find('button').simulate('click');

  expect(wrapper.find('[data-testid="value"]').text().toEqual('http://localhost:1337'));
});
