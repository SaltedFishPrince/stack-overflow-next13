import { sidebarLinks } from '@/constants';
import React from 'react';
import SideBarItem from './SideBarItem';

type IntrinsicElementsKeys = keyof React.JSX.IntrinsicElements;
type Props<T extends IntrinsicElementsKeys> = {
  /** 外层渲染元素 */
  as?:T
  /** 列表项外层元素 */
  itemOuter?:React.JSX.Element
} & React.ComponentProps<T>;

const SideBarList = <T extends IntrinsicElementsKeys, > ({ as: comp, itemOuter, ...props }:Props<T>) => {
  const Comp = (comp ?? 'div') as IntrinsicElementsKeys;
  const _element = itemOuter ?? <div></div>;
  return (
    <Comp {...props as any}>
      {sidebarLinks.map((item) => {
        return (
          React.cloneElement(_element, { key: item.route, children: <SideBarItem {...item}/> })
        );
      })}
    </Comp>
  );
};

export default SideBarList;
