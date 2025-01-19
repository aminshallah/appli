//bellec le pcs fait tjrs des erreurs chiantes genre par exemple le script trouvait pas un chef psk l'apostrophe etait pas le meme dans les deux fichiers

const mongoose = require('mongoose');
const XLSX = require('xlsx');
const { User, Family } = require('../models/user'); // Import des modèles

// Connexion à MongoDB
mongoose.connect('mongodb+srv://noe:6bm9blTtQCAdS6YI@wei-cs.lzblm.mongodb.net/?retryWrites=true&w=majority&appName=WEI-CS')
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(err => console.log('Erreur de connexion :', err));

// Lire le fichier Excel
const workbook = XLSX.readFile('./Parrainage 2024.xlsx'); // Remplacez par le chemin réel
const gdaData = XLSX.utils.sheet_to_json(workbook.Sheets['GDA']);
const gpaData = XLSX.utils.sheet_to_json(workbook.Sheets['GPA']);
const famillesData = XLSX.utils.sheet_to_json(workbook.Sheets['Familles']);

// Fonction pour importer les données
const importData = async () => {
  try {
        // Suppression de tous les documents de la collection Family
    await Family.deleteMany({}); // Vide la collection Family

    // Suppression de tous les documents de la collection User
    await User.deleteMany({}); // Vide la collection User

    console.log('Toutes les données ont été supprimées.');

    const familyMap = {}; // Associer les familles à leurs IDs

    // Étape 1 : Créer les familles sans chefs
    for (const row of famillesData) {
      const familyName = row['Famille'];

      // Créer une famille vide pour chaque famille trouvée
      const family = new Family({
        name: familyName,
        members: [],
      });
      await family.save();

      familyMap[familyName] = family._id; // Associer l'ID de la famille à son nom
    }

    // Étape 2 : Ajouter tous les utilisateurs (GDA et GPA)
    const addMembers = async (data) => {
      for (const row of data) {
        const userName = row['Nom'];
        const familyName = row['Famille'];

        // Vérifier si la famille existe
        const familyId = familyMap[familyName];
        if (!familyId) {
          console.error(`Famille ${familyName} introuvable pour le membre ${userName}`);
          continue;
        }

        // Créer un utilisateur et l'associer à la famille
        const user = new User({
          name: userName,
          family: familyId,
        });
        await user.save();

        // Ajouter l'utilisateur à la liste des membres de la famille
        const family = await Family.findById(familyId);
        family.members.push(user._id);
        await family.save();
      }
    };

    await addMembers(gdaData); // Ajouter les membres de GDA
    await addMembers(gpaData); // Ajouter les membres de GPA

    // Étape 3 : Mettre à jour les chefs à partir de la feuille "Familles"
    for (const row of famillesData) {
      const familyName = row['Famille'];
      const chefName = row['Respo'];

      // Trouver la famille
      const familyId = familyMap[familyName];
      if (!familyId) {
        console.error(`Famille ${familyName} introuvable pour le chef ${chefName}`);
        continue;
      }

      // Trouver l'utilisateur correspondant au chef
      const chef = await User.findOne({ name: { $regex: new RegExp('^' + chefName, 'i') } }); // chefName sera recherché sans tenir compte de la casse 
      if (!chef) {
        console.error(`Chef ${chefName} introuvable dans la base`);
        continue;
      }

      // Mettre à jour le rôle et l'association du chef
      chef.chef = true;
      chef.family = familyId;
      await chef.save();

      // Mettre à jour la famille pour indiquer le chef
      const family = await Family.findById(familyId);
      family.chef = chef._id;
      if (!family.members.includes(chef._id)) {
        family.members.push(chef._id);
      }
      await family.save();
    }

    console.log('Importation réussie');
    process.exit(0); // Quitter le script
  } catch (err) {
    console.error('Erreur lors de l\'importation :', err);
    process.exit(1); // Quitter avec une erreur
  }
};

// Lancer l'importation
importData();