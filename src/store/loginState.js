import { atom } from "recoil";
import { useRecoilState } from "recoil";

const loginState = atom({
  key: "loginState",
  default: {
    token: null,
    isLogged: false,
  },
});

export const useLoginStatus = () => {
  const [loginStatus, setLoginStatus] = useRecoilState(loginState);
  return [loginStatus, setLoginStatus];
};
