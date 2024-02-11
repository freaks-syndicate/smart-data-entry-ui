// app/providers.tsx
"use client";

import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

import { client } from "../apollo/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>{children}</ChakraProvider>
    </ApolloProvider>
  );
}
