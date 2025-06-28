import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home.jsx";
import Help from "./pages/Help.jsx";
import Shop from "./pages/Shop.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import LoginPage from "./pages/Auth";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Profiles from "./pages/Profiles.jsx";
import AddNewProfile from "./pages/AddNewProfile.jsx";
import EditProfilePage from "./pages/EditProfile.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow mt-24">
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/help" element={<Help />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="" element={<Home />} />
                            <Route
                                path="/profiles"
                                element={
                                    <ProtectedRoute>
                                        <Profiles />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/add-profile"
                                element={
                                    <ProtectedRoute>
                                        <AddNewProfile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/edit-profile/:id"
                                element={
                                    <ProtectedRoute>
                                        <EditProfilePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute roles={["admin"]}>
                                        <AdminPanel />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
