import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSucess } from "./features/userRedux";
import { publicRequest } from "./requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/auth/login", user);

    dispatch(loginSucess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
