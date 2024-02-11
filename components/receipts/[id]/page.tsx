"use client";
import { useParams } from "next/navigation";
import * as React from "react";

const ReceiptViewPage: React.FC = (Params) => {
  const router = useParams();
  // Fetch receipt details based on the ID from your data source
  // You can use this ID to retrieve the specific receipt details

  return (
    <div>
      <h1>Receipt Details</h1>
      <p>Receipt ID: {router.id}</p>
      {/* Display other receipt details here */}
    </div>
  );
};

export default ReceiptViewPage;
