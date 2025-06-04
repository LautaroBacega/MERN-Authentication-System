// Updated auth.route.js - Add these routes to your existing routes
import express from 'express';
import { 
  signin, 
  signup, 
  google, 
  signout,
  requestPasswordReset,
  verifyResetToken,
  resetPassword
} from '../controllers/auth.controller.js';

const router = express.Router();

// Existing routes
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);

// New password reset routes
router.post('/request-password-reset', requestPasswordReset);
router.get('/verify-reset-token/:token', verifyResetToken);
router.post('/reset-password', resetPassword);

export default router;