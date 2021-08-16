import React, { ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

const constructWithTag = (tag: string) => {
  const CustomTag = `${tag}` as keyof JSX.IntrinsicElements;

  const construct = (
    strings: TemplateStringsArray,
    ...args: any[]
  ): Function => {
    const NewComponent = (props: Props) => {
      return <CustomTag {...props}>{props.children}</CustomTag>;
    };
    return NewComponent;
  };

  return construct;
};

const styled = {
  div: constructWithTag('div'),
  span: constructWithTag('span'),
  a: constructWithTag('a'),
  form: constructWithTag('form'),
  button: constructWithTag('button'),
};

export default styled;
