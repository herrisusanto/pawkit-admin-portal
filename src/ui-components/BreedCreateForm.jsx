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
import { createBreed } from "../graphql/mutations";
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
export default function BreedCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    petType: "",
    coats: [],
    undercoatRemoval: false,
    durationUnit: "",
    basicGroomingDuration: "",
    fullGroomingDuration: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [petType, setPetType] = React.useState(initialValues.petType);
  const [coats, setCoats] = React.useState(initialValues.coats);
  const [undercoatRemoval, setUndercoatRemoval] = React.useState(
    initialValues.undercoatRemoval
  );
  const [durationUnit, setDurationUnit] = React.useState(
    initialValues.durationUnit
  );
  const [basicGroomingDuration, setBasicGroomingDuration] = React.useState(
    initialValues.basicGroomingDuration
  );
  const [fullGroomingDuration, setFullGroomingDuration] = React.useState(
    initialValues.fullGroomingDuration
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setPetType(initialValues.petType);
    setCoats(initialValues.coats);
    setCurrentCoatsValue("");
    setUndercoatRemoval(initialValues.undercoatRemoval);
    setDurationUnit(initialValues.durationUnit);
    setBasicGroomingDuration(initialValues.basicGroomingDuration);
    setFullGroomingDuration(initialValues.fullGroomingDuration);
    setErrors({});
  };
  const [currentCoatsValue, setCurrentCoatsValue] = React.useState("");
  const coatsRef = React.createRef();
  const getDisplayValue = {
    coats: (r) => {
      const enumDisplayValueMap = {
        HAIRLESS: "Hairless",
        SHORT: "Short",
        MEDIUM: "Medium",
        LONG: "Long",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    name: [{ type: "Required" }],
    petType: [{ type: "Required" }],
    coats: [{ type: "Required" }],
    undercoatRemoval: [],
    durationUnit: [],
    basicGroomingDuration: [],
    fullGroomingDuration: [],
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
          name,
          petType,
          coats,
          undercoatRemoval,
          durationUnit,
          basicGroomingDuration,
          fullGroomingDuration,
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
            query: createBreed.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "BreedCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              petType,
              coats,
              undercoatRemoval,
              durationUnit,
              basicGroomingDuration,
              fullGroomingDuration,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <SelectField
        label="Pet type"
        placeholder="Please select an option"
        isDisabled={false}
        value={petType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              petType: value,
              coats,
              undercoatRemoval,
              durationUnit,
              basicGroomingDuration,
              fullGroomingDuration,
            };
            const result = onChange(modelFields);
            value = result?.petType ?? value;
          }
          if (errors.petType?.hasError) {
            runValidationTasks("petType", value);
          }
          setPetType(value);
        }}
        onBlur={() => runValidationTasks("petType", petType)}
        errorMessage={errors.petType?.errorMessage}
        hasError={errors.petType?.hasError}
        {...getOverrideProps(overrides, "petType")}
      >
        <option
          children="Dog"
          value="DOG"
          {...getOverrideProps(overrides, "petTypeoption0")}
        ></option>
        <option
          children="Cat"
          value="CAT"
          {...getOverrideProps(overrides, "petTypeoption1")}
        ></option>
        <option
          children="Rabbit"
          value="RABBIT"
          {...getOverrideProps(overrides, "petTypeoption2")}
        ></option>
        <option
          children="Guinea pig"
          value="GUINEA_PIG"
          {...getOverrideProps(overrides, "petTypeoption3")}
        ></option>
        <option
          children="Bird"
          value="BIRD"
          {...getOverrideProps(overrides, "petTypeoption4")}
        ></option>
        <option
          children="Other"
          value="OTHER"
          {...getOverrideProps(overrides, "petTypeoption5")}
        ></option>
        <option
          children="All"
          value="ALL"
          {...getOverrideProps(overrides, "petTypeoption6")}
        ></option>
      </SelectField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              petType,
              coats: values,
              undercoatRemoval,
              durationUnit,
              basicGroomingDuration,
              fullGroomingDuration,
            };
            const result = onChange(modelFields);
            values = result?.coats ?? values;
          }
          setCoats(values);
          setCurrentCoatsValue("");
        }}
        currentFieldValue={currentCoatsValue}
        label={"Coats"}
        items={coats}
        hasError={errors?.coats?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("coats", currentCoatsValue)
        }
        errorMessage={errors?.coats?.errorMessage}
        getBadgeText={getDisplayValue.coats}
        setFieldValue={setCurrentCoatsValue}
        inputFieldRef={coatsRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Coats"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentCoatsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.coats?.hasError) {
              runValidationTasks("coats", value);
            }
            setCurrentCoatsValue(value);
          }}
          onBlur={() => runValidationTasks("coats", currentCoatsValue)}
          errorMessage={errors.coats?.errorMessage}
          hasError={errors.coats?.hasError}
          ref={coatsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "coats")}
        >
          <option
            children="Hairless"
            value="HAIRLESS"
            {...getOverrideProps(overrides, "coatsoption0")}
          ></option>
          <option
            children="Short"
            value="SHORT"
            {...getOverrideProps(overrides, "coatsoption1")}
          ></option>
          <option
            children="Medium"
            value="MEDIUM"
            {...getOverrideProps(overrides, "coatsoption2")}
          ></option>
          <option
            children="Long"
            value="LONG"
            {...getOverrideProps(overrides, "coatsoption3")}
          ></option>
        </SelectField>
      </ArrayField>
      <SwitchField
        label="Undercoat removal"
        defaultChecked={false}
        isDisabled={false}
        isChecked={undercoatRemoval}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              petType,
              coats,
              undercoatRemoval: value,
              durationUnit,
              basicGroomingDuration,
              fullGroomingDuration,
            };
            const result = onChange(modelFields);
            value = result?.undercoatRemoval ?? value;
          }
          if (errors.undercoatRemoval?.hasError) {
            runValidationTasks("undercoatRemoval", value);
          }
          setUndercoatRemoval(value);
        }}
        onBlur={() => runValidationTasks("undercoatRemoval", undercoatRemoval)}
        errorMessage={errors.undercoatRemoval?.errorMessage}
        hasError={errors.undercoatRemoval?.hasError}
        {...getOverrideProps(overrides, "undercoatRemoval")}
      ></SwitchField>
      <SelectField
        label="Duration unit"
        placeholder="Please select an option"
        isDisabled={false}
        value={durationUnit}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              petType,
              coats,
              undercoatRemoval,
              durationUnit: value,
              basicGroomingDuration,
              fullGroomingDuration,
            };
            const result = onChange(modelFields);
            value = result?.durationUnit ?? value;
          }
          if (errors.durationUnit?.hasError) {
            runValidationTasks("durationUnit", value);
          }
          setDurationUnit(value);
        }}
        onBlur={() => runValidationTasks("durationUnit", durationUnit)}
        errorMessage={errors.durationUnit?.errorMessage}
        hasError={errors.durationUnit?.hasError}
        {...getOverrideProps(overrides, "durationUnit")}
      >
        <option
          children="Minutes"
          value="MINUTES"
          {...getOverrideProps(overrides, "durationUnitoption0")}
        ></option>
        <option
          children="Hours"
          value="HOURS"
          {...getOverrideProps(overrides, "durationUnitoption1")}
        ></option>
        <option
          children="Days"
          value="DAYS"
          {...getOverrideProps(overrides, "durationUnitoption2")}
        ></option>
        <option
          children="Weeks"
          value="WEEKS"
          {...getOverrideProps(overrides, "durationUnitoption3")}
        ></option>
        <option
          children="Months"
          value="MONTHS"
          {...getOverrideProps(overrides, "durationUnitoption4")}
        ></option>
        <option
          children="Years"
          value="YEARS"
          {...getOverrideProps(overrides, "durationUnitoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Basic grooming duration"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={basicGroomingDuration}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              petType,
              coats,
              undercoatRemoval,
              durationUnit,
              basicGroomingDuration: value,
              fullGroomingDuration,
            };
            const result = onChange(modelFields);
            value = result?.basicGroomingDuration ?? value;
          }
          if (errors.basicGroomingDuration?.hasError) {
            runValidationTasks("basicGroomingDuration", value);
          }
          setBasicGroomingDuration(value);
        }}
        onBlur={() =>
          runValidationTasks("basicGroomingDuration", basicGroomingDuration)
        }
        errorMessage={errors.basicGroomingDuration?.errorMessage}
        hasError={errors.basicGroomingDuration?.hasError}
        {...getOverrideProps(overrides, "basicGroomingDuration")}
      ></TextField>
      <TextField
        label="Full grooming duration"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={fullGroomingDuration}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              petType,
              coats,
              undercoatRemoval,
              durationUnit,
              basicGroomingDuration,
              fullGroomingDuration: value,
            };
            const result = onChange(modelFields);
            value = result?.fullGroomingDuration ?? value;
          }
          if (errors.fullGroomingDuration?.hasError) {
            runValidationTasks("fullGroomingDuration", value);
          }
          setFullGroomingDuration(value);
        }}
        onBlur={() =>
          runValidationTasks("fullGroomingDuration", fullGroomingDuration)
        }
        errorMessage={errors.fullGroomingDuration?.errorMessage}
        hasError={errors.fullGroomingDuration?.hasError}
        {...getOverrideProps(overrides, "fullGroomingDuration")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
