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
  validationResponse: ValidationResponse,
) => ValidationResponse | Promise<ValidationResponse>;
export declare type BreedCreateFormInputValues = {
  name?: string;
  petType?: string;
  coats?: string[];
  undercoatRemoval?: boolean;
  durationUnit?: string;
  basicGroomingDuration?: number;
  fullGroomingDuration?: number;
};
export declare type BreedCreateFormValidationValues = {
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
export declare type BreedCreateFormOverridesProps = {
  BreedCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  name?: PrimitiveOverrideProps<TextFieldProps>;
  petType?: PrimitiveOverrideProps<SelectFieldProps>;
  coats?: PrimitiveOverrideProps<SelectFieldProps>;
  undercoatRemoval?: PrimitiveOverrideProps<SwitchFieldProps>;
  durationUnit?: PrimitiveOverrideProps<SelectFieldProps>;
  basicGroomingDuration?: PrimitiveOverrideProps<TextFieldProps>;
  fullGroomingDuration?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BreedCreateFormProps = React.PropsWithChildren<
  {
    overrides?: BreedCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: BreedCreateFormInputValues,
    ) => BreedCreateFormInputValues;
    onSuccess?: (fields: BreedCreateFormInputValues) => void;
    onError?: (
      fields: BreedCreateFormInputValues,
      errorMessage: string,
    ) => void;
    onChange?: (
      fields: BreedCreateFormInputValues,
    ) => BreedCreateFormInputValues;
    onValidate?: BreedCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function BreedCreateForm(
  props: BreedCreateFormProps,
): React.ReactElement;
