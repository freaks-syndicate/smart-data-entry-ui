import { useParams } from "next/navigation";
import * as React from "react";

export interface IReceiptsEditTemplateProps {}

export default function ReceiptsEditTemplate(
  _props: IReceiptsEditTemplateProps,
) {
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
}
