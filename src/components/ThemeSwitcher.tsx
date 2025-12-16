"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { 
  Brightness4 as MoonIcon, 
  Brightness7 as SunIcon, 
  SettingsBrightness as SystemIcon 
} from "@mui/icons-material";

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = useTranslations("ThemeSwitcher"); // Assumes keys in your JSON files
  const [mounted, setMounted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => setMounted(true), []);

  if (!mounted) return <IconButton disabled><SystemIcon /></IconButton>;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    handleClose();
  };

  return (
    <>
      <Tooltip title={t("toggleTheme")}>
        <IconButton onClick={handleOpen} color="inherit">
          {resolvedTheme === "dark" ? <MoonIcon /> : <SunIcon />}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => handleThemeChange("light")} selected={theme === "light"}>
          <ListItemIcon><SunIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t("light")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("dark")} selected={theme === "dark"}>
          <ListItemIcon><MoonIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t("dark")}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange("system")} selected={theme === "system"}>
          <ListItemIcon><SystemIcon fontSize="small" /></ListItemIcon>
          <ListItemText>{t("system")}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
