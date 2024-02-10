"use client";
import { Link } from "@chakra-ui/next-js";
import * as React from "react";
import { isExternal } from "util/types";

import Page from "@/components/index";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
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
