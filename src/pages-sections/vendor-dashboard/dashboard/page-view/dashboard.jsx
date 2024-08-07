"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Local CUSTOM COMPONENTS
import Sales from "../sales";
import Card1 from "../card-1";
import Analytics from "../analytics";
import WelcomeCard from "../welcome-card";
import RecentPurchase from "../recent-purchase";
import StockOutProducts from "../stock-out-products";
import DashboardHeader from "../../../customer-dashboard/dashboard-header";
import TicketCard from "../../../customer-dashboard/business-details/ticket-card";

// API FUNCTIONS
import api from "../../../../utils/__api__/dashboard";
import api2 from "../../../../utils/__api__/ticket";

// DATA TYPES
import CustomerService from "../../../../icons/CustomerService";

const DashboardPageView = () => {
  const [cardList, setCardList] = useState([]);
  const [stockOutProducts, setStockOutProducts] = useState([]);
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cardData, stockOutData, recentPurchaseData, ticketData] = await Promise.all([
          api.getAllCard(),
          api.stockOutProducts(),
          api.recentPurchase(),
          api2.getBusinessDetailsList()
        ]);
        setCardList(cardData);
        setStockOutProducts(stockOutData);
        setRecentPurchase(recentPurchaseData);
        setTickets(ticketData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box py={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <DashboardHeader title="Complete business details" Icon={CustomerService} />
          {tickets.map(item => <TicketCard ticket={item} key={item.id} />)}
        </Grid>

        <Grid item md={6} xs={12}>
          <WelcomeCard />
        </Grid>

        <Grid container item md={6} xs={12} spacing={3}>
          {cardList.map(item => (
            <Grid item md={6} sm={6} xs={12} key={item.id}>
              <Card1
                title={item.title}
                color={item.color}
                amount1={item.amount1}
                amount2={item.amount2}
                percentage={item.percentage}
                status={item.status === "down" ? "down" : "up"}
              />
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Sales />
        </Grid>

        {/* ANALYTICS AREA */}
        <Grid item xs={12}>
          <Analytics />
        </Grid>

        {/* RECENT PURCHASE AREA */}
        <Grid item md={7} xs={12}>
          <RecentPurchase data={recentPurchase} />
        </Grid>

        {/* STOCK OUT PRODUCTS */}
        <Grid item md={5} xs={12}>
          <StockOutProducts data={stockOutProducts} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPageView;
