/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import {
  GridProps,
  SelectFieldProps,
  SwitchFieldProps,
  TextFieldProps,
} from "@aws-amplify/ui-react";
import { Breed } from "../api.backup/graphql/API.ts";
export declare type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
  [key: string]: string;
};
export declare type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
  hasError: boolean;
  errorMessage?: string;
};
export declare type ValidationFunction<T> = (
  value: T,
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type BreedUpdateFormInputValues = {
  name?: string;
  petType?: string;
  coats?: string[];
  undercoatRemoval?: boolean;
  durationUnit?: string;
  basicGroomingDuration?: number;
  fullGroomingDuration?: number;
};
export declare type BreedUpdateFormValidationValues = {
  name?: ValidationFunction<string>;
  petType?: ValidationFunction<string>;
  coats?: ValidationFunction<string>;
  undercoatRemoval?: ValidationFunction<boolean>;
  durationUnit?: ValidationFunction<string>;
  basicGroomingDuration?: ValidationFunction<number>;
  fullGroomingDuration?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type BreedUpdateFormOverridesProps = {
  BreedUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  petType?: PrimitiveOverrideProps<SelectFieldProps>;
  coats?: PrimitiveOverrideProps<SelectFieldProps>;
  undercoatRemoval?: PrimitiveOverrideProps<SwitchFieldProps>;
  durationUnit?: PrimitiveOverrideProps<SelectFieldProps>;
  basicGroomingDuration?: PrimitiveOverrideProps<TextFieldProps>;
  fullGroomingDuration?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BreedUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: BreedUpdateFormOverridesProps | undefined | null;
  } & {
    name?: string;
    breed?: Breed;
    onSubmit?: (
      fields: BreedUpdateFormInputValues
    ) => BreedUpdateFormInputValues;
    onSuccess?: (fields: BreedUpdateFormInputValues) => void;
    onError?: (
      fields: BreedUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: BreedUpdateFormInputValues
    ) => BreedUpdateFormInputValues;
    onValidate?: BreedUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function BreedUpdateForm(
  props: BreedUpdateFormProps
): React.ReactElement;
