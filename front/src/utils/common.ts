import {ForwardedRef} from 'react';

// input component를 만들어서 사용할 때 해당 컴포넌트에서 사용하는 ref와 외부에서 주입하는 ref를 둘 다 사용 가능하게 함
function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
  return (node: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    });
  };
}

export {mergeRefs};
