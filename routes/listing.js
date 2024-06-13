const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js"); 
const litingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage}); 


//Index and Create Routes
router
 .route("/")
 .get(wrapAsync(litingController.index))
 .post(
   isLoggedIn,
   upload.single("listing[image]"),
   validateListing,
   wrapAsync(litingController.createListing)
 );

// New Route
router.get("/new", isLoggedIn, litingController.renderNewForm );


//Show, Update and Delete Routes
router.route("/:id")
.get(wrapAsync(litingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(litingController.updateListings))
  .delete( 
   isLoggedIn,
   isOwner,
  wrapAsync(litingController.destoryListing));
 
  //Edit Route
  router.get("/:id/edit", 
  isLoggedIn,
  isOwner,
   wrapAsync(litingController.renderEditForm)
);

  
  

  module.exports = router;