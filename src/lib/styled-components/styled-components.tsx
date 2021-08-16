import React, { DOMElement, ReactNode, useEffect } from 'react';
import domElements from './dom-elements';
import { compile, serialize, stringify } from 'stylis';

const stylis = (tag: string, content: string) =>
  serialize(compile(`.${tag}{${content}}`), stringify);

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
      useEffect(() => {
        const css = strings
          .map((string, i) => {
            let arg = args[i] ?? '';
            if (arg instanceof Function) {
              console.log(arg, props);
              arg = arg(props);
            }
            return `${string}${arg}`;
          })
          .join('');
        const classString = stylis(tag, css);
        const $style = document.createElement('style');
        $style.innerHTML = classString;
        document.querySelector('head')?.appendChild($style);
        return () => {
          $style.remove();
        };
      }, []);

      return (
        <CustomTag {...props} className={tag}>
          {props.children}
        </CustomTag>
      );
    };
    return NewComponent;
  };

  return construct;
};

type Styled = Record<
  typeof domElements[number],
  ReturnType<typeof constructWithTag>
>;

const styled: Styled = {};

domElements.forEach((domElement) => {
  styled[domElement] = constructWithTag(domElement);
});

export default styled;
