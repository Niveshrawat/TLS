import React,{useState} from 'react';
import { Card, CardContent, Dialog, DialogTitle ,DialogContent, CardMedia, Typography, Box, Button, IconButton } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import CollegeForm from '../forms/PostGraduate';


const PostGraduateCard = ({ college }) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
    <Card sx={{ display: 'flex', marginBottom: 3, marginTop:3 ,marginLeft:2 }}>
     
      <CardMedia
        component="img"
        sx={{ width: 250, height:200, m:2 }}
        image={college.image}
        alt={college.name}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {college.name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {college.description}
          </Typography> */}
          <Typography variant="body2" color="text.secondary">
            <CurrencyRupeeIcon sx={{fontSize:16, color: '#FFAF45'}} />           
            {college.fees}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            <LocationOnIcon sx={{fontSize:16, color: '#059212'}} />
            {college.location}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Course: {college.course}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Package: {college.package}
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleClickOpen}>
            Apply Now
          </Button>
        </CardContent>
      </Box>
    </Card>
    
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        {/* <DialogTitle>Register with us</DialogTitle> */}
        <DialogContent>
          <CollegeForm />
        </DialogContent>
      </Dialog>
    
    </div>

  );
};

export default PostGraduateCard;
