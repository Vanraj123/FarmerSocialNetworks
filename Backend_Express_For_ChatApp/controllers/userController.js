const User = require("../models/user");
const Msg = require("../models/msg");
const Group = require("../models/group");
const { deleteGroup } = require("./groupController")
const bcrypt = require('bcryptjs');
const { generateToken } = require('../services/authService');
const fs = require('fs');
const path = require('path');

const signup = async (req, res) => {
  try {
    const Exuser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (Exuser) {
      return res.status(400).send({ message: 'User already exist.' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      profilePicture: req.profilePicture ? `/uploads/${req.profilePicture}` : null // Save the path to the uploaded file
    });
    console.log('Profile picture path:', req.file ? req.file.path : 'No file uploaded');

    await user.save();
    res.status(201).send({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ email: username });
    console.log(username);
    console.log(user);
    if (!user)
      return res.status(400).send('Invalid username or password.');
    console.log(password);
    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword)
      return res.status(400).send('Invalid username or password.');

    // Generate JWT token
    const token = generateToken(user);
    res.status(200).send({ token, user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send('User not found.');
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user)
      return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { phoneNo, language, bio } = req.body;

    // Fetch the current user data
    const currentUser = await User.findById(userId);
    if (!currentUser)
      return res.status(404).json({ error: 'User not found' });

    const updatedData = {
      phoneNo,
      language,
      bio,
    };

    // Handle profile picture if provided
    if (req.file) {
      // Remove old profile picture if it exists
      if (currentUser.profilePicture) {
        const oldPicturePath = path.join(__dirname, '..', currentUser.profilePicture);
        if (fs.existsSync(oldPicturePath)) {
          fs.unlinkSync(oldPicturePath);
        }
      }

      // Set new profile picture path
      updatedData.profilePicture = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    res.json(user);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).send(error);
  }
};

const updateProfileById = async (req, res) => {
  const { username, email, phoneNo, profilePicture, language, bio } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, phoneNo, profilePicture, language, bio },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
}
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user)
      return res.status(404).send();

    await Msg.deleteMany({ $or: [{ sender: userId }, { receiver: userId }] });

    const groups = await Group.find({ $or: [{ admin: userId }, { participant: userId }] });
    for (const group of groups) {
      if (group.admin.equals(userId)) {
        req.params.uid = req.params.id
        req.params.gid = group._id
        await deleteGroup(req, res);
      }
      else
        await Group.updateOne({ _id: group._id }, { $pull: { participant: userId } });
    }

    await User.findByIdAndDelete(userId);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createContact = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const contactId = req.params.cid;
    const contactUser = await User.findById(contactId);

    if (!user || !contactUser) {
      return res.status(404).json({ message: 'User or contact user not found' });
    }

    const contactExists = user.contact.some(contact => contact.receiver.equals(contactId));
    if (contactExists) {
      return res.status(400).json({ message: 'Contact already exists' });
    }

    const contact = {
      receiver: contactId,
      lastSeen: new Date(),
    };
    const contactForUser = {
      receiver: req.params.id,
      lastSeen: new Date(),
    };

    user.contact.push(contact);
    contactUser.contact.push(contactForUser);
    await user.save();
    await contactUser.save();

    // Emit socket events to notify both users of the new contact
    const io = req.app.get('socketio'); // Get socket.io instance
    io.to(user._id.toString()).emit('new-contact', { contact: contactForUser });
    io.to(contactUser._id.toString()).emit('new-contact', { contact });

    res.status(201).json({ message: 'Contact added successfully' });
  } catch (error) {
    res.status(400).send(error);
  }
};
const getContactsById = async (req, res) => {
  try {
    // Fetch the user by ID and populate contact details
    const user = await User.findById(req.params.id).populate('contact.receiver', 'username email profilePicture'); // Include fields you want to return

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Return the populated contacts
    res.status(200).json(user.contact); // Status 200 for successful retrieval
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

const getContactsAndGroupsById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId)
      .populate('contact.receiver', 'username profilePicture') // Fetch contacts
      .populate('group', 'name'); // Fetch groups with just the name

    const contacts = user.contact;
    const groups = user.group;

    res.json({ contacts, groups });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

const deleteContactById = async (req, res) => {
  try {
    const userId = req.params.id;
    const receiverId = req.params.cid;

    const user = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    if (!user || !receiver) {
      return res.status(404).json({ message: 'User or contact user not found' });
    }

    user.contact = user.contact.filter(contact => !contact.receiver.equals(receiverId));
    receiver.contact = receiver.contact.filter(contact => !contact.receiver.equals(userId));
    await user.save();
    await receiver.save();

    await Msg.deleteMany({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId }
      ]
    });

    res.status(200).json({ message: 'Contact deleted successfully' });
  }
  catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  signup,
  login,
  getCurrentUser,
  getUsers,
  getUserById,
  getUserByUsername,
  updateUserById,
  updateProfileById,
  deleteUserById,
  createContact,
  getContactsById,
  getContactsAndGroupsById,
  deleteContactById
};