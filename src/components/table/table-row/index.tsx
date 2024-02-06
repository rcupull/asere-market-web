import cn from 'classnames';

export interface TableRowProps {
  nodes: Array<React.ReactNode>;
  onClick?: () => void;
}

export const TableRow = ({ nodes, onClick }: TableRowProps) => {
  return (
    <tr onClick={onClick} className={cn({ ['cursor-pointer']: !!onClick })}>
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
