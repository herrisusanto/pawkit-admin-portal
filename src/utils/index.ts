import { CustomPrice, Service } from "../api/graphql/API";

export const getAdditionalPrice = (weight: number, service: Service) => {
  const keys: (keyof Service)[] = [
    "xsWeightPrice",
    "sWeightPrice",
    "mWeightPrice",
    "lWeightPrice",
    "xlWeightPrice",
    "xxlWeightPrice",
  ];
  let additionalPrice = 0;
  if (service) {
    keys.forEach((key) => {
      const customPrice = service[key] as CustomPrice;
      if (
        service &&
        customPrice &&
        customPrice.minWeight &&
        customPrice.maxWeight
      ) {
        if (weight > customPrice.minWeight && weight <= customPrice.maxWeight) {
          additionalPrice = customPrice.amount;
        }
      }
    });
  }
  return additionalPrice;
};