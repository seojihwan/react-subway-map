import { useHistory } from "react-router-dom";

import FormProvider from "../../components/Form/FormProvider";
import {
  Flex,
  FlexBetween,
  FlexCenter,
} from "../../components/Layout/FlexContainer/FlexContainer";
import Form from "../../components/Form/Form";
import Block from "../../components/Block/Block";
import InputField from "../../components/Input/InputField";
import Button from "../../components/Button/Button";

import { useAuth } from "../../hooks";

import { validateEmail } from "../../validations/email";
import { validateAge } from "../../validations/age";
import {
  validatePassword,
  validatePasswordConfirm,
} from "../../validations/password";
import { PAGE_PATH } from "../../constants/route";
import { SIZE } from "../../constants/size";

const SignupPage = () => {
  const { signup } = useAuth();

  const history = useHistory();

  return (
    <FormProvider
      submit={async ({ email, age, password }) => {
        await signup({ email, age: Number(age), password });
        history.push(PAGE_PATH.HOME);
      }}
      validators={{
        email: validateEmail,
        age: validateAge,
        password: validatePassword,
        passwordConfirm: (passwordConfirm) => ({ password }) => {
          validatePasswordConfirm(password, passwordConfirm);
        },
      }}
    >
      <FlexCenter>
        <Form>
          <Block
            css={{
              marginTop: "2.5rem",
              width: SIZE.PAGE_CONTAINER_WIDTH,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <FlexBetween css={{ width: "100%", marginBottom: "1rem" }}>
              <h2 css={{ marginBottom: "1rem" }}>📝 회원가입</h2>
            </FlexBetween>
            <Flex css={{ width: "100%", flexDirection: "column" }}>
              <InputField
                name="email"
                placeholder="이메일"
                css={{ marginBottom: "0.9375rem" }}
              />
              <InputField
                name="age"
                type="number"
                placeholder="나이"
                min="1"
                max="200"
                css={{ marginBottom: "0.9375rem" }}
              />
              <InputField
                name="password"
                type="password"
                placeholder="비밀번호"
                css={{ marginBottom: "0.9375rem" }}
              />
              <InputField
                name="passwordConfirm"
                type="password"
                placeholder="비밀번호 확인"
                css={{ marginBottom: "1.5625rem" }}
              />
              <Button size="block">확인</Button>
            </Flex>
          </Block>
        </Form>
      </FlexCenter>
    </FormProvider>
  );
};

export default SignupPage;
