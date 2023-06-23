import express from 'express';
import * as violationController from '../../controllers/violations.js';
import { verifyQueryParams } from '../../middlewares/filters.js';
const router = express.Router();

router.get('/', verifyQueryParams, violationController.getViolations);

export default router;