export interface TableRowProps {
  nodes: Array<React.ReactNode>;
}

export const TableRow = ({ nodes }: TableRowProps) => {
  return (
    <tr>
      {nodes.map((node, index) => {
        return (
          <td key={index} className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            {node}
          </td>
        );
      })}
    </tr>
  );
};
