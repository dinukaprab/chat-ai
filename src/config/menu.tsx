import PostAddIcon from "@mui/icons-material/PostAdd";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PermMediaOutlinedIcon from "@mui/icons-material/PermMediaOutlined";

interface MenuItemConfig {
  id: string;
  text: string;
  icon: React.ReactElement;
}

export const MENU_CONFIG: MenuItemConfig[] = [
  {
    id: "sidebar-new-chat",
    text: "New Chat",
    icon: <PostAddIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />,
  },
  {
    id: "sidebar-search-chats",
    text: "Search Chats",
    icon: <ManageSearchIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />,
  },
  {
    id: "sidebar-library",
    text: "Library",
    icon: <PermMediaOutlinedIcon sx={{ fontSize: { xs: 16, sm: 18 } }} />,
  },
];
