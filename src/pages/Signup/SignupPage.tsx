import { useHistory } from "react-router-dom";

import { Flex, FlexBetween, FlexCenter } from "../../components";
import { Block, Button, Input } from "../../components";

import { useInput, useAuth } from "../../hooks";
import {
  validateAge,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from "../../validations";
import { PAGE_PATH } from "../../constants";
import { SIZE } from "../../constants";

const SignupPage = () => {
  const {
    inputValue: email,
    errorMessage: emailErrorMessage,
    setValueOnChange: onEmailChange,
  } = useInput(validateEmail);
  const {
    inputValue: age,
    errorMessage: ageErrorMessage,
    setValueOnChange: onAgeChange,
  } = useInput(validateAge);
  const {
    inputValue: password,
    errorMessage: passwordErrorMessage,
    setValueOnChange: onPasswordChange,
  } = useInput(validatePassword);
  const {
    inputValue: passwordConfirm,
    errorMessage: passwordConfirmErrorMessage,
    setValueOnChange: onPasswordConfirmChange,
  } = useInput((value: string) => {
    if (password && !passwordErrorMessage) {
      validatePasswordConfirm(password, value);
    }
  });

  const { signup } = useAuth();

  const history = useHistory();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (
      emailErrorMessage ||
      ageErrorMessage ||
      passwordErrorMessage ||
      passwordConfirmErrorMessage
    ) {
      alert("회원가입할 수 없습니다");
      return;
    }

    await signup({ email, age: Number(age), password });
    history.push(PAGE_PATH.HOME);
  };

  return (
    <FlexCenter>
      <form onSubmit={onSubmit}>
        <Block
          style={{
            marginTop: "2.5rem",
            width: SIZE.PAGE_CONTAINER_WIDTH,
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <FlexBetween style={{ width: "100%", marginBottom: "1rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>📝 회원가입</h2>
          </FlexBetween>
          <Flex style={{ width: "100%", flexDirection: "column" }}>
            <Input
              value={email}
              errorMessage={emailErrorMessage}
              placeholder="이메일"
              style={{ marginBottom: "0.9375rem" }}
              onChange={onEmailChange}
            />
            <Input
              type="number"
              value={age}
              errorMessage={ageErrorMessage}
              placeholder="나이"
              min="1"
              max="200"
              style={{ marginBottom: "0.9375rem" }}
              onChange={onAgeChange}
            />
            <Input
              type="password"
              value={password}
              errorMessage={passwordErrorMessage}
              placeholder="비밀번호"
              style={{ marginBottom: "0.9375rem" }}
              onChange={onPasswordChange}
            />
            <Input
              type="password"
              value={passwordConfirm}
              errorMessage={passwordConfirmErrorMessage}
              placeholder="비밀번호 확인"
              style={{ marginBottom: "1.5625rem" }}
              onChange={onPasswordConfirmChange}
            />
            <Button size="block">확인</Button>
          </Flex>
        </Block>
      </form>
    </FlexCenter>
  );
};

export default SignupPage;