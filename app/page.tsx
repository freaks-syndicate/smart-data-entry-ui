"use client";
import { Link } from "@chakra-ui/next-js";
import * as React from "react";
import { isExternal } from "util/types";

import { client } from "@/apollo/client";
import Page from "@/components/index";
import { GET_RECEIPTS_LIST } from "@/queries/homepage/homepage";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const [totalPatient, setTotalPatient] = React.useState<number>(0);
  const [patientList, setPatientList] = React.useState<any>([]);

  React.useEffect(() => {
    client
      .query({
        query: GET_RECEIPTS_LIST,
        variables: {
          item: {},
        },
      })
      .then((response) => {
        if (response) {
          console.log("response: ", response);
          setTotalPatient(response.data.Receipts.pageInfo.itemCount);
          setPatientList(response.data.Receipts.results);
        }
      })
      .catch((err) => console.log("err: ", err));
  }, []);

  console.log("totalPatient: ", totalPatient);
  console.log("patientList: ", patientList);
  return (
    <div>
      <Page />
      <Link
        href="www.google.com/"
        color="blue.400"
        _hover={{ color: "blue.500" }}
        isExternal="True"
      >
        <h1>Chaitanya Mohite the DON</h1>
      </Link>
    </div>
  );
}
