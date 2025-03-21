import React from 'react';

const DetailedTable = ({ elementDetails }) => {
  return (
    <div className="p-6 border-b bg-indigo-50">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Element Details</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Length (km)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {elementDetails.length > 0 ? (
              elementDetails.map(detail => (
                <tr key={detail.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{detail.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.type.includes('Line') ? `${detail.length} km` : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No elements found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedTable;