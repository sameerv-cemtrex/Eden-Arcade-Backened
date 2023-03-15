export const customStyles = {
  table: {
    style: {},
  },
  tableWrapper: {
    style: {
      minHeight: "68vh",
      background: "#262626",
    },
  },
  responsiveWrapper: {
    style: {
      border: "1px solid #5b5a5a",
      borderTop: "none",
      "&::-webkit-scrollbar-thumb": {
        background: "#5b5a5a",
        borderRadius: "30px",
      },
      "&::-webkit-scrollbar-track": {
        background: "rgba(0,0,0, 1)",
      },
      "&::-webkit-scrollbar": {
        height: "7px",
      },
    },
  },
  headRow: {
    style: {
      background: "#262626",
      color: "#5b5a5a",
      borderBottomWidth: "1px",
      borderBottomColor: "#5b5a5a",
      borderBottomStyle: "solid",
    },
  },
  header: {
    style: {
      background: "#262626",
      paddingTop: "30px",
      paddingBottom: "20px",
      paddingLeft: "60px",
      paddingRight: "30px",
      border: "1px solid #5b5a5a",
      borderBottom: "none",
      overflow: "inherit",
    },
  },
  contextMenu: {
    style: {
      display: "none",
    },
  },
  rows: {
    style: {
      color: "white",
      background: "#262626",
      borderBottomStyle: "solid",
      borderBottomWidth: "1px",
      borderBottomColor: "#5b5a5a",
      minHeight: "48px",
      "&:not(:last-of-type)": {
        borderBottomColor: "#5b5a5a",
      },
    },
    highlightOnHoverStyle: {
      color: "white",
      backgroundColor: "#383a3b",
      borderBottomColor: "#5b5a5a",
      outline: "none",
    },
    stripedStyle: {
      color: "white",
      backgroundColor: "#2b2b2b",
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      lineHeight: "16px",
      fontWeight: "bold",
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      lineHeight: "16px",
      fontWeight: "500",
      textTransform: "uppercase",
    },
  },
  pagination: {
    style: {
      color: "#5b5a5a",
      background: "#262626",
    },
    pageButtonStyle: {
      color: "white",
      fill: "red",
      "&:disabled": {
        cursor: "unset",
        color: "white",
        fill: "white",
      },
      "&:hover:not(:disabled)": {
        // backgroundColor: theme.button.hover,
      },
      "&:focus": {
        outline: "none",
        // backgroundColor: theme.button.focus,
      },
    },
  },
  noData: {
    style: {
      background: "#262626",
      color: "#5b5a5a",
      fontSize: "20px",
    },
  },
  expanderRow: {
    style: {
      backgroundColor: "#2b2b2b",
    },
  },
};
