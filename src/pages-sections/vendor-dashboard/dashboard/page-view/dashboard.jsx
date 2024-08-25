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
import { Typography } from "@mui/material";

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
    <Box px={0} >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px 15px', overflow:'hidden' }}>
            <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '0 0 15px  15px' }}>
              <DashboardHeader title="Welcome, Zayden" Icon={CustomerService} />
              <Box sx={{p:4, background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px 15px 0px 0px' }}>
                <Typography sx={{fontFamily:'Elemental End', textTransform:'lowercase', fontSize:'24px', color:'#fff'}}>
                  Begin your simulation
                </Typography>
              </Box>
              <Box sx={{p:4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius:' 0px 0px 15px 15px;' }}>
                {tickets.map(item => <TicketCard ticket={item} key={item.id} />)}
              </Box>
              
            </Box>
          </Box>
          
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
