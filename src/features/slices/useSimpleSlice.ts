import { useDispatch, useSelector } from 'react-redux';

export const useSimpleSlice = <D = any, N extends string = string>(
  name: N,
): {
  setData: (data: D) => void;
  reset: () => void;
  data: D;
} => {
  const dispatch = useDispatch();
  const data = useSelector<{ [k in N]: D }, D>((state) => state[name]);

  const setData = (data: D) => {
    dispatch({ type: `${name}/setState`, payload: data });
  };

  const reset = () => {
    dispatch({ type: `${name}/reset` });
  };

  return {
    data,
    setData,
    reset,
  };
};
