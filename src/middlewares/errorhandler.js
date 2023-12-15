const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  console.log(err);

  if (err.message === "불일치(메뉴,가게)") {
    return res.status(401).json({ errorMessage: "비정상적인 접근 입니다." });
  }
};

export { ErrorHandler };
