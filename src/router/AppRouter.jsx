
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Wrapper } from "../../Wrapper";
import { LoginPage } from "../components/auth/LoginPage";
import { RegisterPage } from "../components/auth/RegisterPage";
import { Footer } from "../components/home/Footer";
import { HomePage } from "../components/home/HomePage";
import { Navbar } from "../components/navbar/Navbar";
import { ShopCategory } from "../components/shop/ShopCategory";
import { ShopProductsByServerAndCategory } from "../components/shop/ShopProductsByServerAndCategory";
import { ShopHome } from "../components/shop/ShopHome";
import { useAuthStore } from "../hooks/useAuthStore";
import { Dashboard } from "../components/dashboard/Dashboard";
import {UserAccount} from '../components/accounts/UserAccount'
import { ShopProductById } from "../components/shop/ShopProductById";
import { Cart } from "../components/shop/cart/Cart";
import { Checkout } from "../components/shop/cart/Checkout";
import { UserOrderPaymentId } from "../components/accounts/UserOrderPaymentId";
import { AdminOrderDatabase } from "../components/dashboard/AdminOrderDatabase";
import { AdminOrderDatabaseItem } from "../components/dashboard/AdminOrderDatabaseItem";
import { AdminOrderInformationId } from "../components/dashboard/AdminOrderInformationId";
import { SelectShop } from "../components/shop/SelectShop";
import { AdminAddProductDescription } from "../components/dashboard/AdminAddProductDescription";
import { useCartContext } from "../context/CartContext";
import { ResetPasswordPage } from "../components/auth/ResetPasswordPage";
import { ForgotPasswordPage } from "../components/auth/ForgotPasswordPage";
export const AppRouter = () => {

    const { status, checkAuthToken, user } = useAuthStore();
    const {getDiscount, numberDiscount} = useCartContext()
    useEffect(() => {
    checkAuthToken();
    getDiscount();

    }, [])




    
  if (status === "checking") {
    return (
      <>
        <Navbar />
        <div className="container mt-3 text-center">
        <div className="loader"></div>
        </div>
      </>
    );
  }

    return (
        <>
        <Wrapper />
        <Navbar />
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/iniciar-sesion" element={<LoginPage />} />
            <Route path="/auth/registrate" element={<RegisterPage />} />
            <Route path="/tienda" element={<ShopHome />} />
            <Route path="/tiendas" element={<SelectShop />} />
            <Route path="/tienda/servidor/:server" element={<ShopCategory />}/>
            <Route path="/tienda/servidor/:server/categoria/:category" element={<ShopProductsByServerAndCategory />} />
            <Route path="tienda/producto/:id" element={<ShopProductById />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/finalizar-compra" element={<Checkout />} />
            <Route path="/reiniciar-contraseña/:token" element={<ResetPasswordPage />}  />
            <Route path="/recuperar-contraseña" element={<ForgotPasswordPage />}  />
            {status === "authenticated" && user?.roles.name === "administrador" ? (
                <>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route  path="/admin/dashboard/orders" element={<AdminOrderDatabase />}/>
                <Route  path="/admin/dashboard/orders/:id" element={<AdminOrderInformationId />} />
                <Route  path="/admin/dashboard/products" element={<AdminAddProductDescription />} />
                </>
                
            ) : (
                <>
                <Route path="/" element={<HomePage />} />
                 <Route path="/mi-cuenta" element={<UserAccount />} />   
                 <Route path="/mi-cuenta/pedido/:id" element={<UserOrderPaymentId />}  />
                 </>
            )}
            </Routes>
            <Footer />
        </>
    )
}
