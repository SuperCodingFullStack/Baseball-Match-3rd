import { useDispatch } from "react-redux";
import { signUpErrorActions } from "../Store/slice/signUpErrorSlice";

export const idCheck = (id) => {
  const dispatch = useDispatch();

  const regex = '^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$';
  if (regex.test(id)) {
    dispatch(signUpErrorActions.setEmailError("올바른 아이디입니다."));
  }
};
