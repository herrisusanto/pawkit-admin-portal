/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getQuestion } from "../api/graphql/queries";
import { updateQuestion } from "../api/graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function QuestionUpdateForm(props) {
  const {
    id: idProp,
    question: questionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    serviceCategory: "",
    questionString: "",
    questionType: "",
    followUpQuestionIds: [],
    isRequired: false,
  };
  const [serviceCategory, setServiceCategory] = React.useState(
    initialValues.serviceCategory
  );
  const [questionString, setQuestionString] = React.useState(
    initialValues.questionString
  );
  const [questionType, setQuestionType] = React.useState(
    initialValues.questionType
  );
  const [followUpQuestionIds, setFollowUpQuestionIds] = React.useState(
    initialValues.followUpQuestionIds
  );
  const [isRequired, setIsRequired] = React.useState(initialValues.isRequired);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = questionRecord
      ? { ...initialValues, ...questionRecord }
      : initialValues;
    setServiceCategory(cleanValues.serviceCategory);
    setQuestionString(cleanValues.questionString);
    setQuestionType(cleanValues.questionType);
    setFollowUpQuestionIds(cleanValues.followUpQuestionIds ?? []);
    setCurrentFollowUpQuestionIdsValue("");
    setIsRequired(cleanValues.isRequired);
    setErrors({});
  };
  const [questionRecord, setQuestionRecord] = React.useState(questionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getQuestion.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getQuestion
        : questionModelProp;
      setQuestionRecord(record);
    };
    queryData();
  }, [idProp, questionModelProp]);
  React.useEffect(resetStateValues, [questionRecord]);
  const [currentFollowUpQuestionIdsValue, setCurrentFollowUpQuestionIdsValue] =
    React.useState("");
  const followUpQuestionIdsRef = React.createRef();
  const validations = {
    serviceCategory: [{ type: "Required" }],
    questionString: [{ type: "Required" }],
    questionType: [{ type: "Required" }],
    followUpQuestionIds: [{ type: "Required" }],
    isRequired: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          serviceCategory,
          questionString,
          questionType,
          followUpQuestionIds,
          isRequired,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateQuestion.replaceAll("__typename", ""),
            variables: {
              input: {
                id: questionRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "QuestionUpdateForm")}
      {...rest}
    >
      <SelectField
        label="Service category"
        placeholder="Please select an option"
        isDisabled={false}
        value={serviceCategory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              serviceCategory: value,
              questionString,
              questionType,
              followUpQuestionIds,
              isRequired,
            };
            const result = onChange(modelFields);
            value = result?.serviceCategory ?? value;
          }
          if (errors.serviceCategory?.hasError) {
            runValidationTasks("serviceCategory", value);
          }
          setServiceCategory(value);
        }}
        onBlur={() => runValidationTasks("serviceCategory", serviceCategory)}
        errorMessage={errors.serviceCategory?.errorMessage}
        hasError={errors.serviceCategory?.hasError}
        {...getOverrideProps(overrides, "serviceCategory")}
      >
        <option
          children="Vaccination"
          value="VACCINATION"
          {...getOverrideProps(overrides, "serviceCategoryoption0")}
        ></option>
        <option
          children="Grooming"
          value="GROOMING"
          {...getOverrideProps(overrides, "serviceCategoryoption1")}
        ></option>
        <option
          children="Medical sitting"
          value="MEDICAL_SITTING"
          {...getOverrideProps(overrides, "serviceCategoryoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Question string"
        isRequired={true}
        isReadOnly={false}
        value={questionString}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              serviceCategory,
              questionString: value,
              questionType,
              followUpQuestionIds,
              isRequired,
            };
            const result = onChange(modelFields);
            value = result?.questionString ?? value;
          }
          if (errors.questionString?.hasError) {
            runValidationTasks("questionString", value);
          }
          setQuestionString(value);
        }}
        onBlur={() => runValidationTasks("questionString", questionString)}
        errorMessage={errors.questionString?.errorMessage}
        hasError={errors.questionString?.hasError}
        {...getOverrideProps(overrides, "questionString")}
      ></TextField>
      <SelectField
        label="Question type"
        placeholder="Please select an option"
        isDisabled={false}
        value={questionType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              serviceCategory,
              questionString,
              questionType: value,
              followUpQuestionIds,
              isRequired,
            };
            const result = onChange(modelFields);
            value = result?.questionType ?? value;
          }
          if (errors.questionType?.hasError) {
            runValidationTasks("questionType", value);
          }
          setQuestionType(value);
        }}
        onBlur={() => runValidationTasks("questionType", questionType)}
        errorMessage={errors.questionType?.errorMessage}
        hasError={errors.questionType?.hasError}
        {...getOverrideProps(overrides, "questionType")}
      >
        <option
          children="Text"
          value="TEXT"
          {...getOverrideProps(overrides, "questionTypeoption0")}
        ></option>
        <option
          children="Yes no"
          value="YES_NO"
          {...getOverrideProps(overrides, "questionTypeoption1")}
        ></option>
        <option
          children="Date"
          value="DATE"
          {...getOverrideProps(overrides, "questionTypeoption2")}
        ></option>
      </SelectField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              serviceCategory,
              questionString,
              questionType,
              followUpQuestionIds: values,
              isRequired,
            };
            const result = onChange(modelFields);
            values = result?.followUpQuestionIds ?? values;
          }
          setFollowUpQuestionIds(values);
          setCurrentFollowUpQuestionIdsValue("");
        }}
        currentFieldValue={currentFollowUpQuestionIdsValue}
        label={"Follow up question ids"}
        items={followUpQuestionIds}
        hasError={errors?.followUpQuestionIds?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "followUpQuestionIds",
            currentFollowUpQuestionIdsValue
          )
        }
        errorMessage={errors?.followUpQuestionIds?.errorMessage}
        setFieldValue={setCurrentFollowUpQuestionIdsValue}
        inputFieldRef={followUpQuestionIdsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Follow up question ids"
          isRequired={true}
          isReadOnly={false}
          value={currentFollowUpQuestionIdsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.followUpQuestionIds?.hasError) {
              runValidationTasks("followUpQuestionIds", value);
            }
            setCurrentFollowUpQuestionIdsValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "followUpQuestionIds",
              currentFollowUpQuestionIdsValue
            )
          }
          errorMessage={errors.followUpQuestionIds?.errorMessage}
          hasError={errors.followUpQuestionIds?.hasError}
          ref={followUpQuestionIdsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "followUpQuestionIds")}
        ></TextField>
      </ArrayField>
      <SwitchField
        label="Is required"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isRequired}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              serviceCategory,
              questionString,
              questionType,
              followUpQuestionIds,
              isRequired: value,
            };
            const result = onChange(modelFields);
            value = result?.isRequired ?? value;
          }
          if (errors.isRequired?.hasError) {
            runValidationTasks("isRequired", value);
          }
          setIsRequired(value);
        }}
        onBlur={() => runValidationTasks("isRequired", isRequired)}
        errorMessage={errors.isRequired?.errorMessage}
        hasError={errors.isRequired?.hasError}
        {...getOverrideProps(overrides, "isRequired")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || questionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || questionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
