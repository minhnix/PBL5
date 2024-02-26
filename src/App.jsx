import { Route, Routes } from "react-router-dom";
import { AuthLayout, SignInForm } from "./_auth";
import { Home, RootLayout } from "./_root";

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
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
