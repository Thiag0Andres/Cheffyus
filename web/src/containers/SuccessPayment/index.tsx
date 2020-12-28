import React, { useState } from "react";

// Components
import PaymentSuccess from "../../layout/PaymentSuccess";
import Footer from "../../components/Footer";

const SuccessPayment: React.FC = () => {
  // States
  const [filter, setFilter] = useState([]);

  return (
    <>
      <PaymentSuccess />
      <Footer />
    </>
  );
};

export default SuccessPayment;
