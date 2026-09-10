import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  InputAdornment,
  IconButtonProps,
  type SelectChangeEvent,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, type MouseEvent } from 'react';
import { useAuth } from '../../auth';
import { useCart, CartDrawer } from '../../cart';


const palette = {
  background: '#faf8f5',
  primary: '#252525',
  secondary: '#8b8178',
  accent: '#b8a08c',
  border: '#e8e2dc',
};

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [titleSearch, setTitleSearch] = useState('');

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'New In', to: '/products/new-in' },
    { label: 'About', to: '/about' },
    ...(isAuthenticated ? [{ label: 'Dashboard', to: '/dashboard' }] : []),
  ];

  const [search, setSearch] = useState('');
  const categories = [
    { label: 'All products', value: '' },
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Women's clothing", value: "women's clothing" },
    { label: 'Jewelery', value: 'jewelery' },
    { label: 'Electronics', value: 'electronics' },
  ];

  function handleLogout() {
    setProfileAnchor(null);
    logout();
    navigate('/login', { replace: true });
  }

  function handleProfileOpen(event: MouseEvent<HTMLElement>) {
    setProfileAnchor(event.currentTarget);
  }

  function handleCategoryChange(event: SelectChangeEvent) {
    const category = event.target.value;
    setSearch(category);

    if (!category) {
      navigate('/products');
      return;
    }

    navigate(`/products?search=${encodeURIComponent(category)}`);
  }

  function handleTitleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = titleSearch.trim();

    navigate(query ? `/products?q=${encodeURIComponent(query)}` : '/products');
  }

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: palette.background, color: palette.primary }}>
        <Toolbar sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, py: 1 }}>
          <Box component={RouterLink} to="/products" sx={{ color: palette.primary, textDecoration: 'none', mr: 1 }}>
            <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
               My Shop
            </Typography>
          </Box>

          {/* <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={RouterLink}
                to={item.to}
                sx={{ textTransform: 'none', color: palette.secondary, '&:hover': { color: palette.accent } }}
              >
                {item.label}
              </Button>
            ))}
          </Box> */}

          <Box
            component="form"
            onSubmit={handleTitleSearchSubmit}
            sx={{ display: 'flex', flex: 1, minWidth: 260, gap: 1 }}
          >
            <FormControl size="small" sx={{ minWidth: 170 }}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={search}
                label="Category"
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value || 'all'} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              fullWidth
              value={titleSearch}
              onChange={(event) => setTitleSearch(event.target.value)}
              placeholder="Search by title"
              // inputProps={{ 'aria-label': 'Search products by title' }}
               slotProps={{
                input: {
                  'aria-label': 'Search products by title',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" edge="end" aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {!isAuthenticated && (
              <Button component={RouterLink} to="/login" sx={{ textTransform: 'none', color: palette.secondary }}>
                Sign in
              </Button>
            )}

            <IconButton aria-label="cart" sx={{ color: palette.primary }} onClick={() => setCartOpen(true)}>
              <Badge badgeContent={cartCount()} sx={{ '& .MuiBadge-badge': { bgcolor: palette.accent, color: '#fff' } }}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {isAuthenticated && (
              <>
                <IconButton
                  aria-label="account menu"
                  aria-controls={profileAnchor ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  onClick={handleProfileOpen}
                  sx={{ color: palette.primary }}
                >
                  <PersonIcon />
                </IconButton>
                <Menu
                  id="account-menu"
                  anchorEl={profileAnchor}
                  open={Boolean(profileAnchor)}
                  onClose={() => setProfileAnchor(null)}
                >
                  <MenuItem disabled>
                    <ListItemText primary={user?.username ?? 'User'} secondary="Signed in" />
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() => {
                      setProfileAnchor(null);
                      navigate('/dashboard');
                    }}
                  >
                    User information
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default NavBar;