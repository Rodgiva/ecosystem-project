const Humain = (props) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          width: "2px",
          height: "2px",
          top: "calc(((100vh - 600px) / 2) + 201px )",
          left: "calc(((100vw - 1200px) / 2) + 201px)",
          position: "absolute",
          borderRadius: "10px",
        }}
      ></div>
    </>
  );
};

export default Humain;
