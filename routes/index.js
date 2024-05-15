const express = require('express')
const swagger = require('./swagger')
const {json} = require("express");
const fs = require("fs");
const app = express()
const port= 3000

app.use(express.json());

// Middleware pour parser le corps des requêtes en JSON
app.use(json());

let database = {};

// Charger les données du fichier JSON au démarrage
try {
  const data = fs.readFileSync('../database.json', 'utf8');
  database = JSON.parse(data);
} catch (err) {
  console.error('Error reading or parsing database.json:', err.message);
}

app.get('/', (req, res) => {
  res.json(database.routes || []);
});

// Route pour obtenir la Database
app.get('/', (req, res) => {
  res.json(database.routes || []);
});

// --------------------------------------------------------
// Drivers
// --------------------------------------------------------


// Route pour obtenir tous les pilotes
app.get('/drivers', (req, res) => {
  res.json(database.drivers || []);
});

// Route pour ajouter un nouveau pilote
app.post('/drivers', (req, res) => {
  const newDriver = req.body;
  (database.drivers || []).push(newDriver);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.status(201).json(newDriver);
});

// Route pour obtenir un pilote par ID
app.get('/drivers/:id', (req, res) => {
  const driverId = parseInt(req.params.id);
  const driver = (database.drivers || []).find(driver => driver.id === driverId);

  if (driver) {
    res.json(driver);
  } else {
    res.status(404).json({error: 'Driver not found'});
  }
});

// Route pour obtenir le coéquipier d'un pilote
app.get('/drivers/:id/teams', (req, res) => {
  const driverId = parseInt(req.params.id);
  const driver = (database.drivers || []).find(driver => driver.id === driverId);

  if (!driver) {
    return res.status(404).json({error: 'Driver not found'});
  }

  const teammates = (database.drivers || []).filter(otherDriver => otherDriver.teamId === driver.teamId && otherDriver.id !== driverId);

  res.json(teammates);
});


// Route pour mettre à jour un pilote par ID
app.put('/drivers/:id', (req, res) => {
  const driverId = parseInt(req.params.id);
  const updatedDriver = req.body;

  database.drivers = (database.drivers || []).map(driver => {
    if (driver.id === driverId) {
      return {...driver, ...updatedDriver};
    }
    return driver;
  });

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'Driver updated successfully'});
});

// Route pour supprimer un pilote par ID
app.delete('/drivers/:id', (req, res) => {
  const driverId = parseInt(req.params.id);
  database.drivers = (database.drivers || []).filter(driver => driver.id !== driverId);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'Driver deleted successfully'});
});


// --------------------------------------------------------
// Teams
// --------------------------------------------------------


// Route pour obtenir toutes les équipes
app.get('/teams', (req, res) => {
  res.json(database.teams || []);
});

// Route pour ajouter une nouvelle équipe
app.post('/teams', (req, res) => {
  const newTeam = req.body;
  (database.teams || []).push(newTeam);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.status(201).json(newTeam);
});

// Route pour obtenir les pilotes d'une équipe
app.get('/teams/:id/drivers', (req, res) => {
  const teamId = parseInt(req.params.id);
  const team = (database.teams || []).find(team => team.id === teamId);

  if (!team) {
    return res.status(404).json({error: 'Driver not found'});
  }

  const driversWithSameTeamId = (database.drivers || []).filter(drivers => drivers.teamId === '/teams/'.concat(teamId));

  res.json(driversWithSameTeamId);
});

// Route pour obtenir une équipe par ID
app.get('/teams/:id', (req, res) => {
  const driverId = parseInt(req.params.id);
  const team = (database.teams || []).find(team => team.id === driverId);

  if (team) {
    res.json(team);
  } else {
    res.status(404).json({error: 'Driver not found'});
  }
});

// Route pour mettre à jour une équipe par ID
app.put('/teams/:id', (req, res) => {
  const teamId = parseInt(req.params.id);
  const updatedTeam = req.body;

  database.teams = (database.teams || []).map(team => {
    if (team.id === teamId) {
      return {...team, ...updatedTeam};
    }
    return team;
  });

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'Team updated successfully'});
});

// Route pour supprimer une équipe par ID
app.delete('/teams/:id', (req, res) => {
  const teamId = parseInt(req.params.id);
  database.teams = (database.teams || []).filter(team => team.id !== teamId);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'Team deleted successfully'});
});


// --------------------------------------------------------
// Races
// --------------------------------------------------------

// Route pour obtenir toutes les courses
app.get('/races', (req, res) => {
  res.json(database.races || []);
});

// Route pour obtenir une course par ID
app.get('/races/:id', (req, res) => {
  const driverId = parseInt(req.params.id);
  const race = (database.races || []).find(race => race.id === driverId);

  if (race) {
    res.json(race);
  } else {
    res.status(404).json({error: 'Race not found'});
  }
});

// Route pour ajouter une nouvelle course
app.post('/races', (req, res) => {
  const newRace = req.body;
  (database.races || []).push(newRace);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.status(201).json(newRace);
});

// Route pour mettre à jour une course par ID
app.put('/races/:id', (req, res) => {
  const raceId = parseInt(req.params.id);
  const updatedRace = req.body;

  database.races = (database.races || []).map(race => {
    if (race.id === raceId) {
      return {...race, ...updatedRace};
    }
    return race;
  });

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'Race updated successfully'});
});

// Route pour supprimer une course par ID
app.delete('/races/:id', (req, res) => {
  const raceId = parseInt(req.params.id);
  database.races = (database.races || []).filter(race => race.id !== raceId);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'Race deleted successfully'});
});


