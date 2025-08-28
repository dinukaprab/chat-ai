"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Box, useTheme } from "@mui/material";
import CircularLoader from "@/components/Loaders/CircularLoader";

export default function CPage() {
  const { conversionId } = useParams();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <CircularLoader size={15} />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: "800px",
          height: "100%",
          backgroundColor: theme.palette.customBackground.default,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.customBackground.default,
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme.palette.customScrollbar.background.primary,
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor:
              theme.palette.customScrollbar.hoverBackground.primary,
          },
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
            }}
          >
            <CircularLoader />
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
