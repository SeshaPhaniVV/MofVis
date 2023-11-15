import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const mockData = [
  { id: 'hMOF-6', voidFraction: 0.754903, asa: 2227.6, asaM2g: 3174.5, pldA: 9.75, lcdA: 10.75 },
  { id: 'hMOF-6', voidFraction: 0.754903, asa: 2227.6, asaM2g: 3174.5, pldA: 9.75, lcdA: 10.75 },
  { id: 'hMOF-6', voidFraction: 0.754903, asa: 2227.6, asaM2g: 3174.5, pldA: 9.75, lcdA: 10.75 },
  { id: 'hMOF-6', voidFraction: 0.754903, asa: 2227.6, asaM2g: 3174.5, pldA: 9.75, lcdA: 10.75 },
  { id: 'hMOF-6', voidFraction: 0.754903, asa: 2227.6, asaM2g: 3174.5, pldA: 9.75, lcdA: 10.75 },
  { id: 'hMOF-6', voidFraction: 0.754903, asa: 2227.6, asaM2g: 3174.5, pldA: 9.75, lcdA: 10.75 },
  // Add your mock data here
];

const TableComponent = () => {
  const [data, setData] = useState(mockData);
  const [filter, setFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    console.log({ sortedData, filter });
    const finalVal = sortedData.filter((item) => {
      console.log({ item });
      return item.id.includes(filter);
    });
    console.log({ finalVal });
    return finalVal;
  }, [sortedData, filter]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container mt-3">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Filter by Name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th onClick={() => requestSort('name')}>Name</th>
            <th>Void Fraction</th>
            <th>ASA [m²/cm³]</th>
            <th>ASA [m²/g]</th>
            <th>PLD [Å]</th>
            <th>LCD [Å]</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.voidFraction}</td>
              <td>{item.asa}</td>
              <td>{item.asaM2g}</td>
              <td>{item.pldA}</td>
              <td>{item.lcdA}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
