import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link as RouterLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Dashboard', to: '/dashboard' },
  {label: 'New In', to: '/products/new-in'},
  // {label: ' Clothing', to: '/products/clothing'},
  // {label: 'Dresses', to:'/products/dresses'},
  {label: 'About', to:'/about'},
];

const palette = {
  background: '#faf8f5',
  primary: '#252525',
  secondary: '#8b8178',
  accent: '#b8a08c',
  border: '#e8e2dc',
};

const NavBar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: palette.background,
        color: palette.primary,
        borderBottom: `1px solid ${palette.border}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', gap: 1 }}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          sx={{
            color: palette.primary,
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          My Shop
        </Typography>

        <Box component="nav" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={RouterLink}
              to={item.to}
              sx={{
                textTransform: 'none',
                color: palette.secondary,
                '&:hover': { color: palette.accent },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <IconButton></IconButton>

        <IconButton aria-label="cart" sx={{  color: palette.primary }}>
          <Badge badgeContent={3} sx={{ '& .MuiBadge-badge': { bgcolor: palette.accent, color: '#fff' } }}>
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;