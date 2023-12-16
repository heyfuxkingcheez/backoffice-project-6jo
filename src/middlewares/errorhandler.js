const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  console.log(err);

  if (err.message === "불일치(메뉴,가게)") {
    return res.status(401).json({ errorMessage: "잘못된 접근입니다." });
  }
  if (err.message === "잘못된 접근입니다.") {
    return res.status(401).json({ errorMessage: "잘못된 접근입니다." });
  }
  if (err.message === "주문 내역이 없습니다.") {
    return res.status(401).json({ errorMessage: "주문 내역이 없습니다." });
  }
  if (err.message === "리뷰가 존재하지 않습니다.") {
    return res.status(401).json({ errorMessage: "리뷰가 존재하지 않습니다." });
  }
  if (err.message === "배달 미완료 주문입니다.") {
    return res.status(401).json({ errorMessage: "배달 미완료 주문입니다." });
  }
  if (err.message === "메뉴가 없어요") {
    return res.status(400).json({ errorMessage: "조회 할 메뉴가 없습니다." });
  }
  if (err.message === "존재하는 수라간이 아니옵니다!") {
    return res
      .status(400)
      .json({ errorMessage: "존재하는 수라간이 아니옵니다!" });
  }
  if (err.message === "조회되는 식당이 없어요") {
    return res.status(400).json({ errorMessage: "조회 할 수라간이 없습니다." });
  }
};

export { ErrorHandler };
