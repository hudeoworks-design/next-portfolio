"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
// Use useColorScheme to keep MUI and next-themes synced
import { useColorScheme } from "@mui/material/styles"; 
import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { 
  Brightness4 as MoonIcon, 
  Brightness7 as SunIcon, 
  SettingsBrightness as SystemIcon 
} from "@mui/icons-material";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { setMode } = useColorScheme(); // MUI v7 hook
  const t = useTranslations("ThemeSwitcher");
  
  const [mounted, setMounted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Sync mounted state to prevent hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <IconButton disabled aria-label="loading theme"><SystemIcon /></IconButton>;
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    // 1. Update next-themes (updates the <html> class)
    setTheme(newTheme);
    // 2. Update MUI internal state (updates the CSS variables)
    setMode(newTheme); 
    handleClose();
  };

  // Determine which icon to show on the main button
  const currentIcon = () => {
    if (theme === "light") return <SunIcon />;
    if (theme === "dark") return <MoonIcon />;
    return <SystemIcon />;
  };

  return (
    <>
      <Tooltip title={t("toggleTheme")}>
        <IconButton onClick={handleOpen} color="inherit" aria-haspopup="true">
          {currentIcon()}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
            paper: { sx: { mt: 1.5, minWidth: 150 } }
        }}
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
