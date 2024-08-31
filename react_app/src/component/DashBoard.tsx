import React, { useEffect, useState } from 'react';
import { Box, ThemeProvider, createTheme, Typography, Grid, Paper, Avatar } from "@mui/material";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, TrendingDown } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllProducts } from '../Api/ProductApi';
import { getAllExpense } from '../Api/Expense';
import { toast } from 'react-toastify';

// Define the interface for the props
interface StatCardProps {
  title: string;
  value: string | number; // Use string or number based on your needs
  color: string;
  trend: 'up' | 'down'; // Enum-like string union type for trend
}
// Enhanced theme configuration
const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5", dark: "#303f9f" },
    secondary: { main: "#f50057", dark: "#c51162" },
    info: { main: "#00bcd4", dark: "#008394" },
    success: { main: "#4caf50", dark: "#388e3c" },
    background: { default: "#f5f5f5", paper: "#ffffff" },
  },
  typography: {
    h4: {
      fontWeight: 600,
      marginBottom: "1.5rem",
    },
    h6: {
      fontWeight: 500,
      marginBottom: "1rem",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});
 
// Stat Card Component (unchanged)
const StatCard: React.FC<StatCardProps> = ({ title, value, color, trend }) => (

  <Paper elevation={3} sx={{ p: 2, bgcolor: color, color: "white", height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <Typography variant="subtitle1" gutterBottom>{title}</Typography>
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h5">{value}</Typography>
      {trend === 'up' ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
    </Box>
  </Paper>
);
 
// Stacked Area Chart Component (unchanged)
const StackedAreaChart = () => {
  const data = [
    { month: 'Jan', Electronics: 4000, Clothing: 2400, Books: 2400 },
    { month: 'Feb', Electronics: 3000, Clothing: 1398, Books: 2210 },
    { month: 'Mar', Electronics: 2000, Clothing: 9800, Books: 2290 },
    { month: 'Apr', Electronics: 2780, Clothing: 3908, Books: 2000 },
    { month: 'May', Electronics: 1890, Clothing: 4800, Books: 2181 },
    { month: 'Jun', Electronics: 2390, Clothing: 3800, Books: 2500 },
    { month: 'Jul', Electronics: 3490, Clothing: 4300, Books: 2100 },
  ];
 
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Electronics" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="Clothing" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="Books" stackId="1" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
 
// Pie Chart Component (unchanged)
const PieChartComponent = () => {
  
  const data = [
    { name: 'Product A', value: 400 },
    { name: 'Product B', value: 300 },
    { name: 'Product C', value: 300 },
    { name: 'Product D', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
 
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label
        >
         {data.map((_, index) => (
            
            // <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

          ))}
          
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
 
// Product Table Component (unchanged)
const ProductTable = () => {
  const columns : GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'price', headerName: 'Price', type: 'number', width: 90 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 90 },
  ];
 
  const rows = [
    { id: 1, name: 'Product A', category: 'Electronics', price: 799.99, stock: 120 },
    { id: 2, name: 'Product B', category: 'Clothing', price: 39.99, stock: 500 },
    { id: 3, name: 'Product C', category: 'Home & Garden', price: 59.99, stock: 250 },
    { id: 4, name: 'Product D', category: 'Electronics', price: 1299.99, stock: 75 },
    { id: 5, name: 'Product E', category: 'Books', price: 19.99, stock: 1000 },
  ];
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({  
    pageSize: 5,
      page: 0,

  });
  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
};
  return (
    <div style={{ height: 400, width: '100%' }}>
      {/* <DataGrid rows={rows} columns={columns}    pageSize={5} rowsPerPageOptions={[5]} checkboxSelection /> */}
      <DataGrid
                    rows={rows}
                    columns={columns}
                    paginationModel={paginationModel}
                    pageSizeOptions={[5, 10, 15]}
                    onPaginationModelChange={handlePaginationModelChange}
                    checkboxSelection
                    sx={{ overflow: 'clip' }}
                />
    </div>
  );
};
 
// Enhanced Supplier Slider Component
const SupplierSlider = () => {
 
 
 
  const suppliers = [
    { name: 'Supplier A', image: '/api/placeholder/50/50' },
    { name: 'Supplier B', image: '/api/placeholder/50/50' },
    { name: 'Supplier C', image: '/api/placeholder/50/50' },
    { name: 'Supplier D', image: '/api/placeholder/50/50' },
    { name: 'Supplier E', image: '/api/placeholder/50/50' },
    { name: 'Supplier F', image: '/api/placeholder/50/50' },
    { name: 'Supplier G', image: '/api/placeholder/50/50' },
    { name: 'Supplier H', image: '/api/placeholder/50/50' },
  ];
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };
 
  return (
    <Box sx={{
      mt: 2,
      mb: 2,
      p: 3,
      borderRadius: 4,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white', textAlign: 'center', mb: 3 }}>Our Happy Customer</Typography>
      <Slider {...settings}>
        {suppliers.map((supplier, index) => (
          <Box key={index} sx={{ textAlign: 'center', p: 1 }}>
            <Avatar
              src={supplier.image}
              alt={supplier.name}
              sx={{
                width: 60,
                height: 60,
                margin: 'auto',
                border: '2px solid white',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Typography variant="caption" sx={{ mt: 1, color: 'white', display: 'block' }}>{supplier.name}</Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
 
// Main Dashboard Component
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [product, setProduct] = useState<any[]>([]); // Initialize as an empty array
  const [expense, setExpense] = useState<any[]>([]);

  // const [loading, setLoading] = useState(false)
 
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
 
 console.log(toggleSidebar);
 useEffect(() => {
  const totalproducts = async () => {
    try {
      const response = await getAllProducts();
      setProduct(response.data); // Use response.data to set the data
    } catch (error) {
      console.error('Error fetching products:', error);
    // } 
    }
  };

  totalproducts();
}, []);


useEffect(() => {
  const totalExpense = async () => {
    try {
      const response = await getAllExpense();
      // console.log("res", response)
      console.log('Expense Data:', response.data); // Check what is returned
      if (Array.isArray(response.data)) {
        setExpense(response.data); // Update state with fetched data

      } else {
        console.error('Expected an array but received:', response.data);
        toast.error("error")
      }

      setExpense(response.data); // Use response.data to set the data
    } catch (error) {
      console.error('Error fetching Expense:', error);
    // } 
    }
  };

  totalExpense();
}, []);
 
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: "background.default",
        minHeight: "100vh",
        ml: { xs: 0, sm: sidebarOpen ? '240px' : '60px' },
        transition: 'margin-left 0.3s ease',
        marginTop: "50px"
      }}>
        <Typography variant="h4" color="primary" gutterBottom className="dashboard-heading">Dashboard</Typography>
       
        <Box className="dashboard-content">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <StatCard title="Total Products" value={product.length} color={theme.palette.primary.main} trend="up" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <StatCard title="Total Expense" value="10" color={theme.palette.secondary.main} trend="down" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <StatCard title="Total Customers" value="10,200" color={theme.palette.info.main} trend="up" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <StatCard title="Total Profit" value="$85,000" color={theme.palette.success.main} trend="up" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2.4}>
              <StatCard title="Total Suppliers" value="150" color={theme.palette.success.dark} trend="up" />
            </Grid>
           
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
                <Typography variant="h6" gutterBottom>Product Category Sales Trend</Typography>
                <StackedAreaChart />
              </Paper>
            </Grid>
           
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Sales Distribution</Typography>
                <PieChartComponent />
              </Paper>
            </Grid>
           
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Top Products</Typography>
                <ProductTable />
              </Paper>
            </Grid>
 
            <Grid item xs={12}>
              <SupplierSlider />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
 
export default Dashboard;