import { useLocation } from "react-router-dom";

import type { userData } from "../../components/GoogleLogin/types";

export const Index = () => {
  const location = useLocation();

  const data: userData = location.state.userInfo;

  console.log(data);

  return (
    <div>
      <img src={data.picture} />
      <p>{data.name}</p>
      <p>{data.email}</p>
    </div>
  );
};
