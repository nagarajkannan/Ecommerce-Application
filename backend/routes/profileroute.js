import express from 'express'
import { myprofile } from '../controllers/profilecontroller.js'
const profilerouter=express.Router()

profilerouter.get('/myprofile',myprofile);

export default profilerouter;