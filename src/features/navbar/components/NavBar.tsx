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
];

const NavBar = () => {
  return (
    <AppBar position="sticky" elevation={1} sx={{ color:'#f7fff7'}}>
      <Toolbar sx={{ justifyContent: 'space-between', gap: 2 }}>
        <Typography
          component={RouterLink}
          to="/"
          variant="h6"
          sx={{
            color: '#000',
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          Luna Ladies
        </Typography>

        <Box component="nav" sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Button
              key={item.to}
              component={RouterLink}
              to={item.to}
              
              sx={{ textTransform: 'none',color:'#000' }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <IconButton color="inherit" aria-label="cart" sx={{ ml: 0.5 }}>
          <Badge badgeContent={3} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;