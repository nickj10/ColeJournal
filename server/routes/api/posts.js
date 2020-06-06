const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
}); // the / means /api/post because we directed the endpoint to this file

// Add post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) }); // wrap it because _id is an ObjectID
  res.status(200).send();
});

// Set up the connection to the database
async function loadPostsCollection() {
  const uri =
    "mongodb+srv://cole:Horbie08@kuzcole-nscez.mongodb.net/test?retryWrites=true&w=majority";
  const client = await mongodb.MongoClient.connect(uri, {
    useNewUrlParser: true,
  });

  return client.db("test").collection("posts");
}

// always export the router
module.exports = router;
