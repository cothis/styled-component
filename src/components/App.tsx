import styled from '../lib/styled-components/styled-components';

const Div = styled.div``;
const Button = styled.button``;
const A = styled.a``;

const App = () => {
  return (
    <div>
      React Boiler Plate
      <Div>
        <Button>버튼</Button>
        <A href="https://www.naver.com">앵커태그</A>
      </Div>
    </div>
  );
};

export default App;
