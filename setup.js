#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Configuration de CAPS FACT avec MongoDB\n');

// Vérifier si .env existe déjà
if (fs.existsSync('.env')) {
  console.log('⚠️  Le fichier .env existe déjà.');
  rl.question('Voulez-vous le remplacer ? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      createEnvFile();
    } else {
      console.log('Configuration annulée.');
      rl.close();
    }
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  console.log('\n📝 Configuration des variables d\'environnement...\n');

  const questions = [
    {
      name: 'mongodb_uri',
      question: 'URL MongoDB (défaut: mongodb://localhost:27017/caps_fact): ',
      default: 'mongodb://localhost:27017/caps_fact'
    },
    {
      name: 'jwt_secret',
      question: 'Secret JWT (défaut: caps_fact_secret_2024): ',
      default: 'caps_fact_secret_2024'
    },
    {
      name: 'port',
      question: 'Port du serveur (défaut: 3000): ',
      default: '3000'
    }
  ];

  const answers = {};

  function askQuestion(index) {
    if (index >= questions.length) {
      generateEnvFile(answers);
      return;
    }

    const question = questions[index];
    rl.question(question.question, (answer) => {
      answers[question.name] = answer.trim() || question.default;
      askQuestion(index + 1);
    });
  }

  askQuestion(0);
}

function generateEnvFile(answers) {
  const envContent = `# Configuration MongoDB
MONGODB_URI=${answers.mongodb_uri}

# Configuration JWT
JWT_SECRET=${answers.jwt_secret}
JWT_EXPIRES_IN=24h

# Configuration serveur
PORT=${answers.port}
NODE_ENV=development

# Configuration sécurité
BCRYPT_ROUNDS=12
`;

  fs.writeFileSync('.env', envContent);

  console.log('\n✅ Fichier .env créé avec succès !');
  console.log('\n📋 Prochaines étapes :');
  console.log('1. Installer les dépendances : npm install');
  console.log('2. Démarrer MongoDB');
  console.log('3. Lancer le serveur : npm run dev');
  console.log('4. Ouvrir http://localhost:' + answers.port);
  console.log('\n📖 Consultez README_MONGODB.md pour plus d\'informations');

  rl.close();
} 