import * as React from "react";

import CreateRecipt from "@/components/CreateRecipt";
import HomePageTemplate from "@/components/receipts/home";

export default function HomePage() {
  return (
    <div>
      <HomePageTemplate />
      <CreateRecipt />
    </div>
  );
}
