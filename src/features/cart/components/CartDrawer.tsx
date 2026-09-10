import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Divider,
  Stack,
  CardMedia,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../hooks/useCart';

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const palette = {
  primary: '#252525',
  secondary: '#8b8178',
  accent: '#b8a08c',
  border: '#e8e2dc',
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: '100%', sm: 400 },
            bgcolor: '#faf8f5',
          },
        },
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Your Cart ({cartCount()})
        </Typography>
        <IconButton onClick={onClose} aria-label="close cart">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: palette.border }} />

      {/* Empty state */}
      {cart.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            Your cart is empty
          </Typography>
        </Box>
      )}

      {/* Items */}
      <Stack sx={{ flexGrow: 1, overflow: 'auto', p: 2 }} spacing={2}>
        {cart.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              gap: 2,
              p: 1.5,
              bgcolor: '#fff',
              borderRadius: 2,
              border: `1px solid ${palette.border}`,
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              sx={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0, borderRadius: 1 }}
            />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                ${item.price.toFixed(2)}
              </Typography>

              {/* Quantity controls */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  sx={{ border: `1px solid ${palette.border}`, width: 28, height: 28 }}
                  aria-label="decrease quantity"
                >
                  <RemoveIcon sx={{ fontSize: 14 }} />
                </IconButton>
                <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center', fontWeight: 600 }}>
                  {item.quantity}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  sx={{ border: `1px solid ${palette.border}`, width: 28, height: 28 }}
                  aria-label="increase quantity"
                >
                  <AddIcon sx={{ fontSize: 14 }} />
                </IconButton>

                <IconButton
                  size="small"
                  onClick={() => removeFromCart(item.id)}
                  sx={{ ml: 'auto', color: palette.secondary }}
                  aria-label="remove item"
                >
                  <DeleteIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>

      {/* Footer total */}
      {cart.length > 0 && (
        <>
          <Divider sx={{ borderColor: palette.border }} />
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                ${cartTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Drawer>
  );
}
