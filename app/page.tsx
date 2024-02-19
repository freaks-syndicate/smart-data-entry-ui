import { ApolloQueryResult } from "@apollo/client";
import * as React from "react";

import { client } from "@/apollo/client.mjs";
import HomePageTemplate from "@/components/templates/home";
import { GET_RECEIPTS_ALL } from "@/queries/receipts/get-receipts-all";
import { InputGetReceiptsAllResponse } from "@/utils/types/query-response.types";

export default async function HomePage() {
  const data: ApolloQueryResult<InputGetReceiptsAllResponse> =
    await client.query({
      query: GET_RECEIPTS_ALL,
    });

  return (
    <div>
      <HomePageTemplate data={data.data.receipts} />
    </div>
  );
}
