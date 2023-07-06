import mongoose from "mongoose";
import postMessage from "../models/postMessage.js";
export const getPosts = async (req, res) => {
	try {
		const postMessages = await postMessage.find();
		res.status(200).json(postMessages);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
export const createPost = async (req, res) => {
	const post = req.body;
	const newPost = new postMessage(post);
	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};
export const updatePost = async (req, res) => {
	const { id: _id } = req.params;
	const post = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send("NO POST WITH THAT ID");
	const updatedPost = await postMessage.findByIdAndUpdate(
		_id,
		{ ...post, _id },
		{
			new: true,
		}
	);
	res.json(updatedPost); //json string
};

export const deletePost = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("NO POST WITH THAT ID");
	await postMessage.findByIdAndRemove(id);
	res.json("Post deleted successfully");
};

export const likePost = async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send("NO POST WITH THAT ID");
	const post = await postMessage.findById(id);
	const updatedPost = await postMessage.findByIdAndUpdate(
		id,
		{
			likeCount: post.likeCount + 1,
		},
		{ new: true }
	);
	res.json(updatedPost);
};
