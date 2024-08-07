// import IndexPageView from "../pages-sections/landing/page-view";
// import FurnitureTwoPageView from "../pages-sections/furniture-2/page-view";
// import ShopLayout3 from "../components/layouts/shop-layout-3";
import { DashboardPageView } from "../pages-sections/vendor-dashboard/dashboard/page-view";
import VendorDashboardLayout from "../components/layouts/vendor-dashboard";

export const metadata = {
  title: "Seller Dashboard",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default function IndexPage() {
  // return <IndexPageView />;
  // return (
    // <ShopLayout3>
    //   <FurnitureTwoPageView />
    // </ShopLayout3>
  // )

  return (
    <VendorDashboardLayout>
      <DashboardPageView />
    </VendorDashboardLayout>
  ) 


}