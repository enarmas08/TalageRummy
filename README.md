### Création de la solution de notre projet 

### Ajouter un projet Node.js dans Visual Studio 2022

1. **Ouvrez Visual Studio 2022**.
2. **Créez une nouvelle solution vide** si vous ne l'avez pas déjà fait.
   - `Fichier` > `Nouveau` > `Projet...`.
   - Choisissez `Solution vide`.
   - Donnez un nom et un emplacement à votre solution et cliquez sur `Créer`.

3. **Ajouter un projet Node.js** :
   - **Clique droit sur la solution** dans l'Explorateur de solutions.
   - **Sélectionnez `Ajouter` > `Nouveau projet...`**.
   - **Cherchez `Node.js`** dans les modèles de projet disponibles.
   - **Choisissez `Application JavaScript Node.js vide`** (ou un modèle similaire selon votre besoin).
   - **Nommez le projet** et sélectionnez l'emplacement de votre projet existant.

### Ajouter un projet Angular dans Visual Studio 2022

1. **Ajouter un projet Angular** :
   - **Clique droit sur la solution** dans l'Explorateur de solutions.
   - **Sélectionnez `Ajouter` > `Nouveau projet...`**.
   - **Cherchez `ASP.NET Core avec Angular`** dans les modèles de projet disponibles.
   - **Choisissez `Application Angular`** (ou un modèle similaire selon votre besoin).
   - **Nommez le projet** et sélectionnez l'emplacement de votre projet existant.

### Déplacer les fichiers existants dans les nouveaux projets

1. **Déplacez les fichiers existants** de vos projets Node.js et Angular dans les nouveaux projets créés par Visual Studio 2022.
   - Copiez les fichiers de votre projet Node.js existant (par exemple, `index.js`, `package.json`, etc.) dans le répertoire du projet Node.js créé par Visual Studio.
   - Faites de même pour votre projet Angular.

### Configurer le débogage (n'a pas fontionné pour moi)

1. **Configurer le débogage pour Node.js** :
   - **Clique droit sur le projet Node.js** dans l'Explorateur de solutions et sélectionnez `Propriétés`.
   - **Configurez les paramètres de débogage** si nécessaire (par exemple, spécifiez les arguments de la ligne de commande, le répertoire de travail, etc.).

2. **Configurer le débogage pour Angular** :
   - **Clique droit sur le projet Angular** dans l'Explorateur de solutions et sélectionnez `Propriétés`.
   - **Configurez les paramètres de débogage** si nécessaire.

### Configurer les Projets de Démarrage Multiples

1. **Configurer les projets de démarrage multiples** :
   - **Clique droit sur la solution** dans l'Explorateur de solutions et sélectionnez `Propriétés`.
   - **Dans la section "Projets de démarrage"**, sélectionnez `Projets de démarrage multiples`.
   - **Pour chaque projet (Node.js et Angular)**, sélectionnez `Démarrer` dans la colonne `Action`.

### Exécuter et Déboguer les Projets

1. **Appuyez sur `F5`** ou cliquez sur le bouton `Démarrer le débogage` dans la barre d'outils de Visual Studio.
2. **Visual Studio démarrera les deux projets** (Node.js et Angular) et vous pourrez les déboguer simultanément.

### Ajouter le NPM task runner
https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NpmTaskRunner64

### Conclusion

En suivant ces étapes, vous pouvez configurer Visual Studio 2022 pour gérer vos projets Node.js et Angular dans une solution unique, permettant ainsi de déboguer et de travailler sur les deux projets simultanément.



