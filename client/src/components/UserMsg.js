import { useContext } from "react";
import { Context } from "../context";

const UserMsg = () => {
  const ctx = useContext(Context);
  return <>{ctx.userMsg && <div class="user-msg">{ctx.userMsg}</div>}</>;
};

export default UserMsg;
