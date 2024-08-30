import duotone from "../../../icons/duotone";
export const navigation = [{
  type: "label",
  label: ""
}, {
  name: "Dashboard",
  icon: duotone.Dashboard,
  path: "/vendor/dashboard"
},
  //SIMULATION
  {
    name: "Simulation",
    icon: duotone.Products,
    children: [{
      name: "Playground",
      path: "/vendor/simulation"
    }, {
      name: "3D Product Viewer",
      path: "/vendor/simulation/create"
    }, {
      name: "3D Products",
      path: "/vendor/simulation/reviews"
    }, {
      name: "AR Visual",
      path: "/vendor/simulation/3d-model"
    }]
  },

  //PRODUCTS
  {
    name: "Products",
    icon: duotone.Products,
    children: [{
      name: "Product List",
      path: "/vendor/products"
    }, {
      name: "Create Product",
      path: "/vendor/products/create"
    }, {
      name: "Product Reviews",
      path: "/vendor/products/reviews"
    }, {
      name: "3D Model",
      path: "/vendor/products/3d-model"
    }]
  },

  //ORDERS
  {
    name: "Orders",
    icon: duotone.Order,
    children: [{
      name: "Order List",
      path: "/admin/orders"
    }, {
      name: "Order Details",
      path: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
    }]
  },

  //RETURNS
  {
    name: "Returns",
    icon: duotone.Accounts,
    children: [{
      name: "Category List",
      path: "/admin/categories"
    }, {
      name: "Create Category",
      path: "/admin/categories/create"
    }]
  },

  //EARNINGS
  {
    name: "Earnings",
    icon: duotone.Apps,
    children: [{
      name: "Brand List",
      path: "/admin/brands"
    }, {
      name: "Create Brand",
      path: "/admin/brands/create"
    }]
  },

  //REVIEW
  {
    name: "Reviews",
    icon: duotone.Review,
    path: "/vendor/reviews"
  }, 

// {
//   name: "Refunds",
//   icon: duotone.Refund,
//   children: [{
//     name: "Refund Request",
//     path: "/admin/refund-request"
//   }, {
//     name: "Refund Settings",
//     path: "/admin/refund-setting"
//   }]
// },
//  {
//   name: "Sellers",
//   icon: duotone.Seller,
//   children: [{
//     name: "Seller List",
//     path: "/admin/sellers"
//   }, {
//     name: "Seller Package",
//     path: "/admin/seller-package"
//   }, {
//     name: "Package Payments",
//     path: "/admin/package-payments"
//   }, {
//     name: "Earning History",
//     path: "/admin/earning-history"
//   }, {
//     name: "Payouts",
//     path: "/admin/payouts"
//   }, {
//     name: "Payout Request",
//     path: "/admin/payout-requests"
//   }]
// }, 
{
  type: "label",
  label: "Account"
}, 

  // SETTINGS
  {
    name: "Setting",
    icon: duotone.SiteSetting,
    path: "/vendor/shop-settings"
  },

  //TEAM
  {
    name: "Team",
    icon: duotone.ProjectChart,
    children: [{
      name: "Earning History",
      path: "/vendor/earning-history"
    }, {
      name: "Payouts",
      path: "/vendor/payouts"
    }, {
      name: "Payout Request",
      path: "/vendor/payout-requests"
    }, {
      name: "Payout Settings",
      path: "/vendor/payout-settings"
    }]
  },

  //SUPPORT
  {
    name: "Support Tickets",
    icon: duotone.ElementHub,
    path: "/vendor/support-tickets"
  },

  //INTEGRATION
 {
  name: "Integration",
  icon: duotone.Refund,
  path: "/vendor/refund-request"
},
  
// {
//   name: "Account Settings",
//   icon: duotone.AccountSetting,
//   path: "/vendor/account-settings"
// }, {
//   name: "Site Settings",
//   icon: duotone.SiteSetting,
//   path: "/vendor/site-settings"
// }, 
{
  name: "Logout",
  icon: duotone.Session,
  path: "/"
}];