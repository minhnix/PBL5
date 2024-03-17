import ReactLoading from "react-loading";

const Loading = ({ type, color, width, height }) => {
  return (
    <ReactLoading type={type} color={color} height={height} width={width} />
  );
};

export default Loading;
