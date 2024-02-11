import * as React from "react";

import HomePageTemplate from "@/components/receipts/home";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  return (
    <div>
      <HomePageTemplate />
    </div>
  );
}
