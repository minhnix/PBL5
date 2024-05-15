import { Route, Routes } from "react-router-dom";
import { AuthLayout, SignInForm, SignUpForm } from "./_auth";
import {
  Home,
  RootLayout,
  Owner,
  Vehicle,
  History,
  UserLayout,
  UserAuthLayout,
} from "./_root";
import {
  HistoryDetail,
  HistoryDetailUser,
  HistoryDetailVehicleUser,
  HomeUser,
  UpdateInfor,
  VehicleUser,
  ViewHistory,
  ViewHistoryDetailUser,
} from "./_root/pages";
import VehiclePending from "./_root/pages/VehiclePending";

const App = () => {
  return (
    <>
      <main className="flex h-screen">
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
            <Route path="/sign-up" element={<SignUpForm />} />
          </Route>
          <Route element={<UserLayout />}>
            <Route path="/" element={<HomeUser />} />
          </Route>
          <Route element={<UserAuthLayout />}>
            <Route path="/user/vehicle" element={<VehicleUser />} />
            <Route path="/user/history" element={<HistoryDetailUser />} />
            <Route
              path="/user/history/:id"
              element={<HistoryDetailVehicleUser />}
            />
            <Route path="/user/detailHistory/:id" element={<ViewHistory />} />
            <Route path="/user/updateInfor" element={<UpdateInfor />} />
          </Route>
          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index path="/admin" element={<Home />} />
            <Route path="/owner" element={<Owner />} />
            <Route path="/vehicle" element={<Vehicle />} />
            <Route path="/vehiclePending" element={<VehiclePending />} />
            <Route path="/vehicle/:id" element={<Vehicle />} />
            <Route path="/history/:id" element={<HistoryDetail />} />
            <Route path="/history" element={<History />} />
            <Route path="/view-history/:id" element={<ViewHistory />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
