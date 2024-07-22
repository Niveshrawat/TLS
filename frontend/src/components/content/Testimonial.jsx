import React from "react";
import Slider from "react-slick";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/system";

// Custom styling for slick dots
const SlickDots = styled("ul")({
  bottom: "-25px",
  "& li.slick-active button:before": {
    color: "#8B93FF",
  },
  "& li button:before": {
    fontSize: "15px",
    color: "#5755FE",
  },
});

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "Olive Yew",
    title: "CEO, Psdboss",
    image:
      "https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg",
    review:
      "I would also like to say thank you to all your staff. It's the perfect solution for our business. Education is the most valuable business resource we have EVER purchased.",
  },
  {
    id: 2,
    name: "Maria Zokatti",
    title: "CEO, Psdboss",
    image:
      "https://experteditor.com.au/wp-content/uploads/2023/07/signs-youre-a-great-person.png",
    review:
      "Engage with our professional real estate agents to sell, buy, or rent your home. Get emails directly in your inbox. Quis ipsum suspendisse ultrices gravida.",
  },
  {
    id: 3,
    name: "Judy N",
    title: "CEO, Psdboss",
    image:
      "https://www.psychologs.com/wp-content/uploads/2024/01/8-tips-to-be-a-jolly-person.jpg",
    review:
      "Your company is truly upstanding and is behind its product 100%. I STRONGLY recommend education to EVERYONE interested in running a successful online business.",
  },
  {
    id: 4,
    name: "Gabbey A.",
    title: "CEO, Psdboss",
    image:
      "https://images.healthshots.com/healthshots/en/uploads/2020/12/08182549/positive-person.jpg",
    review:
      "Just what I was looking for. Best. Product. Ever! Education is great. Education is the most valuable business resource we have EVER purchased.",
  },
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => <SlickDots>{dots}</SlickDots>,
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "60px 0",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" mb={4}>
        What our clients Say About us
      </Typography>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            sx={{
              padding: 4,
              margin: "0 auto",
              maxWidth: 900,
              position: "relative",
              marginBottom: "2rem",
            }}
          >
           {/* <img
              src="https://wordpress-theme.spider-themes.net/zoomy/wp-content/uploads/2021/12/quote.svg"
              style={{
                position: "absolute",
                top: "10px",
                left: "17rem",
                transform: "rotate(180deg)",
                width: "50px",
                height: "50px",
                
                filter: "invert(40%) sepia(100%) saturate(5000%) hue-rotate(220deg) brightness(80%) contrast(120%)",
              }}
              alt="quote"
            /> */}
            <Grid container spacing={2} alignItems="center">
              <Grid
                item
                xs={12}
                md={4}
                sx={{ textAlign: { xs: "center", md: "right" } }}
              >
                <Avatar
                  src={testimonial.image}
                  alt={testimonial.name}
                  sx={{
                    width: 200,
                    height: 200,
                    margin: "0 auto",
                    borderRadius: 0,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                <CardContent>
                  <Typography variant="body1" mb={2}>
                    <i className="fa-solid fa-quote-left"></i>{" "}
                    {testimonial.review}
                  </Typography>
                  <Typography variant="h6">{testimonial.name}</Typography>
                  <Typography variant="subtitle1">
                    {testimonial.title}
                  </Typography>
                  <Box>
                    {[...Array(5)].map((_, index) => (
                      index < testimonial.rating ? 
                      <StarIcon key={index} sx={{ color: 'gold' }} /> : 
                      <StarBorderIcon key={index} sx={{ color: 'gold' }} />
                    ))}
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default TestimonialSlider;