// --------------------------------------------------------
// Circuits
// --------------------------------------------------------

// Route pour obtenir tous les circuits
app.get('/circuits', (req, res) => {
  res.json(database.circuits || []);
});

// Route pour obtenir un circuit par ID
app.get('/circuits/:id', (req, res) => {
  const driverId = parseInt(req.params.id);
  const circuit = (database.circuits || []).find(circuit => circuit.id === driverId);

  if (circuit) {
    res.json(circuit);
  } else {
    res.status(404).json({error: 'Circuit not found'});
  }
});

// Route pour ajouter un nouveau circuit
app.post('/circuits', (req, res) => {
  const newCircuit = req.body;
  (database.circuits || []).push(newCircuit);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.status(201).json(newCircuit);
});

// Route pour mettre à jour un circuit par ID
app.put('/circuits/:id', (req, res) => {
  const circuitId = parseInt(req.params.id);
  const updatedCircuit = req.body;

  database.circuits = (database.circuits || []).map(circuit => {
    if (circuit.id === circuitId) {
      return {...circuit, ...updatedCircuit};
    }
    return circuit;
  });

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'Circuit updated successfully'});
});

// Route pour supprimer un circuit par ID
app.delete('/circuits/:id', (req, res) => {
  const circuitId = parseInt(req.params.id);
  database.circuits = (database.circuits || []).filter(circuit => circuit.id !== circuitId);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'Circuit deleted successfully'});
});

// --------------------------------------------------------
// LapTimes
// --------------------------------------------------------

// Route pour obtenir tous les temps au tour
app.get('/lapTimes', (req, res) => {
  res.json(database.lapTimes || []);
});

// Route pour obtenir un temps au tour par ID
app.get('/lapTimes/:id', (req, res) => {
  const driverId = parseInt(req.params.id);
  const lapTime = (database.lapTimes || []).find(lapTime => lapTime.id === driverId);

  if (lapTime) {
    res.json(lapTime);
  } else {
    res.status(404).json({error: 'LapTime not found'});
  }
});

// Route pour ajouter un nouveau un temps au tour
app.post('/lapTimes', (req, res) => {
  const newLapTime = req.body;
  (database.lapTimes || []).push(newLapTime);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.status(201).json(newLapTime);
});

// Route pour mettre à jour un temps au tour par ID
app.put('/lapTimes/:id', (req, res) => {
  const lapTimeId = parseInt(req.params.id);
  const updatedLapTime = req.body;

  database.lapTimes = (database.lapTimes || []).map(lapTime => {
    if (lapTime.id === lapTimeId) {
      return {...lapTime, ...updatedLapTime};
    }
    return lapTime;
  });

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'LapTime updated successfully'});
});

// Route pour supprimer un temps au tour par ID
app.delete('/lapTimes/:id', (req, res) => {
  const lapTimeId = parseInt(req.params.id);
  database.lapTimes = (database.lapTimes || []).filter(lapTime => lapTime.id !== lapTimeId);

  // Enregistrez les modifications dans le fichier JSON
  saveDataToFile('database.json', database);

  res.json({message: 'LapTime deleted successfully'});
});

// Route pour obtenir les temps au tour d'un pilote
app.get('/lapTimes/:id_pilote/drivers', (req, res) => {
  const driverId = parseInt(req.params.id_pilote);
  const driver = (database.drivers || []).find(driver => driver.id === driverId);

  if (!driver) {
    return res.status(404).json({error: 'Driver not found'});
  }

  const lapTimes = (database.lapTimes || [])
  const lapTimesOfDriver = (database.lapTimes || []).filter(lapTime => lapTime.driverId === "/drivers/".concat(driverId));

  res.json(lapTimesOfDriver);
});

// Route pour obtenir les temps au tour sur un circuit
app.get('/lapTimes/:id_race/races', (req, res) => {
  const raceId = parseInt(req.params.id_race);
  const race = (database.races || []).find(race => race.id === raceId);

  if (!race) {
    return res.status(404).json({error: 'Race not found'});
  }

  const lapTimes = (database.lapTimes || [])
  const lapTimesOfRace = (database.lapTimes || []).filter(lapTime => lapTime.raceId === "/races/".concat(raceId));

  res.json(lapTimesOfRace);
});

// Route pour obtenir les temps au tour sur un circuit
app.get('/lapTimes/:id_pilote/drivers/:id_race/races', (req, res) => {
  const driverId = parseInt(req.params.id_pilote);
  const driver = (database.drivers || []).find(driver => driver.id === driverId);

  if (!driver) {
    return res.status(404).json({error: 'Driver not found'});
  }

  const raceId = parseInt(req.params.id_race);
  const race = (database.races || []).find(race => race.id === raceId);

  if (!race) {
    return res.status(404).json({error: 'Race not found'});
  }

  const lapTimes = (database.lapTimes || [])
  const lapTimesOnCircuitOfDriver = (database.lapTimes || []).filter(lapTime => lapTime.raceId === "/races/".concat(raceId) && lapTime.driverId === "/drivers/".concat(driverId));

  res.json(lapTimesOnCircuitOfDriver);

});

// Fonction utilitaire pour enregistrer des données dans un fichier JSON
function saveDataToFile(filename, data) {
  try {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing to ${filename}:`, err.message);
  }
}

swagger(app)

app.listen(port, function () {
  console.log('Your server is listening on port %d (http://localhost:%d)', port, port);
  console.log('Swagger-ui is available on http://localhost:%d/api-docs', port);
});
