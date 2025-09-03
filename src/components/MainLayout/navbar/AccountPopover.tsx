"use client";
import { useState, useCallback, useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Button,
  Fade,
  ListItemText,
  Divider,
  MenuList,
  Typography,
  IconButton,
  MenuItem,
  ClickAwayListener,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { menuItemClasses } from "@mui/material/MenuItem";
import { useThemeContext } from "@/context/ThemeContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";

const themeButtons = [
  {
    name: "light" as const,
    icon: <LightModeOutlinedIcon sx={{ fontSize: 12 }} />,
  },
  {
    name: "dark" as const,
    icon: <NightsStayOutlinedIcon sx={{ fontSize: 12 }} />,
  },
  {
    name: "system" as const,
    icon: <DesktopWindowsOutlinedIcon sx={{ fontSize: 12 }} />,
  },
];

const menuItems = ["Settings", "Terms & policies", "Help", "Log out"];

const userData = {
  firstName: "Dinuka",
  lastName: "Prabath",
  emailAddress: "dinukaprab@gmail.com",
  profileImage: "/assets/avatars/avatar_hipster_kid.webp",
};

const ThemeButton = memo(
  ({
    button,
    isActive,
    onClick,
  }: {
    button: (typeof themeButtons)[0];
    isActive: boolean;
    onClick: () => void;
  }) => {
    const theme = useTheme();

    const buttonStyles = useMemo(
      () => ({
        width: 30,
        height: 30,
        minWidth: 0,
        borderRadius: 1.5,
        zIndex: 1,
        color: isActive
          ? theme.palette.popoverContainer.themePanel.activeIcon
          : theme.palette.popoverContainer.themePanel.inactiveIcon,
        "&:hover": {
          backgroundColor: isActive
            ? "transparent"
            : theme.palette.popoverContainer.themePanel.inactiveIconHover,
        },
      }),
      [theme, isActive]
    );

    return (
      <Button disableRipple onClick={onClick} sx={buttonStyles}>
        {button.icon}
      </Button>
    );
  }
);

ThemeButton.displayName = "ThemeButton";

export default function AccountPopover() {
  const router = useRouter();
  const theme = useTheme();
  const isTabletOrBelow = useMediaQuery(theme.breakpoints.down("md"));
  const [openPopover, setOpenPopover] = useState(false);
  const { activeTheme, setThemeMode } = useThemeContext();

  const handleTogglePopover = useCallback(() => {
    setOpenPopover((prev) => !prev);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(false);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      setOpenPopover(false);
      router.push(path);
    },
    [router]
  );

  const sliderPosition = useMemo(() => {
    const buttonWidth = 30;
    const gap = 4;
    const activeIndex = themeButtons.findIndex((b) => b.name === activeTheme);
    return activeIndex * (buttonWidth + gap) + 4;
  }, [activeTheme]);

  const profileButtonStyles = useMemo(
    () => ({
      p: "2px",
      width: 35,
      height: 35,
      background: `conic-gradient(
      ${theme.palette.info.light}, 
      ${theme.palette.warning.light}, 
      ${theme.palette.info.light}
    )`,
    }),
    [theme.palette.info.light, theme.palette.warning.light]
  );

  const popoverStyles = useMemo(
    () => ({
      position: "absolute" as const,
      top: isTabletOrBelow ? "105%" : "110%",
      right: 0,
      width: 210,
      bgcolor: "background.paper",
      borderRadius: 3,
      boxShadow: "0 2px 10px 0 rgba(0,0,0,0.15)",
      border: `1px solid ${theme.palette.customDivider.primary}`,
      zIndex: 10,
    }),
    [isTabletOrBelow, theme.palette.customDivider.primary]
  );

  const sliderStyles = useMemo(
    () => ({
      position: "absolute" as const,
      top: 2,
      left: `${sliderPosition}px`,
      width: 30,
      height: 30,
      borderRadius: 1.5,
      transition: "left 0.3s ease",
      backgroundColor:
        theme.palette.popoverContainer.themePanel.activeBackground,
      zIndex: 0,
    }),
    [sliderPosition, theme.palette.popoverContainer.themePanel.activeBackground]
  );

  return (
    <Box position="relative" display="inline-block">
      <IconButton onClick={handleTogglePopover} sx={profileButtonStyles}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `2px solid ${theme.palette.customBackground.main}`,
            overflow: "hidden",
          }}
        >
          <Image
            src={userData.profileImage}
            alt="User profile picture"
            fill
            sizes="35px"
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={userData.profileImage}
            priority
          />
        </Box>
      </IconButton>

      {openPopover && (
        <ClickAwayListener onClickAway={handleClosePopover}>
          <Fade in={openPopover} timeout={300}>
            <Box sx={popoverStyles}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  my: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: "100%",
                    textAlign: "center",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    fontSize: 14,
                    color: theme.palette.customText.primary,
                  }}
                >
                  {`${userData.firstName} ${userData.lastName}`}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{
                    maxWidth: "100%",
                    textAlign: "center",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    fontSize: 12,
                    color: theme.palette.customText.secondary,
                  }}
                >
                  {userData.emailAddress}
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    gap: 0.5,
                    px: 0.5,
                    py: 0.25,
                    m: 1,
                    borderRadius: 1.2,
                    backgroundColor:
                      theme.palette.popoverContainer.themePanel.background,
                  }}
                >
                  <Box sx={sliderStyles} />

                  {themeButtons.map((button) => (
                    <ThemeButton
                      key={button.name}
                      button={button}
                      isActive={activeTheme === button.name}
                      onClick={() => setThemeMode(button.name)}
                    />
                  ))}
                </Box>

                <Divider sx={{ width: "100%", my: 1 }} />

                <MenuList
                  disablePadding
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    px: 1,
                    [`& .${menuItemClasses.root}`]: {
                      borderRadius: 1.5,
                      color: theme.palette.text.secondary,
                      [`&.${menuItemClasses.selected}`]: {
                        bgcolor:
                          theme.palette.popoverContainer.menuList.background,
                        "&:hover": {
                          bgcolor:
                            theme.palette.popoverContainer.menuList
                              .backgroundHover,
                        },
                      },
                    },
                  }}
                >
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={item}
                      sx={{
                        borderRadius: 5,
                        px: 1,
                        py: isTabletOrBelow ? 0.4 : 0.7,
                        minHeight: { xs: 30 },
                      }}
                    >
                      <ListItemText>
                        <Typography
                          sx={{
                            fontSize: isTabletOrBelow ? 12 : 13,
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {item}
                        </Typography>
                      </ListItemText>
                    </MenuItem>
                  ))}
                </MenuList>
              </Box>
            </Box>
          </Fade>
        </ClickAwayListener>
      )}
    </Box>
  );
}
