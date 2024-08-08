import { graphqlClient } from "./core";
import {
  getPet,
  getQuestion,
  getQuestionAnswer,
  petBookingsByBookingCustomerUsernameAndBookingtimeSlotId,
  petsByCustomer,
} from "./graphql/queries";
import {
  BookingStatus,
  CreatePetInput,
  ModelIDKeyConditionInput,
  QuestionAnswer,
  UpdatePetInput,
} from "./graphql/API";
import { createPet, updatePet } from "./graphql/mutations";
import { ConsoleLogger } from "aws-amplify/utils";
import {
  BadRequestError,
  ConflictError,
  CustomError,
  InternalServerError,
  NotFoundError,
} from "./errors";
import {
  fetchBooking,
  fetchBookingsByPet,
  fetchServiceById,
} from "./service-booking";
import { customListQuestionAnswers } from "./graphql/custom";

const logger = new ConsoleLogger("api/pets.ts");

// Create
export const addPet = async (input: CreatePetInput) => {
  try {
    const petTypeString = input.petType.toString();
    input["breedName"] =
      input.breedName === ""
        ? `Unknown ${petTypeString.charAt(0) + petTypeString.slice(1).toLowerCase()} Breed`
        : input.breedName;
    const result = await graphqlClient.graphql({
      query: createPet,
      variables: {
        input,
      },
    });
    logger.info("Called createPet mutation");
    return result.data.createPet;
  } catch (error) {
    logger.error("Error creating pet: ", error);
    throw new InternalServerError("Error creating pet");
  }
};

// Read
export const fetchPetsByCustomer = async (customerId: string) => {
  try {
    if (!customerId) {
      logger.error("Customer id is required");
      throw new BadRequestError("Customer id is required");
    }

    const result = await graphqlClient.graphql({
      query: petsByCustomer,
      variables: {
        customerId,
        filter: {
          isDeleted: { eq: false },
        },
      },
    });
    logger.info("Called petsByOwner query");
    return result.data.petsByCustomer.items;
  } catch (error) {
    logger.error(`Error fetching pets owned by ${customerId}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching pets");
  }
};

export const fetchPetsByBooking = async (
  customerUsername: string,
  timeSlotId: string
) => {
  try {
    if (!customerUsername) {
      logger.error("Customer username is required");
      throw new BadRequestError("Customer username is required");
    }

    if (!timeSlotId) {
      logger.error("Time slot id is required");
      throw new BadRequestError("Time slot id is required");
    }

    const result = await graphqlClient.graphql({
      query: petBookingsByBookingCustomerUsernameAndBookingtimeSlotId,
      variables: {
        bookingCustomerUsername: customerUsername,
        bookingtimeSlotId: { eq: timeSlotId } as ModelIDKeyConditionInput,
      },
    });
    logger.info(
      "Called petBookingsByBookingCustomerUsernameAndBookingtimeSlotId query"
    );
    const petBookings =
      result.data.petBookingsByBookingCustomerUsernameAndBookingtimeSlotId
        .items;
    return petBookings;
  } catch (error) {
    logger.error(
      `Error fetching bookings for customer ${customerUsername} at time slot ${timeSlotId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching bookings");
  }
};

export const fetchPet = async (id: string) => {
  try {
    const result = await graphqlClient.graphql({
      query: getPet,
      variables: {
        id,
      },
    });
    logger.info("Called getPet query");

    const pet = result.data.getPet;
    if (!pet) {
      logger.error(`Pet id=${id} not found`);
      throw new NotFoundError("Pet not found");
    }

    if (pet.isDeleted) {
      logger.error(`Pet id=${id} is already deleted`);
      throw new NotFoundError("Pet is deleted");
    }
    return pet;
  } catch (error) {
    logger.error(`Error fetching pet id=${id}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching pet");
  }
};

export const fetchPetQuestionAnswersForService = async (
  serviceId: string,
  petId: string
) => {
  if (!serviceId) {
    logger.error("Service ID is required");
    throw new BadRequestError("Service ID is required");
  }

  if (!petId) {
    logger.error("Pet ID is required");
    throw new BadRequestError("Pet ID is required");
  }

  try {
    const service = await fetchServiceById(serviceId);
    if (!service) {
      logger.error(`Service with id=${serviceId} not found`);
      throw new NotFoundError("Service not found");
    }

    if (
      !service.requiredQuestionIds ||
      service.requiredQuestionIds.length === 0
    ) {
      logger.warn(`Service with id=${serviceId} does not have any questions`);
      return [];
    }

    const promises = service.requiredQuestionIds.map(async (id) => {
      try {
        const questionAnswer = await graphqlClient.graphql({
          query: getQuestionAnswer,
          variables: {
            id,
          },
        });
        const question = await graphqlClient.graphql({
          query: getQuestion,
          variables: {
            id,
          },
        });
        return {
          id,
          question: question?.data.getQuestion?.questionString,
          answer: questionAnswer.data.getQuestionAnswer?.answer,
        };
      } catch (error) {
        logger.error(
          `Error fetching answer for question with id=${id}: `,
          error
        );
        return null;
      }
    });
    return await Promise.all(promises);
  } catch (error) {
    logger.error(
      `Error fetching question answers for pet id=${petId} for service id=${serviceId}: `,
      error
    );
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching question answers");
  }
};

// Update
export const modifyPet = async (input: UpdatePetInput) => {
  try {
    const pet = await fetchPet(input.id);
    if (!pet) {
      logger.error(`Pet id=${input.id} not found`);
      throw new NotFoundError("Pet not found");
    }

    if (pet.isDeleted) {
      logger.error(`Pet id=${input.id} is already deleted`);
      throw new ConflictError("Pet is already deleted");
    }

    const result = await graphqlClient.graphql({
      query: updatePet,
      variables: {
        input,
      },
    });
    logger.info("Called updatePet mutation");
    return result.data.updatePet;
  } catch (error) {
    logger.error("Error updating pet: ", error);
    throw new InternalServerError("Error updating pet");
  }
};

// SOFT Delete
export const removePet = async (id: string) => {
  try {
    const petBookings = await fetchBookingsByPet(id);
    if (petBookings.length > 0) {
      petBookings.map(async (petBooking) => {
        const { booking } = await fetchBooking(
          petBooking.bookingCustomerUsername,
          petBooking.bookingtimeSlotId
        );
        if (
          booking?.status !== BookingStatus.COMPLETED &&
          booking?.status !== BookingStatus.CANCELLED
        ) {
          logger.error(`Pet id=${id} has an active booking`);
          throw new ConflictError("Pet has a booking that is not cancelled");
        }
      });
    }

    logger.info(`Initiating soft deletion of pet id=${id}`);
    return await graphqlClient.graphql({
      query: updatePet,
      variables: {
        input: {
          id,
          isDeleted: true,
        },
      },
    });
  } catch (error) {
    logger.error("Error deleting pet: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error deleting pet");
  }
};

export const fetchPetQuestionAnswers = async ({
  petId,
}: {
  petId: string;
  serviceId?: string;
}) => {
  try {
    const result: any = await graphqlClient.graphql({
      query: customListQuestionAnswers,
      variables: { petId },
    });
    return result.data.listQuestionAnswers.items as QuestionAnswer[];
  } catch (error) {
    logger.error("Error fetching pet question answers: ", error);
  }
};
