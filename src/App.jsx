import { Route, Routes } from "react-router-dom";
import { AuthLayout, SignInForm } from "./_auth";
import { Home, RootLayout, User, Vehicle, History } from "./_root";
import { HistoryDetail, ViewHistory } from "./_root/pages";

const App = () => {
  return (
    <>
      <main className="flex h-screen">
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignInForm />} />
          </Route>
          {/* private routes */}
          <Route element={<RootLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/user" element={<User />} />
            <Route path="/vehicle" element={<Vehicle />} />
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
