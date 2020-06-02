import React, { useEffect } from "react";

import Header from "../Header";
import Footer from "../Footer";

import "./styles.css";

import api from "../../services/api";

export default function Pedido() {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    api.get(`pedido/${user_id}`).then((response) => {
      console.log(response.data.resp);
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="table-top">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="table-top">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <Footer />
    </div>
  );
}
