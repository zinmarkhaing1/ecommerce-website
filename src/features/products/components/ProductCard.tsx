import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Modal,
} from "@mui/material";
import { Button } from "../../../shared/components/Button";
import type { Product } from "../../../shared/types";
import React, { useState } from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    // <article className="product-card">
    //   <div className="product-card__image-wrap">
    //     <img className="product-card__image" src={product.image} alt={product.title} loading="lazy" />
    //   </div>
    //   <div className="product-card__content">
    //     <p className="product-card__category">{product.category}</p>
    //     <h2 className="product-card__title">{product.title}</h2>
    //     <div className="product-card__meta">
    //       <strong>${product.price.toFixed(2)}</strong>
    //       <span aria-label={`${product.rating.rate} out of 5 stars`}>
    //         {product.rating.rate.toFixed(1)} / 5
    //       </span>
    //     </div>
    //     <Button variant="primary">Add to cart</Button>
    //   </div>
    // </article>

    <>
      <Card
        component="article"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Image */}
        <Box
          onClick={handleOpen}
          sx={{
            height: 280,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "grey.50",
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Content */}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            p: 3,
          }}
        >
          {/* Category */}
          <Typography
            component="p"
            variant="overline"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            {product.category}
          </Typography>

          {/* Title */}
          <Typography
            component="h2"
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              minHeight: "3.5rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.title}
          </Typography>

          {/* Price + Rating */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              m: 2,
            }}
          >
            <Typography
              component="strong"
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              ${product.price.toFixed(2)}
            </Typography>

            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              aria-label={`${product.rating.rate} out of 5 stars`}
            >
              {product.rating.rate.toFixed(1)} / 5
            </Typography>
          </Box>

          {/* Button */}
          <Button variant="contained" sx={{ mt: "auto", fullwidth: true }}>
            Add to cart
          </Button>
        </CardContent>
      </Card>
  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={`product-${product.id}-title`}
        aria-describedby={`product-${product.id}-description`}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",

            width: {
              xs: "90%",
              sm: 600,
              md: 800,
            },

            maxHeight: "90vh",
            overflowY: "auto",

            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: {
              xs: 2,
              sm: 4,
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 4,
              alignItems: "center",
            }}
          >
            {/* Modal Image */}
            <Box
              sx={{
                height: {
                  xs: 250,
                  sm: 350,
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.50",
                borderRadius: 2,
                p: 2,
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            {/* Modal Details */}
            <Box>
              {/* Category */}
              <Typography
                variant="overline"
                color="text.secondary"
                sx={{
                  fontWeight: 600,
                }}
              >
                {product.category}
              </Typography>

              {/* Title */}
              <Typography
                id={`product-${product.id}-title`}
                component="h2"
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mt: 1,
                  mb: 2,
                }}
              >
                {product.title}
              </Typography>

              {/* Rating */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <StarOutlinedIcon
                  sx={{
                    fontSize: "1rem",
                    verticalAlign: "middle",
                    mr: 1,
                    color: "goldenrod",
                  }}
                />
                {product.rating.rate.toFixed(1)} / 5 ({product.rating.count}{" "}
                reviews)
              </Typography>

              {/* Price */}
              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                ${product.price.toFixed(2)}
              </Typography>

              {/* Description */}
              <Typography
                id={`product-${product.id}-description`}
                variant="body1"
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                {product.description}
              </Typography>

              {/* Add to cart */}
              <Box
                sx={{
                 display: 'flex',
                flexDirection: 'row',
                gap: 1,
                mt: 2,
                }}
              >
                <Button variant="contained"
                 size="large" 
                 fullWidth
                  >
                  Add to cart
                </Button>

                {/* Close */}
                <Button
                  variant="text"
                  size="large"
                  fullWidth
                  onClick={handleClose}
                  sx={{ flex:1, }}
                >
                  Close
                </Button>
              </Box>


            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
