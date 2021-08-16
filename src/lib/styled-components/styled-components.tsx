import React, { ReactNode } from 'react';
interface Props {
  children: ReactNode;
}

const construct = (strings: TemplateStringsArray, ...args: any[]): Function => {
  const NewComponent = (props: Props) => {
    return <div>{props.children}</div>;
  };
  return NewComponent;
};

const styled = {
  div: construct,
};

export default styled;
