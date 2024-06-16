/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getBooking = /* GraphQL */ `query GetBooking($customerUsername: String!, $timeSlotId: ID!) {
  getBooking(customerUsername: $customerUsername, timeSlotId: $timeSlotId) {
    id
    customerUsername
    owners
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    serviceName
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      imageUrl
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    serviceCategory
    petType
    serviceId
    startDateTime
    timeSlot {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    timeSlotId
    pets {
      nextToken
      __typename
    }
    addOns
    bookingType
    amount
    currency
    status
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    serviceProviderBookingsName
    timeSlotBookingsServiceId
    timeSlotBookingsStartDateTime
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBookingQueryVariables,
  APITypes.GetBookingQuery
>;
export const listBookings = /* GraphQL */ `query ListBookings(
  $customerUsername: String
  $timeSlotId: ModelIDKeyConditionInput
  $filter: ModelBookingFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listBookings(
    customerUsername: $customerUsername
    timeSlotId: $timeSlotId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      addOns
      bookingType
      amount
      currency
      status
      orderId
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBookingsQueryVariables,
  APITypes.ListBookingsQuery
>;
export const bookingById = /* GraphQL */ `query BookingById(
  $id: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelBookingFilterInput
  $limit: Int
  $nextToken: String
) {
  bookingById(
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      addOns
      bookingType
      amount
      currency
      status
      orderId
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BookingByIdQueryVariables,
  APITypes.BookingByIdQuery
>;
export const bookingsByCustomer = /* GraphQL */ `query BookingsByCustomer(
  $customerId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelBookingFilterInput
  $limit: Int
  $nextToken: String
) {
  bookingsByCustomer(
    customerId: $customerId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      addOns
      bookingType
      amount
      currency
      status
      orderId
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BookingsByCustomerQueryVariables,
  APITypes.BookingsByCustomerQuery
>;
export const bookingsByService = /* GraphQL */ `query BookingsByService(
  $serviceId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelBookingFilterInput
  $limit: Int
  $nextToken: String
) {
  bookingsByService(
    serviceId: $serviceId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      addOns
      bookingType
      amount
      currency
      status
      orderId
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BookingsByServiceQueryVariables,
  APITypes.BookingsByServiceQuery
>;
export const bookingsByStartDateTime = /* GraphQL */ `query BookingsByStartDateTime(
  $startDateTime: AWSDateTime!
  $sortDirection: ModelSortDirection
  $filter: ModelBookingFilterInput
  $limit: Int
  $nextToken: String
) {
  bookingsByStartDateTime(
    startDateTime: $startDateTime
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      addOns
      bookingType
      amount
      currency
      status
      orderId
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BookingsByStartDateTimeQueryVariables,
  APITypes.BookingsByStartDateTimeQuery
>;
export const bookingsByTimeSlot = /* GraphQL */ `query BookingsByTimeSlot(
  $timeSlotId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelBookingFilterInput
  $limit: Int
  $nextToken: String
) {
  bookingsByTimeSlot(
    timeSlotId: $timeSlotId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      addOns
      bookingType
      amount
      currency
      status
      orderId
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BookingsByTimeSlotQueryVariables,
  APITypes.BookingsByTimeSlotQuery
>;
export const bookingsByOrder = /* GraphQL */ `query BookingsByOrder(
  $orderId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelBookingFilterInput
  $limit: Int
  $nextToken: String
) {
  bookingsByOrder(
    orderId: $orderId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      addOns
      bookingType
      amount
      currency
      status
      orderId
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BookingsByOrderQueryVariables,
  APITypes.BookingsByOrderQuery
>;
export const searchBookings = /* GraphQL */ `query SearchBookings(
  $filter: SearchableBookingFilterInput
  $sort: [SearchableBookingSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableBookingAggregationInput]
) {
  searchBookings(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      id
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      addOns
      bookingType
      amount
      currency
      status
      orderId
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchBookingsQueryVariables,
  APITypes.SearchBookingsQuery
>;
export const getBreed = /* GraphQL */ `query GetBreed($name: String!) {
  getBreed(name: $name) {
    name
    petType
    coats
    undercoatRemoval
    durationUnit
    basicGroomingDuration
    fullGroomingDuration
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetBreedQueryVariables, APITypes.GetBreedQuery>;
export const listBreeds = /* GraphQL */ `query ListBreeds(
  $name: String
  $filter: ModelBreedFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listBreeds(
    name: $name
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      name
      petType
      coats
      undercoatRemoval
      durationUnit
      basicGroomingDuration
      fullGroomingDuration
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBreedsQueryVariables,
  APITypes.ListBreedsQuery
>;
export const breedsByPetType = /* GraphQL */ `query BreedsByPetType(
  $petType: PetType!
  $sortDirection: ModelSortDirection
  $filter: ModelBreedFilterInput
  $limit: Int
  $nextToken: String
) {
  breedsByPetType(
    petType: $petType
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      name
      petType
      coats
      undercoatRemoval
      durationUnit
      basicGroomingDuration
      fullGroomingDuration
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BreedsByPetTypeQueryVariables,
  APITypes.BreedsByPetTypeQuery
>;
export const getCustomer = /* GraphQL */ `query GetCustomer($id: ID!) {
  getCustomer(id: $id) {
    id
    username
    isDeactivated
    imageUrl
    address {
      blockNumber
      streetName
      unitNumber
      postalCode
      __typename
    }
    acceptedDisclaimers {
      nextToken
      __typename
    }
    pets {
      nextToken
      __typename
    }
    bookings {
      nextToken
      __typename
    }
    orders {
      nextToken
      __typename
    }
    payments {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCustomerQueryVariables,
  APITypes.GetCustomerQuery
>;
export const listCustomers = /* GraphQL */ `query ListCustomers(
  $id: ID
  $filter: ModelCustomerFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listCustomers(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCustomersQueryVariables,
  APITypes.ListCustomersQuery
>;
export const customerByUsername = /* GraphQL */ `query CustomerByUsername(
  $username: String!
  $sortDirection: ModelSortDirection
  $filter: ModelCustomerFilterInput
  $limit: Int
  $nextToken: String
) {
  customerByUsername(
    username: $username
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CustomerByUsernameQueryVariables,
  APITypes.CustomerByUsernameQuery
>;
export const getDisclaimer = /* GraphQL */ `query GetDisclaimer($name: String!) {
  getDisclaimer(name: $name) {
    name
    serviceName
    serviceProviderName
    serviceCategory
    petType
    service {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    text
    s3Link
    supersededBy {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    supersessionDate
    customerAcceptances {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDisclaimerQueryVariables,
  APITypes.GetDisclaimerQuery
>;
export const listDisclaimers = /* GraphQL */ `query ListDisclaimers(
  $name: String
  $filter: ModelDisclaimerFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDisclaimers(
    name: $name
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDisclaimersQueryVariables,
  APITypes.ListDisclaimersQuery
>;
export const getDisclaimerAcceptance = /* GraphQL */ `query GetDisclaimerAcceptance($id: ID!) {
  getDisclaimerAcceptance(id: $id) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    disclaimerName
    disclaimer {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetDisclaimerAcceptanceQueryVariables,
  APITypes.GetDisclaimerAcceptanceQuery
>;
export const listDisclaimerAcceptances = /* GraphQL */ `query ListDisclaimerAcceptances(
  $id: ID
  $filter: ModelDisclaimerAcceptanceFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listDisclaimerAcceptances(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      customerId
      disclaimerName
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListDisclaimerAcceptancesQueryVariables,
  APITypes.ListDisclaimerAcceptancesQuery
>;
export const acceptancesByCustomer = /* GraphQL */ `query AcceptancesByCustomer(
  $customerId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelDisclaimerAcceptanceFilterInput
  $limit: Int
  $nextToken: String
) {
  acceptancesByCustomer(
    customerId: $customerId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      customerId
      disclaimerName
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AcceptancesByCustomerQueryVariables,
  APITypes.AcceptancesByCustomerQuery
>;
export const acceptancesByDisclaimer = /* GraphQL */ `query AcceptancesByDisclaimer(
  $disclaimerName: String!
  $sortDirection: ModelSortDirection
  $filter: ModelDisclaimerAcceptanceFilterInput
  $limit: Int
  $nextToken: String
) {
  acceptancesByDisclaimer(
    disclaimerName: $disclaimerName
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      customerId
      disclaimerName
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AcceptancesByDisclaimerQueryVariables,
  APITypes.AcceptancesByDisclaimerQuery
>;
export const getOrder = /* GraphQL */ `query GetOrder($id: ID!) {
  getOrder(id: $id) {
    id
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    currency
    totalAmount
    pendingRefundAmount
    refundedAmount
    bookingIds
    bookings {
      nextToken
      __typename
    }
    paymentRequestId
    payment {
      paymentRequestId
      orderId
      customerId
      name
      email
      phone
      amount
      currency
      requestCreatedAt
      requestUpdatedAt
      status
      purpose
      referenceNumber
      paymentId
      paymentMethod
      url
      webhookUrl
      redirectUrl
      sendSMS
      sendEmail
      smsStatus
      emailStatus
      allowRepeatedPayments
      expiryDateTime
      errors
      createdAt
      updatedAt
      __typename
    }
    status
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetOrderQueryVariables, APITypes.GetOrderQuery>;
export const listOrders = /* GraphQL */ `query ListOrders(
  $id: ID
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listOrders(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListOrdersQueryVariables,
  APITypes.ListOrdersQuery
>;
export const ordersByCustomer = /* GraphQL */ `query OrdersByCustomer(
  $customerId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  ordersByCustomer(
    customerId: $customerId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.OrdersByCustomerQueryVariables,
  APITypes.OrdersByCustomerQuery
>;
export const searchOrders = /* GraphQL */ `query SearchOrders(
  $filter: SearchableOrderFilterInput
  $sort: [SearchableOrderSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableOrderAggregationInput]
) {
  searchOrders(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchOrdersQueryVariables,
  APITypes.SearchOrdersQuery
>;
export const getPayment = /* GraphQL */ `query GetPayment($paymentRequestId: ID!) {
  getPayment(paymentRequestId: $paymentRequestId) {
    paymentRequestId
    orderId
    order {
      id
      customerId
      currency
      totalAmount
      pendingRefundAmount
      refundedAmount
      bookingIds
      paymentRequestId
      status
      createdAt
      updatedAt
      __typename
    }
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    name
    email
    phone
    amount
    currency
    requestCreatedAt
    requestUpdatedAt
    status
    purpose
    referenceNumber
    paymentId
    paymentMethod
    url
    webhookUrl
    redirectUrl
    sendSMS
    sendEmail
    smsStatus
    emailStatus
    allowRepeatedPayments
    expiryDateTime
    errors
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPaymentQueryVariables,
  APITypes.GetPaymentQuery
>;
export const listPayments = /* GraphQL */ `query ListPayments(
  $paymentRequestId: ID
  $filter: ModelPaymentFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPayments(
    paymentRequestId: $paymentRequestId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      paymentRequestId
      orderId
      customerId
      name
      email
      phone
      amount
      currency
      requestCreatedAt
      requestUpdatedAt
      status
      purpose
      referenceNumber
      paymentId
      paymentMethod
      url
      webhookUrl
      redirectUrl
      sendSMS
      sendEmail
      smsStatus
      emailStatus
      allowRepeatedPayments
      expiryDateTime
      errors
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPaymentsQueryVariables,
  APITypes.ListPaymentsQuery
>;
export const paymentsByOrder = /* GraphQL */ `query PaymentsByOrder(
  $orderId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPaymentFilterInput
  $limit: Int
  $nextToken: String
) {
  paymentsByOrder(
    orderId: $orderId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      paymentRequestId
      orderId
      customerId
      name
      email
      phone
      amount
      currency
      requestCreatedAt
      requestUpdatedAt
      status
      purpose
      referenceNumber
      paymentId
      paymentMethod
      url
      webhookUrl
      redirectUrl
      sendSMS
      sendEmail
      smsStatus
      emailStatus
      allowRepeatedPayments
      expiryDateTime
      errors
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PaymentsByOrderQueryVariables,
  APITypes.PaymentsByOrderQuery
>;
export const paymentsByCustomer = /* GraphQL */ `query PaymentsByCustomer(
  $customerId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPaymentFilterInput
  $limit: Int
  $nextToken: String
) {
  paymentsByCustomer(
    customerId: $customerId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      paymentRequestId
      orderId
      customerId
      name
      email
      phone
      amount
      currency
      requestCreatedAt
      requestUpdatedAt
      status
      purpose
      referenceNumber
      paymentId
      paymentMethod
      url
      webhookUrl
      redirectUrl
      sendSMS
      sendEmail
      smsStatus
      emailStatus
      allowRepeatedPayments
      expiryDateTime
      errors
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PaymentsByCustomerQueryVariables,
  APITypes.PaymentsByCustomerQuery
>;
export const paymentsByRequestCreatedAt = /* GraphQL */ `query PaymentsByRequestCreatedAt(
  $requestCreatedAt: AWSDateTime!
  $sortDirection: ModelSortDirection
  $filter: ModelPaymentFilterInput
  $limit: Int
  $nextToken: String
) {
  paymentsByRequestCreatedAt(
    requestCreatedAt: $requestCreatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      paymentRequestId
      orderId
      customerId
      name
      email
      phone
      amount
      currency
      requestCreatedAt
      requestUpdatedAt
      status
      purpose
      referenceNumber
      paymentId
      paymentMethod
      url
      webhookUrl
      redirectUrl
      sendSMS
      sendEmail
      smsStatus
      emailStatus
      allowRepeatedPayments
      expiryDateTime
      errors
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PaymentsByRequestCreatedAtQueryVariables,
  APITypes.PaymentsByRequestCreatedAtQuery
>;
export const paymentsByRequestUpdatedAt = /* GraphQL */ `query PaymentsByRequestUpdatedAt(
  $requestUpdatedAt: AWSDateTime!
  $sortDirection: ModelSortDirection
  $filter: ModelPaymentFilterInput
  $limit: Int
  $nextToken: String
) {
  paymentsByRequestUpdatedAt(
    requestUpdatedAt: $requestUpdatedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      paymentRequestId
      orderId
      customerId
      name
      email
      phone
      amount
      currency
      requestCreatedAt
      requestUpdatedAt
      status
      purpose
      referenceNumber
      paymentId
      paymentMethod
      url
      webhookUrl
      redirectUrl
      sendSMS
      sendEmail
      smsStatus
      emailStatus
      allowRepeatedPayments
      expiryDateTime
      errors
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PaymentsByRequestUpdatedAtQueryVariables,
  APITypes.PaymentsByRequestUpdatedAtQuery
>;
export const paymentsByPaymentMethod = /* GraphQL */ `query PaymentsByPaymentMethod(
  $paymentMethod: PaymentMethod!
  $sortDirection: ModelSortDirection
  $filter: ModelPaymentFilterInput
  $limit: Int
  $nextToken: String
) {
  paymentsByPaymentMethod(
    paymentMethod: $paymentMethod
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      paymentRequestId
      orderId
      customerId
      name
      email
      phone
      amount
      currency
      requestCreatedAt
      requestUpdatedAt
      status
      purpose
      referenceNumber
      paymentId
      paymentMethod
      url
      webhookUrl
      redirectUrl
      sendSMS
      sendEmail
      smsStatus
      emailStatus
      allowRepeatedPayments
      expiryDateTime
      errors
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PaymentsByPaymentMethodQueryVariables,
  APITypes.PaymentsByPaymentMethodQuery
>;
export const searchPayments = /* GraphQL */ `query SearchPayments(
  $filter: SearchablePaymentFilterInput
  $sort: [SearchablePaymentSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchablePaymentAggregationInput]
) {
  searchPayments(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      paymentRequestId
      orderId
      customerId
      name
      email
      phone
      amount
      currency
      requestCreatedAt
      requestUpdatedAt
      status
      purpose
      referenceNumber
      paymentId
      paymentMethod
      url
      webhookUrl
      redirectUrl
      sendSMS
      sendEmail
      smsStatus
      emailStatus
      allowRepeatedPayments
      expiryDateTime
      errors
      createdAt
      updatedAt
      __typename
    }
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchPaymentsQueryVariables,
  APITypes.SearchPaymentsQuery
>;
export const getPet = /* GraphQL */ `query GetPet($name: String!, $customerUsername: String!) {
  getPet(name: $name, customerUsername: $customerUsername) {
    name
    customerUsername
    customerId
    customer {
      id
      username
      isDeactivated
      imageUrl
      createdAt
      updatedAt
      __typename
    }
    gender
    petType
    breedName
    breed {
      name
      petType
      coats
      undercoatRemoval
      durationUnit
      basicGroomingDuration
      fullGroomingDuration
      createdAt
      updatedAt
      __typename
    }
    imageUrl
    birthdate
    weightValue
    weightUnit
    additionalInfo
    predefinedBehaviors
    customBehaviors
    isNeutered
    isMicrochipped
    microchipNumber
    hasMedicalCondition
    additionalCareInstructions
    bookings {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPetQueryVariables, APITypes.GetPetQuery>;
export const listPets = /* GraphQL */ `query ListPets(
  $name: String
  $customerUsername: ModelStringKeyConditionInput
  $filter: ModelPetFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listPets(
    name: $name
    customerUsername: $customerUsername
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      name
      customerUsername
      customerId
      gender
      petType
      breedName
      imageUrl
      birthdate
      weightValue
      weightUnit
      additionalInfo
      predefinedBehaviors
      customBehaviors
      isNeutered
      isMicrochipped
      microchipNumber
      hasMedicalCondition
      additionalCareInstructions
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPetsQueryVariables, APITypes.ListPetsQuery>;
export const petsByCustomer = /* GraphQL */ `query PetsByCustomer(
  $customerId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPetFilterInput
  $limit: Int
  $nextToken: String
) {
  petsByCustomer(
    customerId: $customerId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      name
      customerUsername
      customerId
      gender
      petType
      breedName
      imageUrl
      birthdate
      weightValue
      weightUnit
      additionalInfo
      predefinedBehaviors
      customBehaviors
      isNeutered
      isMicrochipped
      microchipNumber
      hasMedicalCondition
      additionalCareInstructions
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PetsByCustomerQueryVariables,
  APITypes.PetsByCustomerQuery
>;
export const getService = /* GraphQL */ `query GetService(
  $name: String!
  $serviceProviderName: String!
  $serviceCategory: ServiceCategory!
  $petType: PetType!
) {
  getService(
    name: $name
    serviceProviderName: $serviceProviderName
    serviceCategory: $serviceCategory
    petType: $petType
  ) {
    id
    name
    serviceProviderName
    serviceProvider {
      id
      name
      displayName
      description
      imageUrl
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    serviceCategory
    petType
    defaultDisplay
    displayPriority
    onlinePaymentAccepted
    currency
    basePrice
    baseDuration
    baseDurationUnit
    additionalPetPrice
    additionalTimePrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xsWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    sWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    mWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    lWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xlWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    xxlWeightPrice {
      additionalDuration
      additionalDurationUnit
      minWeight
      maxWeight
      weightUnit
      amount
      __typename
    }
    shortDescription
    longDescription
    imageUrl
    serviceBreakdown
    additionalInfo
    faq
    goodToKnow
    parentServiceIds
    childServiceIds
    disclaimerName
    disclaimer {
      name
      serviceName
      serviceProviderName
      serviceCategory
      petType
      text
      s3Link
      supersessionDate
      createdAt
      updatedAt
      __typename
    }
    timeSlotIds
    bookingIds
    createdAt
    updatedAt
    serviceProviderId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetServiceQueryVariables,
  APITypes.GetServiceQuery
>;
export const listServices = /* GraphQL */ `query ListServices(
  $name: String
  $serviceProviderNameServiceCategoryPetType: ModelServicePrimaryCompositeKeyConditionInput
  $filter: ModelServiceFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listServices(
    name: $name
    serviceProviderNameServiceCategoryPetType: $serviceProviderNameServiceCategoryPetType
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListServicesQueryVariables,
  APITypes.ListServicesQuery
>;
export const serviceById = /* GraphQL */ `query ServiceById(
  $id: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelServiceFilterInput
  $limit: Int
  $nextToken: String
) {
  serviceById(
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ServiceByIdQueryVariables,
  APITypes.ServiceByIdQuery
>;
export const servicesByServiceProvider = /* GraphQL */ `query ServicesByServiceProvider(
  $serviceProviderName: String!
  $sortDirection: ModelSortDirection
  $filter: ModelServiceFilterInput
  $limit: Int
  $nextToken: String
) {
  servicesByServiceProvider(
    serviceProviderName: $serviceProviderName
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ServicesByServiceProviderQueryVariables,
  APITypes.ServicesByServiceProviderQuery
>;
export const servicesByCategory = /* GraphQL */ `query ServicesByCategory(
  $serviceCategory: ServiceCategory!
  $sortDirection: ModelSortDirection
  $filter: ModelServiceFilterInput
  $limit: Int
  $nextToken: String
) {
  servicesByCategory(
    serviceCategory: $serviceCategory
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ServicesByCategoryQueryVariables,
  APITypes.ServicesByCategoryQuery
>;
export const servicesByPetType = /* GraphQL */ `query ServicesByPetType(
  $petType: PetType!
  $sortDirection: ModelSortDirection
  $filter: ModelServiceFilterInput
  $limit: Int
  $nextToken: String
) {
  servicesByPetType(
    petType: $petType
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ServicesByPetTypeQueryVariables,
  APITypes.ServicesByPetTypeQuery
>;
export const servicesByPrice = /* GraphQL */ `query ServicesByPrice(
  $basePrice: Float!
  $sortDirection: ModelSortDirection
  $filter: ModelServiceFilterInput
  $limit: Int
  $nextToken: String
) {
  servicesByPrice(
    basePrice: $basePrice
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ServicesByPriceQueryVariables,
  APITypes.ServicesByPriceQuery
>;
export const servicesByDuration = /* GraphQL */ `query ServicesByDuration(
  $baseDuration: Int!
  $sortDirection: ModelSortDirection
  $filter: ModelServiceFilterInput
  $limit: Int
  $nextToken: String
) {
  servicesByDuration(
    baseDuration: $baseDuration
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ServicesByDurationQueryVariables,
  APITypes.ServicesByDurationQuery
>;
export const searchServices = /* GraphQL */ `query SearchServices(
  $filter: SearchableServiceFilterInput
  $sort: [SearchableServiceSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableServiceAggregationInput]
) {
  searchServices(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      id
      name
      serviceProviderName
      serviceCategory
      petType
      defaultDisplay
      displayPriority
      onlinePaymentAccepted
      currency
      basePrice
      baseDuration
      baseDurationUnit
      additionalPetPrice
      shortDescription
      longDescription
      imageUrl
      serviceBreakdown
      additionalInfo
      faq
      goodToKnow
      parentServiceIds
      childServiceIds
      disclaimerName
      timeSlotIds
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchServicesQueryVariables,
  APITypes.SearchServicesQuery
>;
export const getServiceProvider = /* GraphQL */ `query GetServiceProvider($name: String!) {
  getServiceProvider(name: $name) {
    id
    name
    displayName
    description
    imageUrl
    address {
      blockNumber
      streetName
      unitNumber
      postalCode
      __typename
    }
    website
    email
    phone
    operatingTimes {
      dayOfWeek
      openTime
      closeTime
      __typename
    }
    isHeadquarters
    headquarters {
      id
      name
      displayName
      description
      imageUrl
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    services {
      nextToken
      __typename
    }
    bookings {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    serviceProviderHeadquartersName
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetServiceProviderQueryVariables,
  APITypes.GetServiceProviderQuery
>;
export const listServiceProviders = /* GraphQL */ `query ListServiceProviders(
  $name: String
  $filter: ModelServiceProviderFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listServiceProviders(
    name: $name
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      name
      displayName
      description
      imageUrl
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListServiceProvidersQueryVariables,
  APITypes.ListServiceProvidersQuery
>;
export const serviceProviderById = /* GraphQL */ `query ServiceProviderById(
  $id: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelServiceProviderFilterInput
  $limit: Int
  $nextToken: String
) {
  serviceProviderById(
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      displayName
      description
      imageUrl
      website
      email
      phone
      isHeadquarters
      createdAt
      updatedAt
      serviceProviderHeadquartersName
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ServiceProviderByIdQueryVariables,
  APITypes.ServiceProviderByIdQuery
>;
export const getTimeSlot = /* GraphQL */ `query GetTimeSlot($serviceId: ID!, $startDateTime: AWSDateTime!) {
  getTimeSlot(serviceId: $serviceId, startDateTime: $startDateTime) {
    id
    serviceId
    startDateTime
    endDateTime
    capacity
    bookingCount
    isFull
    bookingIds
    bookings {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    serviceProviderId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetTimeSlotQueryVariables,
  APITypes.GetTimeSlotQuery
>;
export const listTimeSlots = /* GraphQL */ `query ListTimeSlots(
  $serviceId: ID
  $startDateTime: ModelStringKeyConditionInput
  $filter: ModelTimeSlotFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listTimeSlots(
    serviceId: $serviceId
    startDateTime: $startDateTime
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTimeSlotsQueryVariables,
  APITypes.ListTimeSlotsQuery
>;
export const timeSlotById = /* GraphQL */ `query TimeSlotById(
  $id: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTimeSlotFilterInput
  $limit: Int
  $nextToken: String
) {
  timeSlotById(
    id: $id
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TimeSlotByIdQueryVariables,
  APITypes.TimeSlotByIdQuery
>;
export const timeSlotsByStartDateTime = /* GraphQL */ `query TimeSlotsByStartDateTime(
  $startDateTime: AWSDateTime!
  $sortDirection: ModelSortDirection
  $filter: ModelTimeSlotFilterInput
  $limit: Int
  $nextToken: String
) {
  timeSlotsByStartDateTime(
    startDateTime: $startDateTime
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TimeSlotsByStartDateTimeQueryVariables,
  APITypes.TimeSlotsByStartDateTimeQuery
>;
export const timeSlotsByEndDateTime = /* GraphQL */ `query TimeSlotsByEndDateTime(
  $endDateTime: AWSDateTime!
  $sortDirection: ModelSortDirection
  $filter: ModelTimeSlotFilterInput
  $limit: Int
  $nextToken: String
) {
  timeSlotsByEndDateTime(
    endDateTime: $endDateTime
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TimeSlotsByEndDateTimeQueryVariables,
  APITypes.TimeSlotsByEndDateTimeQuery
>;
export const timeSlotsByCapacity = /* GraphQL */ `query TimeSlotsByCapacity(
  $capacity: Int!
  $sortDirection: ModelSortDirection
  $filter: ModelTimeSlotFilterInput
  $limit: Int
  $nextToken: String
) {
  timeSlotsByCapacity(
    capacity: $capacity
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TimeSlotsByCapacityQueryVariables,
  APITypes.TimeSlotsByCapacityQuery
>;
export const timeSlotsByBookingCount = /* GraphQL */ `query TimeSlotsByBookingCount(
  $bookingCount: Int!
  $sortDirection: ModelSortDirection
  $filter: ModelTimeSlotFilterInput
  $limit: Int
  $nextToken: String
) {
  timeSlotsByBookingCount(
    bookingCount: $bookingCount
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TimeSlotsByBookingCountQueryVariables,
  APITypes.TimeSlotsByBookingCountQuery
>;
export const searchTimeSlots = /* GraphQL */ `query SearchTimeSlots(
  $filter: SearchableTimeSlotFilterInput
  $sort: [SearchableTimeSlotSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableTimeSlotAggregationInput]
) {
  searchTimeSlots(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      id
      serviceId
      startDateTime
      endDateTime
      capacity
      bookingCount
      isFull
      bookingIds
      createdAt
      updatedAt
      serviceProviderId
      __typename
    }
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchTimeSlotsQueryVariables,
  APITypes.SearchTimeSlotsQuery
>;
export const getPetBookings = /* GraphQL */ `query GetPetBookings($id: ID!) {
  getPetBookings(id: $id) {
    id
    bookingCustomerUsername
    bookingtimeSlotId
    petName
    petcustomerUsername
    booking {
      id
      customerUsername
      owners
      customerId
      serviceName
      serviceProviderName
      serviceCategory
      petType
      serviceId
      startDateTime
      timeSlotId
      addOns
      bookingType
      amount
      currency
      status
      orderId
      createdAt
      updatedAt
      serviceProviderBookingsName
      timeSlotBookingsServiceId
      timeSlotBookingsStartDateTime
      __typename
    }
    pet {
      name
      customerUsername
      customerId
      gender
      petType
      breedName
      imageUrl
      birthdate
      weightValue
      weightUnit
      additionalInfo
      predefinedBehaviors
      customBehaviors
      isNeutered
      isMicrochipped
      microchipNumber
      hasMedicalCondition
      additionalCareInstructions
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    owners
    customerId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPetBookingsQueryVariables,
  APITypes.GetPetBookingsQuery
>;
export const listPetBookings = /* GraphQL */ `query ListPetBookings(
  $filter: ModelPetBookingsFilterInput
  $limit: Int
  $nextToken: String
) {
  listPetBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      bookingCustomerUsername
      bookingtimeSlotId
      petName
      petcustomerUsername
      createdAt
      updatedAt
      owners
      customerId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPetBookingsQueryVariables,
  APITypes.ListPetBookingsQuery
>;
export const petBookingsByBookingCustomerUsernameAndBookingtimeSlotId = /* GraphQL */ `query PetBookingsByBookingCustomerUsernameAndBookingtimeSlotId(
  $bookingCustomerUsername: String!
  $bookingtimeSlotId: ModelIDKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPetBookingsFilterInput
  $limit: Int
  $nextToken: String
) {
  petBookingsByBookingCustomerUsernameAndBookingtimeSlotId(
    bookingCustomerUsername: $bookingCustomerUsername
    bookingtimeSlotId: $bookingtimeSlotId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      bookingCustomerUsername
      bookingtimeSlotId
      petName
      petcustomerUsername
      createdAt
      updatedAt
      owners
      customerId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PetBookingsByBookingCustomerUsernameAndBookingtimeSlotIdQueryVariables,
  APITypes.PetBookingsByBookingCustomerUsernameAndBookingtimeSlotIdQuery
>;
export const petBookingsByPetNameAndPetcustomerUsername = /* GraphQL */ `query PetBookingsByPetNameAndPetcustomerUsername(
  $petName: String!
  $petcustomerUsername: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelPetBookingsFilterInput
  $limit: Int
  $nextToken: String
) {
  petBookingsByPetNameAndPetcustomerUsername(
    petName: $petName
    petcustomerUsername: $petcustomerUsername
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      bookingCustomerUsername
      bookingtimeSlotId
      petName
      petcustomerUsername
      createdAt
      updatedAt
      owners
      customerId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PetBookingsByPetNameAndPetcustomerUsernameQueryVariables,
  APITypes.PetBookingsByPetNameAndPetcustomerUsernameQuery
>;
