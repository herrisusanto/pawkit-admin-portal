import { Col, Input, Row, Typography, Button, Flex, Form, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import LoginIllustration from "../../assets/login_illustration.png";
import { signIn, confirmSignIn } from "aws-amplify/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "aws-amplify/datastore";
type FieldType = {
  phone_number: string;
  confirmation_code: string;
};

function SignIn() {
  const [form] = Form.useForm<FieldType>();
  const phoneNumberValue = Form.useWatch("phone_number", form);
  const confirmationCodeValue = Form.useWatch("confirmation_code", form);
  const [authStep, setAuthStep] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  async function handleSignIn() {
    setLoading(true);
    const phoneNumber = "+65" + phoneNumberValue;

    try {
      const { nextStep } = await signIn({
        username: phoneNumber,
        options: {
          authFlowType: "CUSTOM_WITHOUT_SRP",
        },
      });
      if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE") {
        setAuthStep(nextStep.signInStep);
      }
    } catch (error: any) {
      messageApi.error({
        content: `Error signin in: ${error?.message}`,
        duration: 2.5,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignInConfirmation() {
    setLoading(true);
    const challengeResponse = confirmationCodeValue;

    messageApi.open({
      type: "loading",
      content: "Action in progress..",
      duration: 2.5,
    });

    try {
      const { nextStep } = await confirmSignIn({
        challengeResponse,
      });
      if (nextStep.signInStep === "DONE") {
        navigate("/");
      } else if (
        nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE"
      ) {
        messageApi.error({
          content: "Wrong confirmation code, please try again",
          duration: 2.5,
        });
      }
    } catch (error: any) {
      messageApi.error({
        content: `Error signin in: ${error?.message}`,
        duration: 2.5,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {contextHolder}
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "60vh",
            width: "70vw",
            paddingTop: 0,
            paddingBottom: 0,
            border: "1px solid #dfdfdf",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Row gutter={32} style={{ width: "100%", height: "100%" }}>
            <Col span={12}>
              <div
                style={{
                  padding: 0,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#F2FCFA",
                }}
              >
                <img width={200} src={LoginIllustration} />
              </div>
            </Col>
            <Col span={12}>
              <Flex
                align="center"
                justify="center"
                vertical
                style={{ height: "100%" }}
                gap={30}
              >
                <Flex vertical align="center" justify="center">
                  <Typography.Title level={3}>
                    Welcome to Pawkit Portal
                  </Typography.Title>
                  <Typography.Text>Signin to continue</Typography.Text>
                </Flex>
                <Form
                  form={form}
                  name="basic"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  style={{ width: "100%" }}
                  // onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  // layout="vertical"
                >
                  <Form.Item<FieldType>
                    label="Phone Number"
                    name="phone_number"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                        pattern: /^\d{8}$/,
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <Typography.Text type="secondary">+65</Typography.Text>
                      }
                      suffix={
                        <PhoneOutlined style={{ color: "rgba(0,0,0,.25)" }} />
                      }
                    />
                  </Form.Item>
                  {authStep === "" && (
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <Button
                        onClick={() => handleSignIn()}
                        style={{ width: "100%" }}
                        htmlType="button"
                        loading={loading}
                      >
                        Send Verification Code
                      </Button>
                    </Form.Item>
                  )}
                  {authStep === "CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE" && (
                    <>
                      <Form.Item<FieldType>
                        label="Confirmation Code"
                        name="confirmation_code"
                        rules={[
                          {
                            message: "Please input your confirmation code!",
                            pattern: /^\d{6}$/,
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <Button
                          onClick={() => handleSignInConfirmation()}
                          style={{ width: "100%" }}
                          htmlType="button"
                          type="primary"
                          loading={loading}
                        >
                          Validate Code & Sign In
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form>
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default SignIn;
