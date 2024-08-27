import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import "../styles/CategoryTable.css";

// Sample data (You can replace this with your API data or state management)
const initialCategories = [
    { id: 1, name: 'Electronics', createdDate: '2024-01-15' },
    { id: 2, name: 'Clothing', createdDate: '2024-02-20' },
    { id: 3, name: 'Groceries', createdDate: '2024-03-05' },
    // Add more categories here
];

const AllcategoryTable: React.FC = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Fetch categories from an API or other sources
        // For now, we're using static data
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filter categories based on search term
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: 'Name',
            selector: (row: any) => row.name,
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: (row: any) => row.createdDate,
            sortable: true,
        },
    ];

    return (
        <div className="category-table-wrapper">
            <div className="category-table-container">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <DataTable
                    columns={columns}
                    data={filteredCategories}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                />
            </div>
        </div>
    );
};

export default AllcategoryTable;
