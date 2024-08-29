import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// // Define the product data type
// interface Product {
//   code: string;
//   name: string;
//   category: string;
//   quantity: number;
// }

// Sample data for the table
// const products: Product[] = [
//   { code: 'P001', name: 'Product 1', category: 'Category 1', quantity: 10 },
//   { code: 'P002', name: 'Product 2', category: 'Category 2', quantity: 20 },
//   { code: 'P003', name: 'Product 3', category: 'Category 3', quantity: 30 },
//   // Add more products as needed
// ];

const ProductTable: React.FC = () => {
  return (
    
        <table className='table table-striped table-dark' style={{width:"100%"}}>
              <thead className='thead'>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Price</th>
                    </tr>
              </thead>  
              <tbody>
                   <tr>
                      <td>Laptop</td>
                      <td>Electronic</td>
                      <td>50000</td>
                    </tr>
                    <tr>
                      <td>Smartphone</td>
                      <td>Electronic</td>
                      <td>60000</td>
                    </tr>
                    <tr>
                      <td>T-shirt</td>
                      <td>Garments</td>
                      <td>5000</td>
                    </tr> 
                    
              </tbody>
        </table>  
      
          // <DataTable
          //   value={products}
          //   tableStyle={{ minWidth: '50rem' }}
          //   responsiveLayout="scroll"
          //   size="small"
          // >
          //   <Column field="code" header="Code" style={{ width: '25%' }} />
          //   <Column field="name" header="Name" style={{ width: '25%' }} />
          //   <Column field="category" header="Category" style={{ width: '25%' }} />
          //   <Column field="quantity" header="Quantity" style={{ width: '25%' }} />
          // </DataTable>
      
  );
};

export default ProductTable;
