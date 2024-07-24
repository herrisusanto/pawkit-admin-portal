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
import { Question } from "../api.backup/graphql/API.ts";
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
export declare type QuestionUpdateFormInputValues = {
  serviceCategory?: string;
  questionString?: string;
  questionType?: string;
  followUpQuestionIds?: string[];
  isRequired?: boolean;
};
export declare type QuestionUpdateFormValidationValues = {
  serviceCategory?: ValidationFunction<string>;
  questionString?: ValidationFunction<string>;
  questionType?: ValidationFunction<string>;
  followUpQuestionIds?: ValidationFunction<string>;
  isRequired?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> &
  React.DOMAttributes<HTMLDivElement>;
export declare type QuestionUpdateFormOverridesProps = {
  QuestionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
  serviceCategory?: PrimitiveOverrideProps<SelectFieldProps>;
  questionString?: PrimitiveOverrideProps<TextFieldProps>;
  questionType?: PrimitiveOverrideProps<SelectFieldProps>;
  followUpQuestionIds?: PrimitiveOverrideProps<TextFieldProps>;
  isRequired?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type QuestionUpdateFormProps = React.PropsWithChildren<
  {
    overrides?: QuestionUpdateFormOverridesProps | undefined | null;
  } & {
    id?: string;
    question?: Question;
    onSubmit?: (
      fields: QuestionUpdateFormInputValues
    ) => QuestionUpdateFormInputValues;
    onSuccess?: (fields: QuestionUpdateFormInputValues) => void;
    onError?: (
      fields: QuestionUpdateFormInputValues,
      errorMessage: string
    ) => void;
    onChange?: (
      fields: QuestionUpdateFormInputValues
    ) => QuestionUpdateFormInputValues;
    onValidate?: QuestionUpdateFormValidationValues;
  } & React.CSSProperties
>;
export default function QuestionUpdateForm(
  props: QuestionUpdateFormProps
): React.ReactElement;
