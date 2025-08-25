import { useTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/material";

type CircularLoaderProps = {
  size?: number;
  sx?: SxProps<Theme>;
};

export default function CircularLoader({ size = 15, sx }: CircularLoaderProps) {
  const theme = useTheme();

  return (
    <CircularProgress
      size={size}
      sx={{
        color: theme.palette.primary.main,
        ...sx,
      }}
    />
  );
}
