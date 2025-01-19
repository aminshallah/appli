const express = require('express');
const router = express.Router();
const { User, Family } = require('../models/user');

// Middleware d'authentification (exemple simplifié)
const authenticate = (req, res, next) => {
  // Simule une vérification du token ou de l'utilisateur connecté
  // Ajoutez votre logique d'authentification ici
  next();
};

router.get('/', authenticate, async (req, res) => {
  try {
    const users = await User.find().populate('family'); // Inclure les familles liées
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { name, age, family, role, chef } = req.body;

  try {
    const newUser = new User({ name, age, family, role, chef });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la création de l\'utilisateur', error: err.message });
  }
});

router.get('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('family');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  const updates = req.body;

  try {
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('family');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la mise à jour', error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

router.post('/:id/assign-family', authenticate, async (req, res) => { //maj de la famille
  const { familyId } = req.body;

  try {
    const user = await User.findById(req.params.id);
    const family = await Family.findById(familyId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    if (!family) {
      return res.status(404).json({ message: 'Famille introuvable' });
    }

    // Vérifier si l'utilisateur appartient déjà à une famille
    if (user.family) {
        const oldFamily = await Family.findById(user.family._id);
  
        // Retirer l'utilisateur de l'ancienne famille
        oldFamily.members = oldFamily.members.filter(memberId => memberId.toString() !== user._id.toString());
        await oldFamily.save();
    }
    
    user.family = family._id;
    await user.save();

    family.members.push(user._id);
    await family.save();

    res.status(200).json({ message: 'Famille assignée avec succès', user, family });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'assignation', error: err.message });
  }
});

router.get('/user/me', authenticate, async (req, res) => {
	try {
	  const userId = req.userId; // Assurez-vous d'avoir un middleware d'authentification pour définir req.userId
	  const user = await User.findById(userId).populate('family').exec();
  
	  if (!user) {
		return res.status(404).json({ message: 'Utilisateur non trouvé' });
	  }
  
	  const response = {
		isConnected: true,
		role: user.role,
		chef: user.chef,
		shotgunSuccess: user.family ? user.family.shotgun : false,
	  };
  
	  res.json(response);
	} catch (err) {
	  console.error('Erreur lors de la récupération des informations utilisateur:', err);
	  res.status(500).json({ message: 'Erreur serveur' });
	}
  });

module.exports = router;