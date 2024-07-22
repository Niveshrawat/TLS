import express from 'express';
import { submitIndustrialWorkshopForm, getIndustrialWorkshops } from '../controllers/industrialWorkshopController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-industrial-workshop', submitIndustrialWorkshopForm);

// Route to get all industrial workshops
router.get('/industrial-workshops', getIndustrialWorkshops);
// router.get('/industrial-workshops',requireSignIn,isAdmin, getIndustrialWorkshops);

export default router;
