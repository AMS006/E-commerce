import express from "express";
import {initialData} from '../../controllers/initialData'

const router = express.Router();

router.get('/',initialData)

module.exports = router