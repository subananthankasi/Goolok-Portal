import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";


const CustomLoder = () => {
  const blackStyle = {
    color: "black",
    fontSize: 40,
  };
  return (
    <div
      style={{
        width: "100%",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin
        size="large"
        indicator={<LoadingOutlined style={blackStyle} spin />}
      />
    </div>
  );
};

export default CustomLoder;
