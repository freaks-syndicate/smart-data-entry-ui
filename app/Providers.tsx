'use client';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';

import { client } from '@/apollo/client.mjs';
import { SupertokensProvider } from '@/components/supertokens-provider';

export interface IProvidersProps {
  children: React.ReactNode;
}

export default function Providers(props: IProvidersProps) {
  const { children } = props;
  return (
    <SupertokensProvider>
      <ChakraProvider>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </ChakraProvider>
    </SupertokensProvider>
  );
}
