export const customBookingById = `query CustomBookingById(
 $id: ID!
) {
 bookingById(
   id: $id
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
     order {
       status
     }
     pets {
       items {
         pet {
           birthdate
           imageUrl
           name
         }
       }
       nextToken
     }
     serviceProvider {
       name
       displayName
       address {
         blockNumber
         postalCode
         streetName
         unitNumber
       }
     }
     timeSlot {
       id
       startDateTime
       endDateTime
     }
     __typename
   }
   nextToken
   __typename
 }
}`;

export const customBookingsByCustomer = `query CustomBookingsByCustomer(
 $customerId: ID!
) {
 bookingsByCustomer(
   customerId: $customerId
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
     timeSlotBookingsServiceId
     timeSlotBookingsStartDateTime
     pets {
       items {
         pet {
           name
           birthdate
           imageUrl
         }
       }
     }
   }
 }
}`;
