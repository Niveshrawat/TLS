import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Avatar, Rating } from '@mui/material';
import { deepOrange, deepPurple, blue, green, pink } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';

const getColor = (index) => {
  const colors = [deepOrange[500], deepPurple[500], blue[500], green[500], pink[500]];
  return colors[index % colors.length];
};

const Reviews = ({ reviews }) => {
  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#fff', marginBottom: '2rem' }}>
      <Typography variant="h4" gutterBottom fontWeight='bold'>Reviews</Typography>
      <Grid container spacing={2}>
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  <Avatar sx={{ bgcolor: getColor(index), marginRight: '1rem' }}>{review.author.charAt(0)}</Avatar>
                  <Typography variant="subtitle2" color="textSecondary" fontWeight='bold'>- {review.author}</Typography>
                </Box>
                <Typography variant="body1" gutterBottom>{review.content}</Typography>
                <Rating
                  name="read-only"
                  value={5}
                  readOnly
                  icon={<StarIcon fontSize="inherit" />}
                  emptyIcon={<StarIcon fontSize="inherit" style={{ opacity: 0.55 }} />}
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: 'gold',
                    },
                    '& .MuiRating-iconHover': {
                      color: 'gold',
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reviews;
