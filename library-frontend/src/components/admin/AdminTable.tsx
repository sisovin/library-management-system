import React from 'react';

interface AdminTableProps {
  data: any[];
  columns: string[];
}

const AdminTable: React.FC<AdminTableProps> = ({ data, columns }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column} className="py-2 px-4 border-b border-gray-200 bg-gray-100">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column} className="py-2 px-4 border-b border-gray-200">
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
