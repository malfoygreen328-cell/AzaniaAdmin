import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from "@mui/material";

import {
  getProducts,
  getStoreTraffic,
  getRecentOrders,
} from "../api/storeApi"; // create this api file for store data

function AzaniaStore() {
  const [products, setProducts] = useState([]);
  const [traffic, setTraffic] = useState(0);
  const [orders, setOrders] = useState([]);

  // Fetch store data
  const fetchStoreData = async () => {
    try {
      const productsRes = await getProducts();
      const trafficRes = await getStoreTraffic();
      const ordersRes = await getRecentOrders();

      setProducts(productsRes.data || []);
      setTraffic(trafficRes.data.traffic || 0);
      setOrders(ordersRes.data || []);
    } catch (err) {
      console.error("Failed to fetch store data", err);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  return (
    <div style={{ marginLeft: 20, padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Azania Store Monitoring
      </Typography>

      {/* Top Stats */}
      <Grid container spacing={3} style={{ marginBottom: 20 }}>
        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: "#0f5132", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Traffic</Typography>
              <Typography variant="h4">{traffic}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: "#115325", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">{products.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: "#0d5021", color: "#fff" }}>
            <CardContent>
              <Typography variant="h6">Recent Orders</Typography>
              <Typography variant="h4">{orders.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Products Table */}
      <Typography variant="h5" gutterBottom>
        Recent Products
      </Typography>
      <Table style={{ marginBottom: 20 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price (R)</TableCell>
            <TableCell>Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Recent Orders Table */}
      <Typography variant="h5" gutterBottom>
        Recent Orders
      </Typography>
      <Table style={{ marginBottom: 20 }}>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Total (R)</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Quick link to live store */}
      <Button
        variant="contained"
        style={{ backgroundColor: "#0e5534", color: "#fff" }}
        href="https://azaniashop.com"
        target="_blank"
      >
        Go to Live Store
      </Button>
    </div>
  );
}

export default AzaniaStore;