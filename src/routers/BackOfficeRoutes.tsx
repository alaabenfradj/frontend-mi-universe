import Sidebar from "components/Sidebar/Sidebar.js";
import { Redirect, Route, Switch } from "react-router-dom";
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import Tablesproducts from "views/admin/Tablesproducts.js";
import Dashboard from "views/admin/Dashboard";
import Footer from "components/Footer/Footer";
import Reclamations from "views/admin/Reclamations";
import Invoices from "views/admin/Invoices";
import SimpleUsers from "views/admin/SimpleUsers";
import Teachers from "views/admin/Teachers";
import Students from "views/admin/Students";
import Sellers from "views/admin/Sellers";
import TablesproductsBack from "views/admin/TablesOfProductsBack";

export default function BackOfficeRoutes() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 ">
        {/* Header */}

        <div className="px-4 md:px-10 mx-auto w-full ">
          <Switch>
            <Route path="/back-office/dashboard" exact component={Dashboard} />
            <Route path="/back-office/settings" exact component={Settings} />
            <Route path="/back-office/tables" exact component={Tables} />
            <Route
              path="/back-office/reclamations"
              exact
              component={Reclamations}
            />
            <Route path="/back-office/invoices" exact component={Invoices} />
            <Route
              path="/back-office/productstable"
              exact
              component={Tablesproducts}
            />
            <Route
              path="/back-office/simple-users"
              exact
              component={SimpleUsers}
            />
            <Route
              path="/back-office/products"
              exact
              component={TablesproductsBack}
            />
            
            <Route path="/back-office/teachers" exact component={Teachers} />
            <Route path="/back-office/students" exact component={Students} />
            <Route path="/back-office/sellers" exact component={Sellers} />

            <Redirect from="/back-office" to="/back-office/dashboard" />
          </Switch>
        </div>
        <Footer />
      </div>
    </>
  );
}
