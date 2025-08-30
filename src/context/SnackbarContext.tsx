"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert, Slide, SlideProps } from "@mui/material";

type SnackbarContextType = {
  showMessage: (
    message: string,
    severity?: "success" | "error" | "info" | "warning"
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("info");

  const showMessage = useCallback(
    (msg: string, sev: "success" | "error" | "info" | "warning" = "info") => {
      setMessage(msg);
      setSeverity(sev);
      setOpen(true);
    },
    []
  );

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 2,
            boxShadow: "none",
          },
        }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{
            width: "100%",
            borderRadius: 0,
            boxShadow: "none",
            "&.MuiAlert-standardSuccess": {
              border: "1px solid #4caf50",
              backgroundColor: "#e8f5e9",
              boxShadow: "0 1px 3px rgba(76, 175, 80, 0.2)",
            },
            "&.MuiAlert-standardError": {
              border: "1px solid #f44336",
              backgroundColor: "#ffebee",
              boxShadow: "0 1px 3px rgba(244, 67, 54, 0.2)",
            },
            "&.MuiAlert-standardInfo": {
              border: "1px solid #2196f3",
              backgroundColor: "#e3f2fd",
              boxShadow: "0 1px 3px rgba(33, 150, 243, 0.2)",
            },
            "&.MuiAlert-standardWarning": {
              border: "1px solid #ff9800",
              backgroundColor: "#fff3e0",
              boxShadow: "0 1px 3px rgba(255, 152, 0, 0.2)",
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within SnackbarProvider");
  return context;
};
