/**
 * @swagger
 * components:
 *   schemas:
 *     Routes:
 *       type: object
 *       required:
 *         - route
 *       properties:
 *         route:
 *           type: string
 *           description: Name of every path.
 *       example:
 *        route: /drivers/
 *
 *     Drivers:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - nationality
 *         - teamId
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the driver.
 *         name:
 *           type: string
 *           description: The name of the driver.
 *         nationality:
 *           type: string
 *           description: The nationality of the driver.
 *         teamId:
 *           type: string
 *           description: The identifier of the team to which the driver belongs.
 *       example:
 *        id: 21
 *        name: Michael Schumacher
 *        nationality: Dutch
 *        teamId: /teams/3
 *
 *     Teams:
 *       type: object
 *       required:
 *         - id
 *         - foundation
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the team.
 *         name:
 *           type: string
 *           description: The name of the team.
 *         foundation:
 *           type: string
 *           format: date
 *           description: The date when the team was founded.
 *       example:
 *        id: 11
 *        name: Benetton
 *        foundation: 1986-01-01
 *
 *     Races:
 *       type: object
 *       required:
 *         - id
 *         - date
 *         - location
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the race.
 *         name:
 *           type: string
 *           description: The name of the race.
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the race.
 *         location:
 *           type: string
 *           description: The location of the race.
 *       example:
 *        id: 1
 *        name: Monaco Grand Prix
 *        date: 2023-05-28
 *        location: Monaco
 *
 *     Circuits:
 *       type: object
 *       required:
 *         - id
 *         - length
 *         - location
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the circuit.
 *         name:
 *           type: string
 *           description: The name of the circuit.
 *         location:
 *           type: string
 *           description: The location of the circuit.
 *         length:
 *           type: number
 *           description: The length of the circuit.
 *       example:
 *        id: 1
 *        name: Monaco Street Circuit
 *        location: Monte Carlo
 *        length: 3.337
 *
 *
 *     LapTimes:
 *       type: object
 *       required:
 *         - id
 *         - driverId
 *         - raceId
 *         - time
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the lap time.
 *         raceId:
 *           type: string
 *           description: The identifier of the race to which the lap time belongs.
 *         driverId:
 *           type: string
 *           description: The identifier of the driver for whom the lap time is recorded.
 *         time:
 *           type: number
 *           description: The lap time in seconds.
 *       example:
 *        id: 1
 *        raceId: /races/1
 *        driverId: /drivers/1
 *        time: 78.345
 *
 * paths:
 *   /:
 *     get:
 *       tags:
 *         - Routes
 *       summary: Obtenir les routes
 *       responses:
 *         '200':
 *           description: Succès
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Routes'
 *         '500':
 *           description: Erreur serveur
 *   /drivers:
 *     get:
 *       tags:
 *         - Drivers
 *       summary: Obtenir tous les pilotes
 *       responses:
 *         '200':
 *           description: Succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Drivers'
 *         '500':
 *           description: Erreur serveur
 *
 *     post:
 *       tags:
 *         - Drivers
 *       summary: Ajouter un nouveau pilote
 *       requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Drivers'
 *       responses:
 *         '201':
 *           description: Pilote ajouté avec succès
 *         '400':
 *           description: Requête invalide
 *
 *   /drivers/{id}/teams:
 *     get:
 *       tags:
 *         - Drivers
 *       summary: Obtenir le coéquipier d'un pilote
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du pilote
 *       responses:
 *         '200':
 *           description: Pilote trouvé avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Drivers'
 *         '404':
 *           description: Pilote non trouvé
 *         '500':
 *           description: Erreur serveur
 *
 *   /drivers/{id}:
 *     get:
 *       tags:
 *         - Drivers
 *       summary: Obtenir un pilote par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du pilote
 *       responses:
 *         '200':
 *           description: Pilote trouvé avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Drivers'
 *         '404':
 *           description: Pilote non trouvé
 *         '500':
 *           description: Erreur serveur
 *
 *     put:
 *       tags:
 *         - Drivers
 *       summary: Mettre à jour un pilote par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du pilote
 *       requestBody:
 *         description: Nouvelles informations du pilote
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Drivers'
 *       responses:
 *         '200':
 *           description: Pilote mis à jour avec succès
 *         '404':
 *           description: Pilote non trouvé
 *         '500':
 *           description: Erreur serveur
 *
 *     delete:
 *       tags:
 *         - Drivers
 *       summary: Supprimer un pilote par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du pilote
 *       responses:
 *         '200':
 *           description: Pilote supprimé avec succès
 *         '404':
 *           description: Pilote non trouvé
 *         '500':
 *           description: Erreur serveur
 *
 *   /teams:
 *     get:
 *       tags:
 *         - Teams
 *       summary: Obtenir toutes les équipes
 *       responses:
 *         '200':
 *           description: Succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Teams'
 *         '500':
 *           description: Erreur serveur
 *
 *     post:
 *       tags:
 *         - Teams
 *       summary: Ajouter une nouvelle équipe
 *       requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Teams'
 *       responses:
 *         '201':
 *           description: Équipe ajoutée avec succès
 *         '400':
 *           description: Requête invalide
 *
 *   /teams/{id}/drivers:
 *     get:
 *       tags:
 *         - Teams
 *       summary: Obtenir les pilotes d'une équipe
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID de l'équipe
 *       responses:
 *         '200':
 *           description: Équipe trouvée avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Drivers'
 *         '404':
 *           description: Équipe non trouvée
 *         '500':
 *           description: Erreur serveur
 *
 *   /teams/{id}:
 *     get:
 *       tags:
 *         - Teams
 *       summary: Obtenir une équipe par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID de l'équipe
 *       responses:
 *         '200':
 *           description: Équipe trouvée avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Teams'
 *         '404':
 *           description: Équipe non trouvée
 *         '500':
 *           description: Erreur serveur
 *
 *     put:
 *       tags:
 *         - Teams
 *       summary: Mettre à jour une équipe par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID de l'équipe
 *       requestBody:
 *         description: Nouvelles informations de l'équipe
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teams'
 *       responses:
 *         '200':
 *           description: Équipe mise à jour avec succès
 *         '404':
 *           description: Équipe non trouvée
 *         '500':
 *           description: Erreur serveur
 *
 *     delete:
 *       tags:
 *         - Teams
 *       summary: Supprimer une équipe par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID de l'équipe
 *       responses:
 *         '200':
 *           description: Équipe supprimée avec succès
 *         '404':
 *           description: Équipe non trouvée
 *         '500':
 *           description: Erreur serveur
 *
 *   /races:
 *     get:
 *       tags:
 *         - Races
 *       summary: Obtenir toutes les courses
 *       responses:
 *         '200':
 *           description: Succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Races'
 *         '500':
 *           description: Erreur serveur
 *
 *     post:
 *       tags:
 *         - Races
 *       summary: Ajouter une nouvelle course
 *       requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Races'
 *       responses:
 *         '201':
 *           description: Course ajoutée avec succès
 *         '400':
 *           description: Requête invalide
 *
 *   /races/{id}:
 *     get:
 *       tags:
 *         - Races
 *       summary: Obtenir une course par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID de la course
 *       responses:
 *         '200':
 *           description: Course trouvée avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Races'
 *         '404':
 *           description: Course non trouvée
 *         '500':
 *           description: Erreur serveur
 *     put:
 *       tags:
 *         - Races
 *       summary: Mettre à jour une course par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID de la course
 *       requestBody:
 *         description: Nouvelles informations de la course
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Races'
 *       responses:
 *         '200':
 *           description: Course mise à jour avec succès
 *         '404':
 *           description: Course non trouvée
 *         '500':
 *           description: Erreur serveur
 *     delete:
 *       tags:
 *         - Races
 *       summary: Supprimer une course par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID de la course
 *       responses:
 *         '200':
 *           description: Course supprimée avec succès
 *         '404':
 *           description: Course non trouvée
 *         '500':
 *           description: Erreur serveur
 *
 *   /circuits:
 *     get:
 *       tags:
 *         - Circuits
 *       summary: Obtenir tous les circuits
 *       responses:
 *         '200':
 *           description: Succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Circuits'
 *         '500':
 *           description: Erreur serveur
 *     post:
 *       tags:
 *         - Circuits
 *       summary: Ajouter un nouveau circuit
 *       requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Circuits'
 *       responses:
 *         '201':
 *           description: Circuit ajouté avec succès
 *         '400':
 *           description: Requête invalide
 *
 *   /circuits/{id}:
 *     get:
 *       tags:
 *         - Circuits
 *       summary: Obtenir un circuit par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du circuit
 *       responses:
 *         '200':
 *           description: Circuit trouvé avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Circuits'
 *         '404':
 *           description: Circuit non trouvé
 *         '500':
 *           description: Erreur serveur
 *     put:
 *       tags:
 *         - Circuits
 *       summary: Mettre à jour un circuit par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du circuit
 *       requestBody:
 *         description: Nouvelles informations du circuit
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Circuits'
 *       responses:
 *         '200':
 *           description: Circuit mis à jour avec succès
 *         '404':
 *           description: Circuit non trouvé
 *         '500':
 *           description: Erreur serveur
 *     delete:
 *       tags:
 *         - Circuits
 *       summary: Supprimer un circuit par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du circuit
 *       responses:
 *         '200':
 *           description: Circuit supprimé avec succès
 *         '404':
 *           description: Circuit non trouvé
 *         '500':
 *           description: Erreur serveur
 *
 *   /lapTimes:
 *     get:
 *       tags:
 *         - LapTimes
 *       summary: Obtenir tous les temps au tour
 *       responses:
 *         '200':
 *           description: Succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LapTimes'
 *         '500':
 *           description: Erreur serveur
 *     post:
 *       tags:
 *         - LapTimes
 *       summary: Ajouter un nouveau temps au tour
 *       requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LapTimes'
 *       responses:
 *         '201':
 *           description: Temps au tour ajouté avec succès
 *         '400':
 *           description: Requête invalide
 *
 *   /lapTimes/{id}:
 *     get:
 *       tags:
 *         - LapTimes
 *       summary: Obtenir un temps au tour par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du temps au tour
 *       responses:
 *         '200':
 *           description: Temps au tour trouvé avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LapTimes'
 *         '404':
 *           description: Temps au tour non trouvé
 *         '500':
 *           description: Erreur serveur
 *     put:
 *       tags:
 *         - LapTimes
 *       summary: Mettre à jour un temps au tour par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du temps au tour
 *       requestBody:
 *         description: Nouvelles informations du temps au tour
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LapTimes'
 *       responses:
 *         '200':
 *           description: Temps au tour mis à jour avec succès
 *         '404':
 *           description: Temps au tour non trouvé
 *         '500':
 *           description: Erreur serveur
 *     delete:
 *       tags:
 *         - LapTimes
 *
 *       summary: Supprimer un temps au tour par ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID du temps au tour
 *       responses:
 *         '200':
 *           description: Temps au tour supprimé avec succès
 *         '404':
 *           description: Temps au tour non trouvé
 *         '500':
 *           description: Erreur serveur
 *
 *   /lapTimes/{id_pilote}/drivers:
 *     get:
 *       tags:
 *         - LapTimes
 *       summary: Obtenir les temps au tour d'un pilote
 *       parameters:
 *         - in: path
 *           name: id_pilote
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID d'un pilote
 *       responses:
 *         '200':
 *           description: Temps au tour trouvés avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LapTimes'
 *         '500':
 *           description: Erreur serveur
 *
 *   /lapTimes/{id_race}/races:
 *     get:
 *       tags:
 *         - LapTimes
 *       summary: Obtenir les temps au tour sur un circuit
 *       parameters:
 *         - in: path
 *           name: id_race
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID d'un circuit
 *       responses:
 *         '200':
 *           description: Temps au tour trouvés avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LapTimes'
 *         '404':
 *           description: Circuit non trouvé
 *         '500':
 *           description: Erreur serveur
 *
 *   /lapTimes/{id_pilote}/drivers/{id_race}/races:
 *     get:
 *       tags:
 *         - LapTimes
 *       summary: Obtenir les temps au tour d'un pilote sur un circuit
 *       parameters:
 *         - in: path
 *           name: id_pilote
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID d'un pilote
 *         - in: path
 *           name: id_race
 *           required: true
 *           schema:
 *             type: integer
 *           description: ID d'un circuit
 *       responses:
 *         '200':
 *           description: Temps au tour trouvés avec succès
 *           content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LapTimes'
 *         '404':
 *           description: Pilote ou circuit non trouvé
 *         '500':
 *           description: Erreur serveur
 *
 */
