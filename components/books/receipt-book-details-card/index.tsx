import { Badge, Box, Divider, Flex, Progress, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

import { ClientReceiptBook } from '@/utils/types';

export interface IReceiptBookDetailsCardProps {
  receiptBook: ClientReceiptBook;
}

export default function ReceiptBookDetailsCard(props: IReceiptBookDetailsCardProps) {
  const { receiptBook } = props;

  const bg = useColorModeValue('blue.100', 'blue.700');
  const color = useColorModeValue('blue.800', 'blue.200');
  const progress = (receiptBook.usedReceipts / receiptBook.totalReceipts) * 100;

  return (
    <Box
      p={4}
      mb={4}
      bg={bg}
      color={color}
      borderWidth={'1px'}
      borderRadius={'lg'}
      boxShadow={'lg'}
      position={'relative'}
      overflow={'hidden'}
    >
      {/* Heading */}
      <Flex align="center" justifyContent="space-between">
        <Box fontSize="3xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          Receipt Book #{receiptBook.receiptBookNumber}
        </Box>
        <Badge borderRadius="full" px="2" colorScheme="orange" fontSize={'xl'}>
          {receiptBook.financialYear}
        </Badge>
      </Flex>

      <Divider my={'4'} borderColor={'#fff'} />

      {/* Content Body */}
      <Flex w={'100%'} justifyContent={'space-between'}>
        {/* Col 1 - Image */}
        <Flex alignItems={'center'}>
          <Image src={'/book.png'} alt="book image" height={60} width={60} />
        </Flex>
        {/* Col 2 - Series */}
        <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          <Text colorScheme="gray" fontSize={'large'}>
            Receipt Series
          </Text>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            {receiptBook.receiptSeries}
          </Text>
        </Flex>
        {/* Col 3 - Receipts Count */}
        <Flex flexDirection={'column'} justifyContent={'space-between'} w={'full'} maxW={'sm'}>
          <Flex justifyContent={'space-between'}>
            <Text colorScheme="gray" fontSize={'large'}>
              Used Receipts:{' '}
              <b>
                {receiptBook.usedReceipts} / {receiptBook.totalReceipts}
              </b>
            </Text>
            {progress === 100 ? (
              <Box>
                <Badge colorScheme="green" borderRadius={'full'} px={'2'} fontSize={'small'}>
                  BOOK FULL
                </Badge>
              </Box>
            ) : null}
          </Flex>
          <Progress value={progress} size="lg" mb={'1'} colorScheme="teal" w="full" />
        </Flex>
      </Flex>
    </Box>
  );
}
