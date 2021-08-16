import React, { ReactNode, useEffect, AllHTMLAttributes } from 'react';
import domElements from './dom-elements';
import { compile, serialize, stringify } from 'stylis';

const stylis = (tag: string, content: string) =>
  serialize(compile(`.${tag}{${content}}`), stringify);

interface Props {
  children: ReactNode;
  [key: string]: any;
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

      const domProps: { [key: string]: any } = {};
      const $dom = document.createElement(tag);
      Object.keys(props).forEach((prop) => {
        if (prop in $dom) {
          domProps[prop] = props[prop];
        }
      });
      $dom.remove();

      return (
        <CustomTag {...domProps} className={tag}>
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
