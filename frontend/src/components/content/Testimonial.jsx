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
    name: "Sunil Gupta",
    title: "Warehouse Manager",
    image:
      "https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?t=st=1727865161~exp=1727868761~hmac=a5f5e74c550c839f9f42bc6039b4e731b5a1aa19ef90252cc01607a1e06cc977&w=996",
    review:
      "I was struggling to advance my career as a Warehouse Manager until I discovered this platform. The wide range of courses offered helped me gain the specific skills required in the logistics and warehouse industry. The training I received was practical and relevant, and it gave me the confidence to apply for better positions. Thanks to this platform, I was able to secure my current job as a Warehouse Manager, and it has made a real difference in my career growth.",
  },
  {
    id: 2,
    name: "Anjali Rawat",
    title: "Banker",
    image:
      "https://img.freepik.com/free-photo/portrait-beautiful-woman-isolated-yellow-studio-background_155003-25086.jpg?w=996&t=st=1727864751~exp=1727865351~hmac=8c100f0994561dfd37b233bebe2d2c372782b6e83f99ebf3ce78ae6170086ad5",
    review:
      "This platform has completely transformed the way I learn. The courses are detailed and easy to follow, making complex topics much more understandable. I feel more confident in my studies, and the practical skills I’ve gained have been incredibly helpful.",
  },
  {
    id: 3,
    name: "Vishal",
    title: "Student",
    image:
      "https://as2.ftcdn.net/v2/jpg/06/26/63/73/1000_F_626637387_XsQrkVTjAAF2UVo2ptQQhGFTOPJHW0Mq.jpg",
    review:
      "I faced a lot of struggles in finding a job. Then I came across this platform, where I found numerous courses that helped me enhance my skills, especially those that are in demand by the industry. Thanks to these skills, I was able to land a job.",
  },
  {
    id: 4,
    name: "Rashmika",
    title: "Student",
    image:
      "https://img.freepik.com/premium-photo/indian-female-college-student-with-book-andbag_714173-3149.jpg?w=740",
    review:
      "What I love most about this website is the flexibility it offers. I can learn at my own pace, and the expert instructors are always available to help with any doubts. The quality of the courses is top-notch, and it’s had a significant impact on my academic performance",
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
      <Typography variant="h4" fontWeight="bold" mb={4}>
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
