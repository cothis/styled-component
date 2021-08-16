import React, { ReactNode, useEffect } from 'react';
import domElements from './dom-elements';
import { compile, serialize, stringify, hash } from 'stylis';
import { generateAlphabeticName } from './utils';

let sequence = 1;

interface Props {
  children: ReactNode;
  [key: string]: any;
}

const constructWithTag = (tag?: string) => {
  const CustomTag = `${tag ?? 'div'}` as keyof JSX.IntrinsicElements;

  const stylis = (className: string | undefined, content: string) => {
    if (!className) {
      return serialize(compile(`${content}`), stringify);
    } else {
      return serialize(compile(`.${className}{${content}}`), stringify);
    }
  };

  const construct = (
    strings: TemplateStringsArray,
    ...args: any[]
  ): Function => {
    const NewComponent = (props: Props) => {
      const suffix = generateAlphabeticName(sequence);
      const className = tag ? tag + '-' + suffix : '';
      sequence++;

      useEffect(() => {
        const css = strings
          .map((string, i) => {
            let arg = args[i] ?? '';
            if (arg instanceof Function) {
              arg = arg(props);
            }
            return `${string}${arg}`;
          })
          .join('');
        const classString = stylis(className, css);
        const $style = document.createElement('style');
        $style.innerHTML = classString;
        document.querySelector('head')?.appendChild($style);
        return () => {
          $style.remove();
        };
      }, []);

      const domProps: { [key: string]: any } = {};
      if (tag) {
        Object.keys(props).forEach((prop) => {
          if (prop in HTMLElement.prototype) {
            domProps[prop] = props[prop];
          }
        });
      }

      return (
        <CustomTag {...domProps} className={className}>
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

export const createGlobalStyle = constructWithTag();
