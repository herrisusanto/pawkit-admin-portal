import { graphqlClient } from "./core";
import { getPet, petsByCustomer } from "../graphql/queries";
import { CreatePetInput, UpdatePetInput } from "../API";
import { createPet, deletePet, updatePet } from "../graphql/mutations";
import { ConsoleLogger } from "aws-amplify/utils";
import { BadRequestError, CustomError, InternalServerError } from "./errors";

const logger = new ConsoleLogger("api/pets.ts");

// Create
export const addPet = async (input: CreatePetInput) => {
  try {
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

export const fetchPet = async (customerUsername: string, name: string) => {
  try {
    if (!customerUsername) {
      logger.error("Customer username is required");
      throw new BadRequestError("Customer username is required");
    }

    if (!name) {
      logger.error("Pet name is required");
      throw new BadRequestError("Pet name is required");
    }

    const result = await graphqlClient.graphql({
      query: getPet,
      variables: {
        name,
        customerUsername,
      },
    });
    logger.info("Called getPet query");
    return result.data.getPet;
  } catch (error) {
    logger.error(`Error fetching pet named ${name}: `, error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error fetching pet");
  }
};

// Update
export const modifyPet = async (input: UpdatePetInput) => {
  try {
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

// Delete
export const removePet = async (customerUsername: string, name: string) => {
  try {
    if (!customerUsername) {
      logger.error("Customer username is required");
      throw new BadRequestError("Customer username is required");
    }

    if (!name) {
      logger.error("Pet name is required");
      throw new BadRequestError("Pet name is required");
    }

    const result = await graphqlClient.graphql({
      query: deletePet,
      variables: {
        input: {
          name,
          customerUsername,
        },
      },
    });
    logger.info("Called deletePet mutation");
    return result.data.deletePet;
  } catch (error) {
    logger.error("Error deleting pet: ", error);
    if (error instanceof CustomError) throw error;
    throw new InternalServerError("Error deleting pet");
  }
};
