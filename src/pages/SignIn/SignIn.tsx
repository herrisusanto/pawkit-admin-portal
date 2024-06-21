import {
  Card,
  Checkbox,
  Col,
  Input,
  Row,
  Typography,
  CheckboxProps,
  Button,
  Flex,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import PawkitLogo from "../../assets/pawkit_logo.png";
import { Link } from "react-router-dom";

function SignIn() {
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: "50vw",
          paddingTop: 90,
          paddingBottom: 90,
        }}
      >
        <Row gutter={32} style={{ width: "100%" }}>
          <Col span={12}>
            <div
              style={{
                padding: 20,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img width={200} src={PawkitLogo} />
            </div>
          </Col>
          <Col span={12}>
            <Flex align="center" justify="center" vertical>
              <Typography.Title level={2}>Welcome to Pawkit</Typography.Title>
              <Flex flex={1} vertical style={{ width: "100%" }} gap={12}>
                <Input
                  size="large"
                  placeholder="Enter your email"
                  prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                />
                <Checkbox onChange={onChange}>Remember Me</Checkbox>
                <Link to="/">
                  <Button style={{ width: "100%" }} type="primary">
                    Sign In
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default SignIn;
