import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from '../../src/components/Counter';

describe('Counter Test', () => {
  it('render test', () => {
    //given
    const { getByText } = render(<Counter />);
    const countDiv = getByText('0');
    const plusButton = getByText('+');
    const minusButton = getByText('-');

    //when

    //then
    expect(countDiv).toBeInTheDocument();
    expect(plusButton).toBeInTheDocument();
    expect(minusButton).toBeInTheDocument();
  });

  it('+ 기능 동작확인', () => {
    //given
    const { getByText } = render(<Counter />);
    const countDiv = getByText('0');
    const plusButton = getByText('+');
    const minusButton = getByText('-');

    //when
    fireEvent.click(plusButton);

    //then
    expect(countDiv.innerHTML).toEqual('1');
  });

  it('- 기능 동작확인', () => {
    //given
    const { getByText } = render(<Counter />);
    const countDiv = getByText('0');
    const plusButton = getByText('+');
    const minusButton = getByText('-');

    //when
    fireEvent.click(minusButton);

    //then
    expect(countDiv.innerHTML).toEqual('-1');
  });
});
