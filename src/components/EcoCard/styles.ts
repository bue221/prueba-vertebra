export interface IStyles {
  [key: string]: React.CSSProperties & { from?: string; to?: string };
}

export const styles: IStyles = {
  containerBtns: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  card: { width: 300 },
  accountText: {
    color: "#5C5C61",
    fontWeight: "bold",
    fontSize: "14px",
  },
  colMargin: { marginBottom: "3px" },
  colMargin9: { marginBottom: "9px" },
  baseText: { fontSize: "0.7rem", textAlign: "center" },
  strokeColor: {
    from: "#108ee9",
    to: "#87d068",
  },
  colGrid: {
    display: "grid",
    justifyContent: "center",
    marginBottom: "9px",
  },
  bulb: {
    color: "#009432  ",
    fontSize: "22px",
    fontWeight: "600",
  },
  spanColor: { color: "#009432" },
  ColGCenter: { display: "grid", justifyContent: "center" },
};
