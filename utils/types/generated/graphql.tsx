import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type AssignUserRole = {
  roleName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type BooleanFilterConstraint = {
  is?: InputMaybe<Scalars['String']['input']>;
};

export type CreateReceipt = {
  aadharNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  amount: Scalars['Int']['input'];
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  financialYear?: InputMaybe<Scalars['String']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  modeOfPayment: ModeOfPayment;
  name: Scalars['String']['input'];
  panNumber?: InputMaybe<Scalars['String']['input']>;
  receiptBookId: Scalars['String']['input'];
  receiptNumber: Scalars['Int']['input'];
};

export type CreateReceiptBook = {
  financialYear?: InputMaybe<Scalars['String']['input']>;
  receiptBookNumber: Scalars['Int']['input'];
  receiptSeries: Scalars['Int']['input'];
  totalReceipts: Scalars['Int']['input'];
};

export type CreateUserRole = {
  name: Scalars['String']['input'];
  permissions: Array<Scalars['String']['input']>;
};

export type DateFilterConstraint = {
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FloatFilterConstraint = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Others = 'OTHERS',
}

export type Id = {
  id?: InputMaybe<Scalars['String']['input']>;
  uuid?: InputMaybe<Scalars['String']['input']>;
};

export enum IdCode {
  Aadhar = 'Aadhar',
  Pan = 'PAN',
}

export type IdFilterConstraints = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type IntFilterConstraint = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  ne?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export enum ModeOfPayment {
  Cash = 'cash',
  Cheque = 'cheque',
  Online = 'online',
}

export type Mutation = {
  __typename?: 'Mutation';
  assignRoleToUser?: Maybe<Scalars['Boolean']['output']>;
  createReceipt?: Maybe<Receipt>;
  createReceiptBook?: Maybe<ReceiptBook>;
  createUserRole?: Maybe<Scalars['Boolean']['output']>;
  deleteReceipt?: Maybe<Receipt>;
  deleteReceiptBook?: Maybe<ReceiptBook>;
  deleteUserRole?: Maybe<Scalars['Boolean']['output']>;
  removeRoleFromUser?: Maybe<Scalars['Boolean']['output']>;
  updateReceipt?: Maybe<Receipt>;
  updateReceiptBook?: Maybe<ReceiptBook>;
};

export type MutationAssignRoleToUserArgs = {
  item?: InputMaybe<AssignUserRole>;
};

export type MutationCreateReceiptArgs = {
  item: CreateReceipt;
};

export type MutationCreateReceiptBookArgs = {
  item: CreateReceiptBook;
};

export type MutationCreateUserRoleArgs = {
  item: CreateUserRole;
};

export type MutationDeleteReceiptArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteReceiptBookArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteUserRoleArgs = {
  name: Scalars['String']['input'];
};

export type MutationRemoveRoleFromUserArgs = {
  item?: InputMaybe<RemoveUserRole>;
};

export type MutationUpdateReceiptArgs = {
  id: Scalars['String']['input'];
  item: UpdateReceipt;
};

export type MutationUpdateReceiptBookArgs = {
  id: Scalars['String']['input'];
  item: UpdateReceiptBook;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage?: Maybe<Scalars['Int']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  itemCount?: Maybe<Scalars['Int']['output']>;
  pageCount?: Maybe<Scalars['Int']['output']>;
  pageItemCount?: Maybe<Scalars['Int']['output']>;
  perPage?: Maybe<Scalars['Int']['output']>;
};

export type PaginationInput = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  Receipt?: Maybe<Receipt>;
  ReceiptBook?: Maybe<ReceiptBook>;
  ReceiptBooks?: Maybe<ReceiptBooks>;
  ReceiptBooksAll?: Maybe<Array<Maybe<ReceiptBook>>>;
  Receipts?: Maybe<Receipts>;
  ReceiptsAll?: Maybe<Array<Maybe<Receipt>>>;
  User?: Maybe<User>;
  UserRole?: Maybe<UserRole>;
  UserRolesAll?: Maybe<Array<Maybe<UserRole>>>;
};

export type QueryReceiptArgs = {
  where?: InputMaybe<WhereOptionsReceipt>;
};

export type QueryReceiptBookArgs = {
  where?: InputMaybe<WhereOptionsReceiptBook>;
};

export type QueryReceiptBooksArgs = {
  paginate?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
  where?: InputMaybe<WhereOptionsReceiptBook>;
};

export type QueryReceiptsArgs = {
  paginate?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
  where?: InputMaybe<WhereOptionsReceipt>;
};

export type QueryUserArgs = {
  where?: InputMaybe<WhereOptionsUser>;
};

export type QueryUserRoleArgs = {
  where?: InputMaybe<WhereOptionsUserRole>;
};

