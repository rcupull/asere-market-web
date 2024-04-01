const mapToOutlinedBox = <T extends React.ReactNode = React.ReactNode>(args: {
  value?: Array<T>;
  preMap?: (t: T, index: number) => T;
}) => {
  const { value, preMap } = args;

  let valueToRender = value;

  if (preMap) {
    valueToRender = valueToRender?.map(preMap);
  }

  return valueToRender?.map((v, index) => (
    <div
      key={index}
      className="text-nowrap border border-gray-500 rounded-2xl px-1 text-center w-fit m-0.5"
    >
      {v}
    </div>
  ));
};

export const viewUtils = {
  mapToOutlinedBox,
};
