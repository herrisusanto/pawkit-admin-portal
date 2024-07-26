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
  validationResponse: ValidationResponse
) => ValidationResponse | Promise<ValidationResponse>;
export declare type QuestionCreateFormInputValues = {
  serviceCategory?: string;
  questionString?: string;
  questionType?: string;
  followUpQuestionIds?: string[];
  isRequired?: boolean;
};
export declare type QuestionCreateFormValidationValues = {
  serviceCategory?: ValidationFunction<string>;
  questionString?: ValidationFunction<string>;
  questionType?: ValidationFunction<string>;
  followUpQuestionIds?: ValidationFunction<string>;
  isRequired?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type QuestionCreateFormOverridesProps = {
  QuestionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
  serviceCategory?: PrimitiveOverrideProps<SelectFieldProps>;
  questionString?: PrimitiveOverrideProps<TextFieldProps>;
  questionType?: PrimitiveOverrideProps<SelectFieldProps>;
  followUpQuestionIds?: PrimitiveOverrideProps<TextFieldProps>;
  isRequired?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type QuestionCreateFormProps = React.PropsWithChildren<
  {
    overrides?: QuestionCreateFormOverridesProps | undefined | null;
  } & {
    clearOnSuccess?: boolean;
    onSubmit?: (
      fields: QuestionCreateFormInputValues
    ) => QuestionCreateFormInputValues;
    onSuccess?: (fields: QuestionCreateFormInputValues) => void;
    onError?: (
      fields: QuestionCreateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: QuestionCreateFormInputValues
    ) => QuestionCreateFormInputValues;
    onValidate?: QuestionCreateFormValidationValues;
  } & React.CSSProperties
>;
export default function QuestionCreateForm(
  props: QuestionCreateFormProps
): React.ReactElement;