/** Receipt Schema */
export type Receipt = {
  __typename?: 'Receipt';
  aadharNumber?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  amount: Scalars['Int']['output'];
  cancelled?: Maybe<Scalars['Boolean']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
  financialYear?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  idCode?: Maybe<IdCode>;
  mobileNumber?: Maybe<Scalars['String']['output']>;
  modeOfPayment: ModeOfPayment;
  name?: Maybe<Scalars['String']['output']>;
  panNumber?: Maybe<Scalars['String']['output']>;
  receiptBook: ReceiptBook;
  receiptNumber: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type ReceiptBook = {
  __typename?: 'ReceiptBook';
  financialYear?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  receiptBookNumber: Scalars['Int']['output'];
  receiptSeries: Scalars['Int']['output'];
  receipts?: Maybe<Array<Maybe<Receipt>>>;
  totalReceipts: Scalars['Int']['output'];
  usedReceipts: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type ReceiptBooks = {
  __typename?: 'ReceiptBooks';
  pageInfo?: Maybe<PageInfo>;
  results?: Maybe<Array<Maybe<ReceiptBook>>>;
};

export type Receipts = {
  __typename?: 'Receipts';
  pageInfo?: Maybe<PageInfo>;
  results?: Maybe<Array<Maybe<Receipt>>>;
};

export type RemoveUserRole = {
  roleName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type SortColumn = {
  field?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<SortOrder>;
};

export type SortInput = {
  order?: InputMaybe<Array<InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>>>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type StringFilterConstraint = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  is?: InputMaybe<Scalars['String']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  ne?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  not?: InputMaybe<Scalars['String']['input']>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateReceipt = {
  aadharNumber?: InputMaybe<Scalars['String']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  cancelled?: InputMaybe<Scalars['Boolean']['input']>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  financialYear?: InputMaybe<Scalars['String']['input']>;
  mobileNumber?: InputMaybe<Scalars['String']['input']>;
  modeOfPayment?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  panNumber?: InputMaybe<Scalars['String']['input']>;
  receiptBookId?: InputMaybe<Scalars['String']['input']>;
  receiptNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateReceiptBook = {
  financialYear?: InputMaybe<Scalars['String']['input']>;
  receiptBookNumber?: InputMaybe<Scalars['Int']['input']>;
  receiptSeries?: InputMaybe<Scalars['Int']['input']>;
  totalReceipts?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserRole = {
  name?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  __typename?: 'User';
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  userId: Scalars['String']['output'];
};

export type UserRole = {
  __typename?: 'UserRole';
  name: Scalars['String']['output'];
  permissions: Array<Scalars['String']['output']>;
};

export type UserRoles = {
  __typename?: 'UserRoles';
  pageInfo?: Maybe<PageInfo>;
  results?: Maybe<Array<Maybe<UserRole>>>;
};

export type WhereOptionsReceipt = {
  address?: InputMaybe<StringFilterConstraint>;
  amount?: InputMaybe<IntFilterConstraint>;
  and?: InputMaybe<Array<InputMaybe<WhereOptionsReceiptFields>>>;
  cancelled?: InputMaybe<BooleanFilterConstraint>;
  financialYear?: InputMaybe<StringFilterConstraint>;
  id?: InputMaybe<Scalars['String']['input']>;
  idCode?: InputMaybe<StringFilterConstraint>;
  modeOfPayment?: InputMaybe<StringFilterConstraint>;
  or?: InputMaybe<Array<InputMaybe<WhereOptionsReceiptFields>>>;
  receiptNumber?: InputMaybe<IntFilterConstraint>;
  uuid?: InputMaybe<IdFilterConstraints>;
};

export type WhereOptionsReceiptBook = {
  and?: InputMaybe<Array<InputMaybe<WhereOptionsReceiptBookFields>>>;
  financialYear?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<WhereOptionsReceiptBookFields>>>;
  receiptBookNumber?: InputMaybe<IntFilterConstraint>;
  receiptSeries?: InputMaybe<IntFilterConstraint>;
  totalReceipts?: InputMaybe<IntFilterConstraint>;
  uuid?: InputMaybe<IdFilterConstraints>;
};

export type WhereOptionsReceiptBookFields = {
  financialYear?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  receiptBookNumber?: InputMaybe<IntFilterConstraint>;
  receiptSeries?: InputMaybe<IntFilterConstraint>;
  totalReceipts?: InputMaybe<IntFilterConstraint>;
  uuid?: InputMaybe<IdFilterConstraints>;
};

export type WhereOptionsReceiptFields = {
  address?: InputMaybe<StringFilterConstraint>;
  amount?: InputMaybe<IntFilterConstraint>;
  cancelled?: InputMaybe<BooleanFilterConstraint>;
  financialYear?: InputMaybe<StringFilterConstraint>;
  id?: InputMaybe<Scalars['String']['input']>;
  modeOfPayment?: InputMaybe<StringFilterConstraint>;
  receiptNumber?: InputMaybe<IntFilterConstraint>;
  uuid?: InputMaybe<IdFilterConstraints>;
};

export type WhereOptionsUser = {
  userId: Scalars['String']['input'];
};

export type WhereOptionsUserRole = {
  name?: InputMaybe<StringFilterConstraint>;
};

export type CreateReceiptBookMutationVariables = Exact<{
  item: CreateReceiptBook;
}>;

export type CreateReceiptBookMutation = {
  __typename?: 'Mutation';
  createdReceipt?: {
    __typename?: 'ReceiptBook';
    id: string;
    uuid: string;
    receiptBookNumber: number;
    receiptSeries: number;
    totalReceipts: number;
    financialYear?: string | null;
    usedReceipts: number;
    receipts?: Array<{
      __typename?: 'Receipt';
      id: string;
      uuid: string;
      receiptNumber: number;
      financialYear?: string | null;
      date?: any | null;
      mobileNumber?: string | null;
      name?: string | null;
      address?: string | null;
      amount: number;
      modeOfPayment: ModeOfPayment;
      aadharNumber?: string | null;
      panNumber?: string | null;
      idCode?: IdCode | null;
      cancelled?: boolean | null;
    } | null> | null;
  } | null;
};

export type DeleteReceiptBookMutationVariables = Exact<{
  deleteReceiptBookId: Scalars['String']['input'];
}>;

export type DeleteReceiptBookMutation = {
  __typename?: 'Mutation';
  deletedReceiptBook?: {
    __typename?: 'ReceiptBook';
    id: string;
    uuid: string;
    receiptBookNumber: number;
    receiptSeries: number;
    totalReceipts: number;
    financialYear?: string | null;
    usedReceipts: number;
    receipts?: Array<{
      __typename?: 'Receipt';
      id: string;
      uuid: string;
      receiptNumber: number;
      financialYear?: string | null;
      date?: any | null;
      mobileNumber?: string | null;
      name?: string | null;
      address?: string | null;
      amount: number;
      modeOfPayment: ModeOfPayment;
      aadharNumber?: string | null;
      panNumber?: string | null;
      idCode?: IdCode | null;
      cancelled?: boolean | null;
    } | null> | null;
  } | null;
};

export type ReceiptBookQueryVariables = Exact<{
  where?: InputMaybe<WhereOptionsReceiptBook>;
}>;

export type ReceiptBookQuery = {
  __typename?: 'Query';
  receiptBook?: {
    __typename?: 'ReceiptBook';
    id: string;
    uuid: string;
    receiptBookNumber: number;
    receiptSeries: number;
    totalReceipts: number;
    financialYear?: string | null;
    usedReceipts: number;
    receipts?: Array<{
      __typename?: 'Receipt';
      id: string;
      uuid: string;
      receiptNumber: number;
      financialYear?: string | null;
      date?: any | null;
      mobileNumber?: string | null;
      name?: string | null;
      address?: string | null;
      amount: number;
      modeOfPayment: ModeOfPayment;
      aadharNumber?: string | null;
      panNumber?: string | null;
      idCode?: IdCode | null;
      cancelled?: boolean | null;
    } | null> | null;
  } | null;
};

export type ReceiptBooksQueryVariables = Exact<{
  paginate?: InputMaybe<PaginationInput>;
  where?: InputMaybe<WhereOptionsReceiptBook>;
}>;

export type ReceiptBooksQuery = {
  __typename?: 'Query';
  receiptBooks?: {
    __typename?: 'ReceiptBooks';
    results?: Array<{
      __typename?: 'ReceiptBook';
      id: string;
      uuid: string;
      receiptBookNumber: number;
      receiptSeries: number;
      totalReceipts: number;
      financialYear?: string | null;
      usedReceipts: number;
      receipts?: Array<{
        __typename?: 'Receipt';
        id: string;
        uuid: string;
        receiptNumber: number;
        financialYear?: string | null;
        date?: any | null;
        mobileNumber?: string | null;
        name?: string | null;
        address?: string | null;
        amount: number;
        modeOfPayment: ModeOfPayment;
        aadharNumber?: string | null;
        panNumber?: string | null;
        idCode?: IdCode | null;
        cancelled?: boolean | null;
      } | null> | null;
    } | null> | null;
    pageInfo?: {
      __typename?: 'PageInfo';
      hasNextPage?: boolean | null;
      currentPage?: number | null;
      hasPreviousPage?: boolean | null;
      itemCount?: number | null;
      pageCount?: number | null;
      pageItemCount?: number | null;
      perPage?: number | null;
    } | null;
  } | null;
};

export type UpdateReceiptBookMutationVariables = Exact<{
  updateReceiptBookId: Scalars['String']['input'];
  item: UpdateReceiptBook;
}>;

export type UpdateReceiptBookMutation = {
  __typename?: 'Mutation';
  updatedReceiptBook?: {
    __typename?: 'ReceiptBook';
    id: string;
    uuid: string;
    receiptBookNumber: number;
    receiptSeries: number;
    totalReceipts: number;
    financialYear?: string | null;
    usedReceipts: number;
    receipts?: Array<{
      __typename?: 'Receipt';
      id: string;
      uuid: string;
      receiptNumber: number;
      financialYear?: string | null;
      date?: any | null;
      mobileNumber?: string | null;
      name?: string | null;
      address?: string | null;
      amount: number;
      modeOfPayment: ModeOfPayment;
      aadharNumber?: string | null;
      panNumber?: string | null;
      idCode?: IdCode | null;
      cancelled?: boolean | null;
    } | null> | null;
  } | null;
};

export type CreateReceiptMutationVariables = Exact<{
  item: CreateReceipt;
}>;

export type CreateReceiptMutation = {
  __typename?: 'Mutation';
  createdReceipt?: {
    __typename?: 'Receipt';
    id: string;
    uuid: string;
    receiptNumber: number;
    financialYear?: string | null;
    date?: any | null;
    mobileNumber?: string | null;
    name?: string | null;
    address?: string | null;
    amount: number;
    modeOfPayment: ModeOfPayment;
    aadharNumber?: string | null;
    panNumber?: string | null;
    idCode?: IdCode | null;
    cancelled?: boolean | null;
  } | null;
};

export type DeleteReceiptMutationVariables = Exact<{
  deleteReceiptId: Scalars['String']['input'];
}>;

export type DeleteReceiptMutation = {
  __typename?: 'Mutation';
  deletedReceipt?: {
    __typename?: 'Receipt';
    id: string;
    uuid: string;
    receiptNumber: number;
    financialYear?: string | null;
    date?: any | null;
    mobileNumber?: string | null;
    name?: string | null;
    address?: string | null;
    amount: number;
    modeOfPayment: ModeOfPayment;
    aadharNumber?: string | null;
    panNumber?: string | null;
    idCode?: IdCode | null;
    cancelled?: boolean | null;
  } | null;
};

export type ReceiptQueryVariables = Exact<{
  where?: InputMaybe<WhereOptionsReceipt>;
}>;

export type ReceiptQuery = {
  __typename?: 'Query';
  receipt?: {
    __typename?: 'Receipt';
    id: string;
    uuid: string;
    receiptNumber: number;
    financialYear?: string | null;
    date?: any | null;
    mobileNumber?: string | null;
    name?: string | null;
    address?: string | null;
    amount: number;
    modeOfPayment: ModeOfPayment;
    aadharNumber?: string | null;
    panNumber?: string | null;
    idCode?: IdCode | null;
    cancelled?: boolean | null;
  } | null;
};

export type ReceiptsAllQueryVariables = Exact<{ [key: string]: never }>;

export type ReceiptsAllQuery = {
  __typename?: 'Query';
  receipts?: Array<{
    __typename?: 'Receipt';
    id: string;
    uuid: string;
    receiptNumber: number;
    financialYear?: string | null;
    date?: any | null;
    mobileNumber?: string | null;
    name?: string | null;
    address?: string | null;
    amount: number;
    aadharNumber?: string | null;
    panNumber?: string | null;
    cancelled?: boolean | null;
  } | null> | null;
};

export type ReceiptsQueryVariables = Exact<{
  where?: InputMaybe<WhereOptionsReceipt>;
  paginate?: InputMaybe<PaginationInput>;
}>;

export type ReceiptsQuery = {
  __typename?: 'Query';
  receipts?: {
    __typename?: 'Receipts';
    pageInfo?: {
      __typename?: 'PageInfo';
      perPage?: number | null;
      currentPage?: number | null;
      hasPreviousPage?: boolean | null;
      hasNextPage?: boolean | null;
      itemCount?: number | null;
      pageCount?: number | null;
      pageItemCount?: number | null;
    } | null;
    results?: Array<{
      __typename?: 'Receipt';
      id: string;
      uuid: string;
      receiptNumber: number;
      financialYear?: string | null;
      date?: any | null;
      mobileNumber?: string | null;
      name?: string | null;
      address?: string | null;
      amount: number;
      modeOfPayment: ModeOfPayment;
      aadharNumber?: string | null;
      panNumber?: string | null;
      idCode?: IdCode | null;
      cancelled?: boolean | null;
    } | null> | null;
  } | null;
};

export type UpdateReceiptMutationVariables = Exact<{
  updateReceiptId: Scalars['String']['input'];
  item: UpdateReceipt;
}>;

export type UpdateReceiptMutation = {
  __typename?: 'Mutation';
  updatedReceipt?: {
    __typename?: 'Receipt';
    id: string;
    uuid: string;
    receiptNumber: number;
    financialYear?: string | null;
    date?: any | null;
    mobileNumber?: string | null;
    name?: string | null;
    address?: string | null;
    amount: number;
    modeOfPayment: ModeOfPayment;
    aadharNumber?: string | null;
    panNumber?: string | null;
    idCode?: IdCode | null;
    cancelled?: boolean | null;
    receiptBook: { __typename?: 'ReceiptBook'; id: string };
  } | null;
};

export type UserQueryVariables = Exact<{
  where?: InputMaybe<WhereOptionsUser>;
}>;

export type UserQuery = {
  __typename?: 'Query';
  user?: {
    __typename?: 'User';
    userId: string;
    firstName?: string | null;
    lastName?: string | null;
    roles?: Array<{ __typename?: 'UserRole'; name: string; permissions: Array<string> } | null> | null;
  } | null;
};

export const CreateReceiptBookDocument = gql`
  mutation CreateReceiptBook($item: CreateReceiptBook!) {
    createdReceipt: createReceiptBook(item: $item) {
      id
      uuid
      receiptBookNumber
      receiptSeries
      totalReceipts
      financialYear
      usedReceipts
      receipts {
        id
        uuid
        receiptNumber
        financialYear
        date
        mobileNumber
        name
        address
        amount
        modeOfPayment
        aadharNumber
        panNumber
        idCode
        cancelled
      }
    }
  }
`;
export type CreateReceiptBookMutationFn = Apollo.MutationFunction<CreateReceiptBookMutation, CreateReceiptBookMutationVariables>;

/**
 * __useCreateReceiptBookMutation__
 *
 * To run a mutation, you first call `useCreateReceiptBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReceiptBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReceiptBookMutation, { data, loading, error }] = useCreateReceiptBookMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useCreateReceiptBookMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateReceiptBookMutation, CreateReceiptBookMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateReceiptBookMutation, CreateReceiptBookMutationVariables>(CreateReceiptBookDocument, options);
}
export type CreateReceiptBookMutationHookResult = ReturnType<typeof useCreateReceiptBookMutation>;
export type CreateReceiptBookMutationResult = Apollo.MutationResult<CreateReceiptBookMutation>;
export type CreateReceiptBookMutationOptions = Apollo.BaseMutationOptions<CreateReceiptBookMutation, CreateReceiptBookMutationVariables>;
export const DeleteReceiptBookDocument = gql`
  mutation DeleteReceiptBook($deleteReceiptBookId: String!) {
    deletedReceiptBook: deleteReceiptBook(id: $deleteReceiptBookId) {
      id
      uuid
      receiptBookNumber
      receiptSeries
      totalReceipts
      financialYear
      receipts {
        id
        uuid
        receiptNumber
        financialYear
        date
        mobileNumber
        name
        address
        amount
        modeOfPayment
        aadharNumber
        panNumber
        idCode
        cancelled
      }
      usedReceipts
    }
  }
`;
export type DeleteReceiptBookMutationFn = Apollo.MutationFunction<DeleteReceiptBookMutation, DeleteReceiptBookMutationVariables>;

/**
 * __useDeleteReceiptBookMutation__
 *
 * To run a mutation, you first call `useDeleteReceiptBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReceiptBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReceiptBookMutation, { data, loading, error }] = useDeleteReceiptBookMutation({
 *   variables: {
 *      deleteReceiptBookId: // value for 'deleteReceiptBookId'
 *   },
 * });
 */
export function useDeleteReceiptBookMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteReceiptBookMutation, DeleteReceiptBookMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteReceiptBookMutation, DeleteReceiptBookMutationVariables>(DeleteReceiptBookDocument, options);
}
export type DeleteReceiptBookMutationHookResult = ReturnType<typeof useDeleteReceiptBookMutation>;
export type DeleteReceiptBookMutationResult = Apollo.MutationResult<DeleteReceiptBookMutation>;
export type DeleteReceiptBookMutationOptions = Apollo.BaseMutationOptions<DeleteReceiptBookMutation, DeleteReceiptBookMutationVariables>;
export const ReceiptBookDocument = gql`
  query ReceiptBook($where: WhereOptionsReceiptBook) {
    receiptBook: ReceiptBook(where: $where) {
      id
      uuid
      receiptBookNumber
      receiptSeries
      totalReceipts
      financialYear
      receipts {
        id
        uuid
        receiptNumber
        financialYear
        date
        mobileNumber
        name
        address
        amount
        modeOfPayment
        aadharNumber
        panNumber
        idCode
        cancelled
      }
      usedReceipts
    }
  }
`;

/**
 * __useReceiptBookQuery__
 *
 * To run a query within a React component, call `useReceiptBookQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptBookQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptBookQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useReceiptBookQuery(baseOptions?: Apollo.QueryHookOptions<ReceiptBookQuery, ReceiptBookQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReceiptBookQuery, ReceiptBookQueryVariables>(ReceiptBookDocument, options);
}
export function useReceiptBookLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceiptBookQuery, ReceiptBookQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReceiptBookQuery, ReceiptBookQueryVariables>(ReceiptBookDocument, options);
}
export function useReceiptBookSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReceiptBookQuery, ReceiptBookQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ReceiptBookQuery, ReceiptBookQueryVariables>(ReceiptBookDocument, options);
}
export type ReceiptBookQueryHookResult = ReturnType<typeof useReceiptBookQuery>;
export type ReceiptBookLazyQueryHookResult = ReturnType<typeof useReceiptBookLazyQuery>;
export type ReceiptBookSuspenseQueryHookResult = ReturnType<typeof useReceiptBookSuspenseQuery>;
export type ReceiptBookQueryResult = Apollo.QueryResult<ReceiptBookQuery, ReceiptBookQueryVariables>;
export const ReceiptBooksDocument = gql`
  query ReceiptBooks($paginate: PaginationInput, $where: WhereOptionsReceiptBook) {
    receiptBooks: ReceiptBooks(paginate: $paginate, where: $where) {
      results {
        id
        uuid
        receiptBookNumber
        receiptSeries
        totalReceipts
        financialYear
        receipts {
          id
          uuid
          receiptNumber
          financialYear
          date
          mobileNumber
          name
          address
          amount
          modeOfPayment
          aadharNumber
          panNumber
          idCode
          cancelled
        }
        usedReceipts
      }
      pageInfo {
        hasNextPage
        currentPage
        hasPreviousPage
        itemCount
        pageCount
        pageItemCount
        perPage
      }
    }
  }
`;

/**
 * __useReceiptBooksQuery__
 *
 * To run a query within a React component, call `useReceiptBooksQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptBooksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptBooksQuery({
 *   variables: {
 *      paginate: // value for 'paginate'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useReceiptBooksQuery(baseOptions?: Apollo.QueryHookOptions<ReceiptBooksQuery, ReceiptBooksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReceiptBooksQuery, ReceiptBooksQueryVariables>(ReceiptBooksDocument, options);
}
export function useReceiptBooksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceiptBooksQuery, ReceiptBooksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReceiptBooksQuery, ReceiptBooksQueryVariables>(ReceiptBooksDocument, options);
}
export function useReceiptBooksSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReceiptBooksQuery, ReceiptBooksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ReceiptBooksQuery, ReceiptBooksQueryVariables>(ReceiptBooksDocument, options);
}
export type ReceiptBooksQueryHookResult = ReturnType<typeof useReceiptBooksQuery>;
export type ReceiptBooksLazyQueryHookResult = ReturnType<typeof useReceiptBooksLazyQuery>;
export type ReceiptBooksSuspenseQueryHookResult = ReturnType<typeof useReceiptBooksSuspenseQuery>;
export type ReceiptBooksQueryResult = Apollo.QueryResult<ReceiptBooksQuery, ReceiptBooksQueryVariables>;
export const UpdateReceiptBookDocument = gql`
  mutation UpdateReceiptBook($updateReceiptBookId: String!, $item: UpdateReceiptBook!) {
    updatedReceiptBook: updateReceiptBook(id: $updateReceiptBookId, item: $item) {
      id
      uuid
      receiptBookNumber
      receiptSeries
      totalReceipts
      financialYear
      receipts {
        id
        uuid
        receiptNumber
        financialYear
        date
        mobileNumber
        name
        address
        amount
        modeOfPayment
        aadharNumber
        panNumber
        idCode
        cancelled
      }
      usedReceipts
    }
  }
`;
export type UpdateReceiptBookMutationFn = Apollo.MutationFunction<UpdateReceiptBookMutation, UpdateReceiptBookMutationVariables>;

/**
 * __useUpdateReceiptBookMutation__
 *
 * To run a mutation, you first call `useUpdateReceiptBookMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReceiptBookMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReceiptBookMutation, { data, loading, error }] = useUpdateReceiptBookMutation({
 *   variables: {
 *      updateReceiptBookId: // value for 'updateReceiptBookId'
 *      item: // value for 'item'
 *   },
 * });
 */
export function useUpdateReceiptBookMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateReceiptBookMutation, UpdateReceiptBookMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateReceiptBookMutation, UpdateReceiptBookMutationVariables>(UpdateReceiptBookDocument, options);
}
export type UpdateReceiptBookMutationHookResult = ReturnType<typeof useUpdateReceiptBookMutation>;
export type UpdateReceiptBookMutationResult = Apollo.MutationResult<UpdateReceiptBookMutation>;
export type UpdateReceiptBookMutationOptions = Apollo.BaseMutationOptions<UpdateReceiptBookMutation, UpdateReceiptBookMutationVariables>;
export const CreateReceiptDocument = gql`
  mutation CreateReceipt($item: CreateReceipt!) {
    createdReceipt: createReceipt(item: $item) {
      id
      uuid
      receiptNumber
      financialYear
      date
      mobileNumber
      name
      address
      amount
      modeOfPayment
      aadharNumber
      panNumber
      idCode
      cancelled
    }
  }
`;
export type CreateReceiptMutationFn = Apollo.MutationFunction<CreateReceiptMutation, CreateReceiptMutationVariables>;

/**
 * __useCreateReceiptMutation__
 *
 * To run a mutation, you first call `useCreateReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReceiptMutation, { data, loading, error }] = useCreateReceiptMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useCreateReceiptMutation(baseOptions?: Apollo.MutationHookOptions<CreateReceiptMutation, CreateReceiptMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateReceiptMutation, CreateReceiptMutationVariables>(CreateReceiptDocument, options);
}
export type CreateReceiptMutationHookResult = ReturnType<typeof useCreateReceiptMutation>;
export type CreateReceiptMutationResult = Apollo.MutationResult<CreateReceiptMutation>;
export type CreateReceiptMutationOptions = Apollo.BaseMutationOptions<CreateReceiptMutation, CreateReceiptMutationVariables>;
export const DeleteReceiptDocument = gql`
  mutation DeleteReceipt($deleteReceiptId: String!) {
    deletedReceipt: deleteReceipt(id: $deleteReceiptId) {
      id
      uuid
      receiptNumber
      financialYear
      date
      mobileNumber
      name
      address
      amount
      modeOfPayment
      aadharNumber
      panNumber
      idCode
      cancelled
    }
  }
`;
export type DeleteReceiptMutationFn = Apollo.MutationFunction<DeleteReceiptMutation, DeleteReceiptMutationVariables>;

/**
 * __useDeleteReceiptMutation__
 *
 * To run a mutation, you first call `useDeleteReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReceiptMutation, { data, loading, error }] = useDeleteReceiptMutation({
 *   variables: {
 *      deleteReceiptId: // value for 'deleteReceiptId'
 *   },
 * });
 */
export function useDeleteReceiptMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReceiptMutation, DeleteReceiptMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteReceiptMutation, DeleteReceiptMutationVariables>(DeleteReceiptDocument, options);
}
export type DeleteReceiptMutationHookResult = ReturnType<typeof useDeleteReceiptMutation>;
export type DeleteReceiptMutationResult = Apollo.MutationResult<DeleteReceiptMutation>;
export type DeleteReceiptMutationOptions = Apollo.BaseMutationOptions<DeleteReceiptMutation, DeleteReceiptMutationVariables>;
export const ReceiptDocument = gql`
  query Receipt($where: WhereOptionsReceipt) {
    receipt: Receipt(where: $where) {
      id
      uuid
      receiptNumber
      financialYear
      date
      mobileNumber
      name
      address
      amount
      modeOfPayment
      aadharNumber
      panNumber
      idCode
      cancelled
    }
  }
`;

/**
 * __useReceiptQuery__
 *
 * To run a query within a React component, call `useReceiptQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useReceiptQuery(baseOptions?: Apollo.QueryHookOptions<ReceiptQuery, ReceiptQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, options);
}
export function useReceiptLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceiptQuery, ReceiptQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, options);
}
export function useReceiptSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReceiptQuery, ReceiptQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ReceiptQuery, ReceiptQueryVariables>(ReceiptDocument, options);
}
export type ReceiptQueryHookResult = ReturnType<typeof useReceiptQuery>;
export type ReceiptLazyQueryHookResult = ReturnType<typeof useReceiptLazyQuery>;
export type ReceiptSuspenseQueryHookResult = ReturnType<typeof useReceiptSuspenseQuery>;
export type ReceiptQueryResult = Apollo.QueryResult<ReceiptQuery, ReceiptQueryVariables>;
export const ReceiptsAllDocument = gql`
  query ReceiptsAll {
    receipts: ReceiptsAll {
      id
      uuid
      receiptNumber
      financialYear
      date
      mobileNumber
      name
      address
      amount
      aadharNumber
      panNumber
      cancelled
    }
  }
`;

/**
 * __useReceiptsAllQuery__
 *
 * To run a query within a React component, call `useReceiptsAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptsAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptsAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useReceiptsAllQuery(baseOptions?: Apollo.QueryHookOptions<ReceiptsAllQuery, ReceiptsAllQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReceiptsAllQuery, ReceiptsAllQueryVariables>(ReceiptsAllDocument, options);
}
export function useReceiptsAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceiptsAllQuery, ReceiptsAllQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReceiptsAllQuery, ReceiptsAllQueryVariables>(ReceiptsAllDocument, options);
}
export function useReceiptsAllSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReceiptsAllQuery, ReceiptsAllQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ReceiptsAllQuery, ReceiptsAllQueryVariables>(ReceiptsAllDocument, options);
}
export type ReceiptsAllQueryHookResult = ReturnType<typeof useReceiptsAllQuery>;
export type ReceiptsAllLazyQueryHookResult = ReturnType<typeof useReceiptsAllLazyQuery>;
export type ReceiptsAllSuspenseQueryHookResult = ReturnType<typeof useReceiptsAllSuspenseQuery>;
export type ReceiptsAllQueryResult = Apollo.QueryResult<ReceiptsAllQuery, ReceiptsAllQueryVariables>;
export const ReceiptsDocument = gql`
  query Receipts($where: WhereOptionsReceipt, $paginate: PaginationInput) {
    receipts: Receipts(where: $where, paginate: $paginate) {
      pageInfo {
        perPage
        currentPage
        hasPreviousPage
        hasNextPage
        itemCount
        pageCount
        pageItemCount
      }
      results {
        id
        uuid
        receiptNumber
        financialYear
        date
        mobileNumber
        name
        address
        amount
        modeOfPayment
        aadharNumber
        panNumber
        idCode
        cancelled
      }
    }
  }
`;

/**
 * __useReceiptsQuery__
 *
 * To run a query within a React component, call `useReceiptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReceiptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReceiptsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      paginate: // value for 'paginate'
 *   },
 * });
 */
export function useReceiptsQuery(baseOptions?: Apollo.QueryHookOptions<ReceiptsQuery, ReceiptsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ReceiptsQuery, ReceiptsQueryVariables>(ReceiptsDocument, options);
}
export function useReceiptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReceiptsQuery, ReceiptsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ReceiptsQuery, ReceiptsQueryVariables>(ReceiptsDocument, options);
}
export function useReceiptsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ReceiptsQuery, ReceiptsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<ReceiptsQuery, ReceiptsQueryVariables>(ReceiptsDocument, options);
}
export type ReceiptsQueryHookResult = ReturnType<typeof useReceiptsQuery>;
export type ReceiptsLazyQueryHookResult = ReturnType<typeof useReceiptsLazyQuery>;
export type ReceiptsSuspenseQueryHookResult = ReturnType<typeof useReceiptsSuspenseQuery>;
export type ReceiptsQueryResult = Apollo.QueryResult<ReceiptsQuery, ReceiptsQueryVariables>;
export const UpdateReceiptDocument = gql`
  mutation UpdateReceipt($updateReceiptId: String!, $item: UpdateReceipt!) {
    updatedReceipt: updateReceipt(id: $updateReceiptId, item: $item) {
      id
      uuid
      receiptNumber
      financialYear
      date
      mobileNumber
      name
      address
      amount
      modeOfPayment
      aadharNumber
      panNumber
      idCode
      cancelled
      receiptBook {
        id
      }
    }
  }
`;
export type UpdateReceiptMutationFn = Apollo.MutationFunction<UpdateReceiptMutation, UpdateReceiptMutationVariables>;

/**
 * __useUpdateReceiptMutation__
 *
 * To run a mutation, you first call `useUpdateReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReceiptMutation, { data, loading, error }] = useUpdateReceiptMutation({
 *   variables: {
 *      updateReceiptId: // value for 'updateReceiptId'
 *      item: // value for 'item'
 *   },
 * });
 */
export function useUpdateReceiptMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReceiptMutation, UpdateReceiptMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateReceiptMutation, UpdateReceiptMutationVariables>(UpdateReceiptDocument, options);
}
export type UpdateReceiptMutationHookResult = ReturnType<typeof useUpdateReceiptMutation>;
export type UpdateReceiptMutationResult = Apollo.MutationResult<UpdateReceiptMutation>;
export type UpdateReceiptMutationOptions = Apollo.BaseMutationOptions<UpdateReceiptMutation, UpdateReceiptMutationVariables>;
export const UserDocument = gql`
  query User($where: WhereOptionsUser) {
    user: User(where: $where) {
      userId
      firstName
      lastName
      roles {
        name
        permissions
      }
    }
  }
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
