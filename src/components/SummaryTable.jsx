import React from 'react';

const SummaryTable = ({ elementCounts }) => {
  return (
    <div className="p-6 border-b bg-blue-50">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Element Summary</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
          <thead className="bg-black text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Element Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Object.keys(elementCounts).length > 0 ? (
              Object.entries(elementCounts).map(([type, count]) => (
                <tr key={type} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">No elements found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryTable;