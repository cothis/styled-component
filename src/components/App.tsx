import styled, {
  createGlobalStyle,
} from '../lib/styled-components/styled-components';

const Div = styled.div`
  background-color: red;
  > button {
    background-color: blue;
  }
`;

const Button = styled.button`
  background-color: gray;
  animation: leftPink 1s forwards;
  @keyframes leftPink {
    from {
      transform: translateX(500px);
    }
    30% {
      background-color: pink;
    }
    to {
      transform: translateX(0px);
    }
  }
`;

const A = styled.a`
  color: black;
  &:hover {
    color: purple;
  }
`;

const H1 = styled.h1`
  display: ${(props: { woowa: boolean }) => (props.woowa ? 'none' : 'block')};
`;

const GlobalStyle = createGlobalStyle` 
* {
  color: aqua;
}
`;

const App = () => {
  return (
    <div>
      React Boiler Plate
      <GlobalStyle />
      <Div>
        <Button>버튼</Button>
        <A href="https://www.naver.com">앵커태그</A>
        <H1 woowa>안녕하세요</H1>
      </Div>
    </div>
  );
};

export default App;
