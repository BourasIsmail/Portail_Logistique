-- ============================================================================================
-- =               IMPORTATION DES DONNÉES INITIALES (ORDRE CORRIGÉ)
-- ============================================================================================

-- ÉTAPE 1 : Insérer les 'parents' d'abord. On insère quelques régions.
INSERT INTO regions (id, code, nom_fr, nom_ar) VALUES
(1, '01', 'Tanger-Tétouan-Al Hoceïma', 'طنجة-تطوان-الحسيمة'),
(2, '02', 'L''Oriental', 'الشرق'),
(3, '03', 'Fès-Meknès', 'فاس-مكناس'),
(4, '04', 'Rabat-Salé-Kénitra', 'الرباط-سلا-القنيطرة');


-- ÉTAPE 2 : Insérer les 'enfants' des régions. On insère quelques centres de rattachement.
-- On s'assure que les 'region_id' (1, 2, 3...) existent bien dans la table 'regions'.
INSERT INTO centres_rattachement (id, nom, ville, region_id) VALUES
-- (1, 'SIEGE CENTRAL', 'Rabat', 4),
-- (2, 'DELEGATION MOHAMMADIA', 'Mohammedia', 4),
-- (3, 'DELEGATION EL KALAA', 'El Kelaa', 2),
-- (4, 'DELEGATION NOUACER', 'Nouaceur', 4),
-- (5, 'DELEGATION LAAYOUNE', 'Laâyoune', 1),
-- (6, 'DELEGATION TIZNIT', 'Tiznit', 1),
-- (7, 'DELEGATION BOULMANE', 'Boulemane', 3),
-- (8, 'DELEGATION SEBAA HAY', 'Sidi Kacem', 4),
-- (9, 'DELEGATION SIDI KACEM', 'Sidi Kacem', 4),
-- (10, 'DELEGATION SIDI IFNI', 'Sidi Ifni', 1),
-- (11, 'DELEGATION AIN CHOCK', 'Casablanca', 4),
-- (12, 'DELEGATION BERKANE', 'Berkane', 2),
-- (13, 'DELEGATION ESMARA', 'Es-Semara', 1),
-- (14, 'DELEGATION KHENIFRA', 'Khénifra', 3),
-- (15, 'DELEGATION TAN TAN', 'Tan-Tan', 1),
-- (16, 'DELEGATION MY RACHID', 'Casablanca', 4),
-- (17, 'DELEGATION JERADA', 'Jerada', 2),
-- (18, 'DELEGATION KENITRA', 'Kénitra', 4),
-- (19, 'DELEGATION CHICHAOUA', 'Chichaoua', 2),
-- (20, 'DELEGATION TAOURIRT', 'Taourirt', 2),
-- (21, 'DELEGATION AGADIR', 'Agadir', 1);




-- ÉTAPE 3 : Insérer les chauffeurs. Pour l'instant, on en met quelques-uns d'exemple.
INSERT INTO chauffeurs (id, nom, prenom, age, etat, type_permis, stable, centre_rattachement_id) VALUES
(5, 'lezregue', 'aya', 21, 'DISPONIBLE', 'B', false, 10);


-- ÉTAPE 4 : Maintenant, on peut insérer les véhicules !
-- Les ID pour 'centre_rattachement_id' et 'chauffeur_attitre_id' existent.
INSERT INTO vehicules (immatriculation, marque, modele, genre_vehicule, type_carburant, puissance_fiscale, date_mise_en_circulation, statut, etat_description, observations, a_fait_accident, kilometrage, centre_rattachement_id, chauffeur_attitre_id) VALUES
-- ('M0135306', 'CITROEN', 'BERLINGO', 'Utilitaire -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 2, NULL), -- MOHAMMADIA
-- ('M0135307', 'CITROEN', 'BERLINGO', 'Utilitaire -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 1, NULL), -- AL HAOUZ (Pas dans la liste, on met SIEGE CENTRAL)
-- ('M0135308', 'CITROEN', 'BERLINGO', 'Utilitaire -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer', false, 0, 3, NULL), -- EL KALAA
-- ('M0135309', 'CITROEN', 'BERLINGO', 'Utilitaire -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 4, NULL), -- NOUACER
-- ('M0135312', 'CITROEN', 'BERLINGO', 'Utilitaire -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 5, NULL), -- LAAYOUNE
-- ('M0135313', 'CITROEN', 'BERLINGO', 'Utilitaire -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 6, NULL), -- TIZNIT
-- ('M0167441', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-05-21', 'EN_SERVICE', NULL, NULL, false, 150000, 1, 1); -- Attribué au SIEGE CENTRAL et au chauffeur Alami Said
('M0167441', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-05-21', 'EN_SERVICE', NULL, NULL, false, 150000, 1, 1);




INSERT INTO missions (id, motif, destination, date_debut, date_fin, statut, kilometrage_depart, kilometrage_fin, vehicule_id, chauffeur_id) VALUES
-- (1, 'Visite administrative à la préfecture', 'Préfecture de Rabat', '2025-07-20 09:00:00', '2025-07-20 12:00:00', 'PLANIFIEE', 150000, NULL,267,1),
(2, 'Livraison de matériel au centre de Témara', 'Témara', '2025-07-21 14:00:00', '2025-07-21 17:00:00', 'PLANIFIEE', 150000, NULL,272,4);


INSERT INTO moyens_paiement (id, numero, fournisseur, statut) VALUES
(1, 'CC-AFRIQUIA-001', 'Afriquia', 'ACTIF'),
(2, 'BJ-ADM-MAIN', 'Autoroutes du Maroc', 'ACTIF'),
(3, 'VIG-REP-2025-01', 'Garage Central', 'ACTIF'),
(4, 'CC-TOTAL-002', 'TotalEnergies', 'INACTIF');


-- Insertion d'une Carte Carburant
INSERT INTO cartes_carburant (id, type, plafond_ou_valeur) VALUES
(1, 'CARTE_PLAFONNEE', 2000.00),
(4, 'CARNET_BONS', 5000.00);


-- Insertion d'un Badge Jawaz
INSERT INTO badges_jawaz (id, solde) VALUES
(2, 1500.00);

-- Insertion d'une Vignette (Bon de Paiement)
INSERT INTO vignettes (id, montant_disponible, type_utilisation) VALUES
(3, 10000.00, 'Réparations et Maintenance');


INSERT INTO depenses (id, date, montant, justificatif_url, vehicule_id, moyen_paiement_id) VALUES
(1, '2025-07-15', 550.00, 'http://example.com/justificatifs/plein_01.pdf', 267, 1),
(2, '2025-07-18', 3000.00, 'http://example.com/justificatifs/reparation_01.pdf', 267, 3),
(3, '2025-07-22', 500.00, 'http://example.com/justificatifs/recharge_jawaz_01.pdf', 267, 2);


INSERT INTO pleins_carburant (id, litres, kilometrage) VALUES
(1, 45.5, 150000);

INSERT INTO maintenances (id, type_intervention, nom_garage, description) VALUES
(2, 'Changement des plaquettes de frein', 'Garage Confiance', 'Remplacement des plaquettes avant suite à une usure normale.');

INSERT INTO recharges_jawaz (id) VALUES
(3);




DELETE FROM missions;
DELETE FROM maintenances;
DELETE FROM pleins_carburant;
DELETE FROM recharges_jawaz;
DELETE FROM depenses;
DELETE FROM vehicules;
DELETE FROM chauffeurs;
DELETE FROM gestionnaires_parc;
DELETE FROM admins_parc;
 UPDATE users SET centre_rattachement_id = NULL;

 DELETE FROM centres_rattachement;
 DELETE FROM regions;

 INSERT INTO regions (id, code, nom_fr, nom_ar) VALUES
(1, 'MA-01', 'Tanger-Tétouan-Al Hoceïma', 'طنجة-تطوان-الحسيمة'),
(2, 'MA-02', 'L''Oriental', 'الشرق'),
(3, 'MA-03', 'Fès-Meknès', 'فاس-مكناس'),
(4, 'MA-04', 'Rabat-Salé-Kénitra', 'الرباط-سلا-القنيطرة'),
(5, 'MA-05', 'Béni Mellal-Khénifra', 'بني ملال-خنيفرة'),
(6, 'MA-06', 'Casablanca-Settat', 'الدار البيضاء-سطات'),
(7, 'MA-07', 'Marrakech-Safi', 'مراكش-آسفي'),
(8, 'MA-08', 'Drâa-Tafilalet', 'درعة-تافيلالت'),
(9, 'MA-09', 'Souss-Massa', 'سوس-ماسة'),
(10, 'MA-10', 'Guelmim-Oued Noun', 'كلميم-واد نون'),
(11, 'MA-11', 'Laâyoune-Sakia El Hamra', 'العيون-الساقية الحمراء'),
(12, 'MA-12', 'Dakhla-Oued Ed-Dahab', 'الداخلة-وادي الذهب');

INSERT INTO centres_rattachement (id, nom, ville, region_id) VALUES
(1, 'SIEGE CENTRAL', 'Rabat', 4),
(2, 'MOHAMMADIA', 'Mohammedia', 6),
(3, 'AL HAOUZ', 'Al Haouz', 7),
(4, 'EL KALAA', 'El Kelaa des Sraghna', 7),
(5, 'NOUACER', 'Nouaceur', 6),
(6, 'LAAYOUNE', 'Laâyoune', 11),
(7, 'TIZNIT', 'Tiznit', 9),
(8, 'BOULMANE', 'Boulemane', 3),
(9, 'AIN SEBAA HAY', 'Casablanca', 6),
(10, 'SIDI KACEM', 'Sidi Kacem', 4),
(11, 'SIDI IFNI', 'Sidi Ifni', 10),
(12, 'AIN CHOCK', 'Casablanca', 6),
(13, 'BERKANE', 'Berkane', 2),
(14, 'ESMARA', 'Es-Semara', 11),
(15, 'KHENIFRA', 'Khénifra', 5),
(16, 'TAN TAN', 'Tan-Tan', 10),
(17, 'MY RACHID', 'Casablanca', 6),
(18, 'HAY EL HASSANI', 'Casablanca', 6),
(19, 'SAFI', 'Safi', 7),
(20, 'KHEMISSET', 'Khémisset', 4),
(21, 'ER HAMNA', 'Rehamna', 7),
(22, 'BENSLIMANE', 'Benslimane', 6),
(23, 'JERADA', 'Jerada', 2),
(24, 'KENITRA', 'Kénitra', 4),
(25, 'BENI MELLAL', 'Béni Mellal', 5),
(26, 'CHTOKA AIT BAHA', 'Chtouka Aït Baha', 9),
(27, 'MEDIOUNA', 'Médiouna', 6),
(28, 'YOUSSOUFIA', 'Youssoufia', 7),
(29, 'TETOUAN', 'Tétouan', 1),
(30, 'NADOR', 'Nador', 2),
(31, 'CHEFCHAOUEN', 'Chefchaouen', 1),
(32, 'BOUJDOUR', 'Boujdour', 11),
(33, 'GUERCIF', 'Guercif', 2),
(34, 'SEFROU', 'Sefrou', 3),
(35, 'ESSAOUIRA', 'Essaouira', 7),
(36, 'TEMARA', 'Témara', 4),
(37, 'SIDI BERNOUSSI', 'Casablanca', 6),
(38, 'FNIDEQ', 'Fnideq', 1),
(39, 'MOHAMADI', 'Mohammadi', 1),
(40, 'LARACHE', 'Larache', 1),
(41, 'DRIOUCH', 'Driouch', 2),
(42, 'ALHOCEIMA', 'Al Hoceïma', 1),
(43, 'CHICHAOUA', 'Chichaoua', 7),
(44, 'TAOURIRT', 'Taourirt', 2),
(45, 'SIDI BENNOUR', 'Sidi Bennour', 6),
(46, 'JERADA (Association)', 'Jerada', 2),
(47, 'Alhavat (Association al Ifrane)', 'Ifrane', 3),
(48, 'Bissat Al Akhdar)', 'Unknown', 1),
(49, 'FAHS ANJRA', 'Fahs-Anjra', 1),
(50, 'ELHAJEB', 'El Hajeb', 3),
(51, 'OUAZZANE', 'Ouezzane', 1),
(52, 'MIDELT', 'Midelt', 8),
(53, 'EL JADIDA', 'El Jadida', 6),
(54, 'BEN MSIK', 'Casablanca', 6),
(55, 'BERCHID', 'Berrechid', 6),
(56, 'ZAGORA', 'Zagora', 8),
(57, 'MY YAAKOUB', 'Moulay Yacoub', 3),
(58, 'OUJDA', 'Oujda', 2),
(59, 'Complexe Social Fkih Ben Salah', 'Fkih Ben Salah', 5),
(60, 'Complexe Social El Aroui Nador', 'Nador', 2),
(61, 'TAROUDANT', 'Taroudant', 9),
(62, 'KHOURIBGA', 'Khouribga', 5),
(63, 'Coordination Nationale Ouida', 'Unknown', 1),
(64, 'Delegation de E Nationale', 'Unknown', 1),
(65, 'AGADIR', 'Agadir', 9),
(66, 'AL FIDA MERS SULTAN', 'Casablanca', 6),
(67, 'SETTAT', 'Settat', 6),
(68, 'FES', 'Fès', 3),
(69, 'TARFAYA', 'Tarfaya', 11),
(70, 'MEKNES', 'Meknès', 3),
(71, 'ASSA ZAG', 'Assa-Zag', 10),
(72, 'UPE SALE', 'Salé', 4),
(73, 'UPE MARRACKECH', 'Marrakech', 7),
(74, 'UPE TANGER', 'Tanger', 1),
(75, 'UPE AGADIR', 'Agadir', 9),
(76, 'Tanger UGP-APM2', 'Tanger', 1),
(77, 'Delegation de E Nationale Jerada', 'Jerada', 2),
(78, 'TAZA', 'Taza', 3),
(79, 'CASA ANFA', 'Casablanca', 6),
(80, 'HAY EL HASSAN', 'Casablanca', 6),
(81, 'FIGUIG', 'Figuig', 2),
(82, 'IFRANE', 'Ifrane', 3),
(83, 'AZILAL', 'Azilal', 5),
(84, 'ERRACHIDIA', 'Errachidia', 8),
(85, 'OUARZAZATE', 'Ouarzazate', 8),
(86, 'TINGHIR', 'Tinghir', 8),
(87, 'TATA', 'Tata', 9),
(88, 'DAKHLA', 'Dakhla', 12),
(89, 'GUELMIM', 'Guelmim', 10),
(90, 'MARRAKECH', 'Marrakech', 7),
(91, 'BENI MELLAL', 'Béni Mellal', 5),
(92, 'RABAT', 'Rabat', 4),
(93, 'TANGER', 'Tanger', 1),
(94, 'TAOUNATE', 'Taounate', 3),
(95, 'ALHAOUZ', 'Al Haouz', 7),
(96, 'AI HOCEIMA', 'Al Hoceïma', 1),
(97, 'SALE', 'Salé', 4),
(98, 'AOUSSRED', 'Aousserd', 12),
(99, 'INEZGANE AIT MELLOUI', 'Inezgane-Aït Melloul', 9),
(100, 'SIDI SLIMANE', 'Sidi Slimane', 4);


INSERT INTO vehicules (id, immatriculation, marque, modele, genre_vehicule, type_carburant, puissance_fiscale, date_mise_en_circulation, statut, etat_description, observations, a_fait_accident, kilometrage, centre_rattachement_id, chauffeur_attitre_id) VALUES
-- (1, 'M0135306', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 2, NULL),
-- (2, 'M0135307', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 3, NULL),
-- (3, 'M0135308', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 4, NULL),
-- (4, 'M0135309', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 5, NULL),
-- (5, 'M0135312', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', NULL, NULL, false, 0, 6, NULL),
-- (6, 'M0135313', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 7, NULL),
-- (7, 'M0135339', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2002-04-11', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 8, NULL),
-- (8, 'M0136224', 'MITSUBISHI', NULL, 'Utilitaitre -3T500', 'DIESEL', 10, '2001-12-20', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer en 2025', false, 0, 9, NULL),
-- (9, 'M0140999', 'KIA', NULL, 'Utilitaitre -3T500', 'DIESEL', 12, '2002-08-30', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer en 2026', false, 0, 1, NULL),
-- (10, 'M0141021', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 10, NULL),
-- (11, 'M0141022', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 11, NULL),
-- (12, 'M0141023', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 12, NULL),
-- (13, 'M0141024', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 13, NULL),
-- (14, 'M0141027', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 14, NULL),
-- (15, 'M0141029', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 15, NULL),
-- (16, 'M0141030', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 16, NULL),
-- (17, 'M0141031', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer en 2025', false, 0, 17, NULL),
-- (18, 'M0141032', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 18, NULL),
-- (19, 'M0141033', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 19, NULL),
-- (20, 'M0141034', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 20, NULL),
-- (21, 'M0141036', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 21, NULL),
-- (22, 'M0141037', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2003-10-08', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 22, NULL),
-- (23, 'M0150589', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2005-06-14', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 23, NULL),
-- (24, 'M0150590', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2005-06-14', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 24, NULL),
-- (25, 'M0150591', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2005-06-14', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 25, NULL),
-- (26, 'M0150595', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2005-06-14', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 26, NULL),
-- (27, 'M0150597', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2005-06-14', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 27, NULL),
-- (28, 'M0150598', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2005-10-14', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 28, NULL),
-- (29, 'M0156941', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2007-03-07', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 29, NULL),
-- (30, 'M0156942', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2007-03-07', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 30, NULL),
-- (31, 'M0156943', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2007-03-07', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 31, NULL),
-- (32, 'M0156944', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2007-03-07', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 32, NULL),
-- (33, 'M0156945', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2007-03-07', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 33, NULL),
-- (34, 'M0156946', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2007-03-07', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 34, NULL),
-- (35, 'M0156947', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 7, '2007-03-07', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 35, NULL),
-- (36, 'M0160599', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-01-14', 'HORS_SERVICE', 'a reformer en 2025', NULL, false, 0, 36, NULL),
-- (37, 'M0160600', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-01-14', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 37, NULL),
-- (38, 'M0160602', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-01-14', 'HORS_SERVICE', 'Etat très dégradé', NULL, false, 0, 38, NULL),
-- (39, 'M0160603', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-01-14', 'HORS_SERVICE', 'Etat très dégradé', NULL, false, 0, 1, NULL),
-- (40, 'M0160604', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-01-14', 'HORS_SERVICE', 'a reformer en 2025', NULL, false, 0, 9, NULL),
-- -- SUITE DE L'INSERTION DES VÉHICULES
-- (41,'M0160605', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-01-14', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 39, NULL),
-- (42,'M0160606', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-01-14', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 40, NULL),
-- (43,'M0160607', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-01-14', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 41, NULL),
-- (44,'M0160964', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2008-03-06', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 42, NULL),
-- (45,'M0160966', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2008-03-06', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 43, NULL),
-- (46,'M0160967', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2008-03-06', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 44, NULL),
-- (47,'M0160968', 'PEUGEOT', 'PARTNER', 'Utilitaitre -3T500', 'DIESEL', 7, '2008-03-06', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 45, NULL),
-- (48,'M0161517', 'RENAULT', NULL, 'Utilitaitre -3T500', 'DIESEL', 8, '1988-07-20', 'HORS_SERVICE', NULL, NULL, false, 0, 46, NULL),
-- (49,'M0165593', 'IVECO', NULL, 'Utilitaitre +3T500', 'DIESEL', 10, '1994-06-01', 'HORS_SERVICE', NULL, NULL, false, 0, 47, NULL),
-- (50,'M0167440', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-05-21', 'EN_SERVICE', NULL, NULL, false, 0, 49, NULL),
-- (51,'M0167441', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-05-21', 'EN_SERVICE', 'a reformer en 2025', NULL, false, 0, 1, NULL),
-- (52,'M0167442', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-05-21', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 50, NULL),
-- (53,'M0167443', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-05-21', 'HORS_SERVICE', 'Etat très dégradé', 'A réformer au cas ou la délégation a bénéficié d''un nouveau véhicule de service', false, 0, 51, NULL),
-- (54,'M0167444', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-05-21', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 1, NULL),
-- (55,'M0167686', 'PEUGEOT', NULL, 'Utilitaitre -3T500', 'DIESEL', 8, '2000-05-05', 'HORS_SERVICE', NULL, NULL, false, 0, 1, NULL),
-- (56,'M0167687', 'CITROEN', NULL, 'Utilitaitre -3T500', 'DIESEL', 7, '2009-05-22', 'HORS_SERVICE', NULL, NULL, false, 0, 52, NULL),
-- (57,'M0169737', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-10-15', 'EN_SERVICE', NULL, NULL, false, 0, 53, NULL),
-- (58,'M0169738', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-10-15', 'EN_SERVICE', NULL, NULL, false, 0, 54, NULL),
-- (59,'M0169739', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-10-15', 'EN_SERVICE', NULL, NULL, false, 0, 55, NULL),
-- (60,'M0169740', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-10-15', 'EN_SERVICE', NULL, NULL, false, 0, 56, NULL),
-- (61,'M0169741', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-10-15', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
-- (62,'M0169742', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-10-15', 'EN_SERVICE', 'a reformer en 2025', NULL, false, 0, 1, NULL),
-- (63,'M0169743', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-10-15', 'EN_SERVICE', NULL, NULL, false, 0, 35, NULL),
-- (64,'M0169744', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2009-10-15', 'EN_SERVICE', NULL, NULL, false, 0, 57, NULL),
-- (65,'M0172704', 'RENAULT', 'MASTER', 'Utilitaitre -3T500', 'DIESEL', 10, '2001-11-14', 'HORS_SERVICE', NULL, NULL, false, 0, 58, NULL),
-- (66,'M0175703', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2010-09-29', 'EN_SERVICE', NULL, NULL, false, 0, 59, NULL),
-- (67,'M0175704', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2010-09-29', 'EN_SERVICE', NULL, NULL, false, 0, 60, NULL),
-- (68,'M178574', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-09-25', 'HORS_SERVICE', 'a reformer en 2025', NULL, false, 0, 61, NULL),
-- (69,'M178575', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2008-09-25', 'HORS_SERVICE', 'a reformer en 2025', NULL, false, 0, 62, NULL),
-- (70,'M178576', 'TOYOTA', NULL, 'Utilitaitre -3T500', 'DIESEL', 12, '2011-06-13', 'EN_SERVICE', NULL, NULL, false, 0, 59, NULL),
-- (71,'M178577', 'TOYOTA', NULL, 'Utilitaitre -3T500', 'DIESEL', 12, '2011-06-13', 'EN_SERVICE', NULL, NULL, false, 0, 60, NULL),
-- (72,'M179817', 'HYUNDAI', NULL, 'Utilitaitre +3T500', 'DIESEL', 13, '2011-06-05', 'HORS_SERVICE', NULL, NULL, false, 0, 63, NULL),
-- (73,'M181760', 'TOYOTA', NULL, 'Utilitaitre -3T500', 'DIESEL', 12, '2009-09-14', 'EN_SERVICE', NULL, NULL, false, 0, 64, NULL),
-- (74,'M188417', 'FIAT', 'DOBLO', 'Utilitaitre -3T500', 'DIESEL', 5, '2013-10-15', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
-- (75,'M188418', 'FIAT', 'DOBLO', 'Utilitaitre -3T500', 'DIESEL', 5, '2013-10-15', 'EN_SERVICE', NULL, NULL, false, 0, 29, NULL),
-- (76,'M194373', 'FIAT', 'DOBLO', 'Utilitaitre -3T500', 'DIESEL', 5, '2014-11-24', 'EN_SERVICE', NULL, NULL, false, 0, 29, NULL),
-- (77,'M194374', 'FIAT', 'DOBLO', 'Utilitaitre -3T500', 'DIESEL', 5, '2014-11-24', 'EN_SERVICE', NULL, NULL, false, 0, 78, NULL),
-- (78,'M194375', 'FIAT', 'DOBLO', 'Utilitaitre -3T500', 'DIESEL', 5, '2014-11-24', 'EN_SERVICE', NULL, NULL, false, 0, 20, NULL),
-- (79,'M194376', 'FIAT', 'DOBLO', 'Utilitaitre -3T500', 'DIESEL', 5, '2014-11-24', 'EN_SERVICE', NULL, NULL, false, 0, 65, NULL),
-- (80,'M194377', 'FIAT', 'DOBLO', 'Utilitaitre -3T500', 'DIESEL', 5, '2014-11-24', 'EN_SERVICE', NULL, NULL, false, 0, 66, NULL),
-- (81,'M194378', 'FIAT', 'DOBLO', 'Utilitaitre -3T500', 'DIESEL', 5, '2014-11-24', 'EN_SERVICE', NULL, NULL, false, 0, 67, NULL),
-- (82,'M197876', 'PEUGEOT', 'BIPPER', 'Conduite intérieure', 'DIESEL', 6, '2015-06-24', 'EN_SERVICE', NULL, NULL, false, 0, 68, NULL),
-- (83,'M197877', 'PEUGEOT', 'BIPPER', 'Conduite intérieure', 'DIESEL', 6, '2015-06-24', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
-- (84,'M197878', 'PEUGEOT', 'BIPPER', 'Conduite intérieure', 'DIESEL', 6, '2015-06-24', 'EN_SERVICE', NULL, NULL, false, 0, 11, NULL),
-- (85,'M197879', 'PEUGEOT', 'BIPPER', 'Conduite intérieure', 'DIESEL', 6, '2015-06-24', 'EN_SERVICE', NULL, NULL, false, 0, 69, NULL),
-- (86,'M197880', 'PEUGEOT', 'BIPPER', 'Conduite intérieure', 'DIESEL', 6, '2015-06-24', 'EN_SERVICE', NULL, NULL, false, 0, 70, NULL),
-- (87,'M206394', 'JEEP', 'CHEROKEE', 'Utilitaitre -3T500', 'DIESEL', 11, '2004-04-05', 'HORS_SERVICE', NULL, NULL, false, 0, 71, NULL),
-- (88,'14033B01', 'MAZDA', NULL, 'Utilitaitre -3T500', 'DIESEL', 12, '2004-05-27', 'HORS_SERVICE', NULL, NULL, false, 0, 1, NULL),
-- (89,'14034B01', 'MAZDA', NULL, 'Utilitaitre -3T500', 'DIESEL', 12, '2004-05-27', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 6, NULL),
-- (90,'2713A43', 'TATA', NULL, 'Utilitaitre -3T500', 'DIESEL', 8, '2005-10-28', 'HORS_SERVICE', NULL, NULL, false, 0, 31, NULL),
-- (91,'62674H01', 'TALISMAN', NULL, 'Conduite intérieure', 'DIESEL', 6, '2017-07-07', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 1, NULL),
-- (92,'M200377', 'IVECO', 'CA50A', 'Utilitaitre +3T500', 'DIESEL', 12, '2016-02-18', 'EN_SERVICE', NULL, NULL, false, 0, 16, NULL),
-- (93,'M207054', 'DACIA', 'DOKER', 'Utilitaitre -3T500', 'DIESEL', 6, '2016-12-15', 'EN_SERVICE', NULL, NULL, false, 0, 72, NULL),
-- (94,'M207056', 'DACIA', 'DOKER', 'Utilitaitre -3T500', 'DIESEL', 6, '2016-12-15', 'EN_SERVICE', NULL, NULL, false, 0, 73, NULL),
-- (95,'M207057', 'DACIA', 'DOKER', 'Utilitaitre -3T500', 'DIESEL', 6, '2016-12-15', 'EN_SERVICE', NULL, NULL, false, 0, 74, NULL),
-- (96,'M207058', 'DACIA', 'DOKER', 'Utilitaitre -3T500', 'DIESEL', 6, '2016-12-15', 'EN_SERVICE', NULL, NULL, false, 0, 75, NULL),
-- (97,'M207116', 'RENAULT', 'MEGANE', 'Conduite intérieure', 'DIESEL', 6, '2011-12-15', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
-- (98,'M207402', 'NISSAN', 'QUASHQUAY', 'Conduite intérieure', 'DIESEL', 6, '2016-12-28', 'EN_SERVICE', NULL, NULL, false, 0, 76, NULL),
-- (99,'M207511', 'MERCEDECE', 'CITAN', 'Utilitaitre -3T500', 'DIESEL', 6, '2016-12-28', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
-- (100,'M207512', 'MERCEDECE', 'CITAN', 'Utilitaitre -3T500', 'DIESEL', 6, '2016-12-28', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 77, NULL),
(101,'M215907', 'CITROEN', NULL, 'Utilitaitre -3T500', 'DIESEL', 9, '2018-04-23', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
(102,'M221309', 'FORD', NULL, 'Utilitaitre -3T500', 'DIESEL', 9, '2019-04-24', 'EN_SERVICE', NULL, NULL, false, 0, 71, NULL),
(103,'M221310', 'FORD', NULL, 'Utilitaitre -3T500', 'DIESEL', 9, '2019-04-24', 'EN_SERVICE', NULL, NULL, false, 0, 71, NULL),
(104,'M220901', 'FORD', NULL, 'Utilitaitre -3T500', 'DIESEL', 6, '2019-02-22', 'EN_SERVICE', NULL, NULL, false, 0, 10, NULL),
(105,'M223157', 'MITSUBISHI', NULL, 'Utilitaitre -3T500', 'DIESEL', 10, '2019-08-28', 'EN_SERVICE', NULL, NULL, false, 0, 78, NULL),
(106,'M227863', 'DACIA', 'DOKKER', 'Utilitaitre -3T500', 'DIESEL', 6, '2020-02-10', 'EN_SERVICE', NULL, NULL, false, 0, 27, NULL),
(107,'M228425', 'RENAULT', 'MASTER', 'Utilitaitre -3T500', 'DIESEL', 9, '2020-06-09', 'EN_SERVICE', NULL, NULL, false, 0, 27, NULL),
(108,'M228426', 'RENAULT', 'MASTER', 'Utilitaitre -3T500', 'DIESEL', 9, '2020-06-09', 'HORS_SERVICE', 'En cours de réforme', NULL, false, 0, 27, NULL),
(109,'M232978', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 6, '2021-01-01', 'EN_SERVICE', NULL, NULL, false, 0, 79, NULL),
(110,'M232979', 'CITROEN', 'BERLINGO', 'Utilitaitre -3T500', 'DIESEL', 6, '2021-01-01', 'EN_SERVICE', NULL, NULL, false, 0, 79, NULL),
(111,'M240949', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2022-07-15', 'EN_SERVICE', NULL, NULL, false, 0, 71, NULL),
(112,'M240950', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2022-07-15', 'EN_SERVICE', NULL, NULL, false, 0, 80, NULL),
(113,'M241463', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 31, NULL),
(114,'M241464', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 81, NULL),
(116,115,'M241465', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 30, NULL),
(117,'M241466', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 41, NULL),
(118,'M241467', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 44, NULL),
(119,'M241468', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 82, NULL),
(120,'M241469', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 8, NULL),
(121,'M241470', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 17, NULL),
(122,'M241471', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 15, NULL),
(123,'M241472', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 83, NULL),
(124,'M241473', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
(125,'M241474', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 52, NULL),
(126,'M241475', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 85, NULL),
(127,'M241476', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 86, NULL),
(128,'M241477', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 7, NULL),
(129,'M241478', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 61, NULL),
(130,'M241479', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 87, NULL),
(131,'M241480', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 16, NULL),
(132,'M241481', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 32, NULL),
(133,'M241482', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2022-08-18', 'EN_SERVICE', NULL, NULL, false, 0, 88, NULL),
(134,'M241638', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-09-09', 'EN_SERVICE', NULL, NULL, false, 0, 6, NULL),
(135,'M241639', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-09-09', 'EN_SERVICE', NULL, NULL, false, 0, 89, NULL),
(136,'M241640', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-09-09', 'EN_SERVICE', NULL, NULL, false, 0, 90, NULL),
(137,'M241641', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-09-09', 'EN_SERVICE', NULL, NULL, false, 0, 25, NULL),
(138,'M241642', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-09-09', 'EN_SERVICE', NULL, NULL, false, 0, 92, NULL),
(139,'M241643', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-09-09', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
(140,'M242216', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-09-09', 'EN_SERVICE', NULL, NULL, false, 0, 84, NULL),
(141,'M241644', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-10-11', 'EN_SERVICE', NULL, NULL, false, 0, 58, NULL),
(142,'M242375', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-10-11', 'EN_SERVICE', NULL, NULL, false, 0, 93, NULL),
(143,'M242213', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-10-11', 'EN_SERVICE', NULL, NULL, false, 0, 68, NULL),
(144,'M242214', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-10-21', 'EN_SERVICE', NULL, NULL, false, 0, 65, NULL),
(145,'M242215', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-10-21', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
(146,'M242376', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-10-21', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
(147,'M242377', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-10-21', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
(148,'M242378', 'DACIA', 'DUSTER', 'VEHICULE TOURISME', 'DIESEL', 6, '2022-10-21', 'EN_SERVICE', NULL, NULL, false, 0, 88, NULL),
(149,'M246569', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 6, NULL),
(150,'M246570', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 89, NULL),
(151,'M246571', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 65, NULL),
(152,'M246572', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 90, NULL),
(153,'M246573', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 84, NULL),
(154,'M246574', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 25, NULL),
(155,'M246575', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 79, NULL),
(156,'M246576', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 92, NULL),
(157,'M246577', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 68, NULL),
(158,'M246578', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 58, NULL),
(159,'M246579', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 93, NULL),
(160,'M246580', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 53, NULL),
(161,'M246581', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 94, NULL),
(162,'M246582', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 33, NULL),
(163,'M246583', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 95, NULL),
(164,'M246584', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
(165,'M246585', 'RENAULT', NULL, 'Fourgonette vitree avec siège', 'DIESEL', 6, '2023-06-02', 'EN_SERVICE', NULL, NULL, false, 0, 96, NULL),
(166,'M248033', 'MERCEDES', NULL, 'Conduite intérieure', 'DIESEL', 8, '2023-08-07', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
(167,'M248820', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 13, NULL),
(168,'M248821', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 10, NULL),
(169,'M248822', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 97, NULL),
(170,'M248823', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 22, NULL),
(171,'M248824', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 43, NULL),
(172,'M248825', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 27, NULL),
(173,'M248826', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 11, NULL),
(174,'M248827', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 29, NULL),
(175,'M248828', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 14, NULL),
(176,'M248829', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 57, NULL),
(177,'M248830', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 98, NULL),
(178,'M248831', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 2, NULL),
(179,'M248832', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 99, NULL),
(180,'M248833', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
(181m'M248834', 'RENAULT', 'MEGANE', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M248835', 'RENAULT', 'MEGANE', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M248836', 'RENAULT', 'MEGANE', 'Conduite intérieure', 'DIESEL', 6, '2023-09-18', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M250995', 'RENAULT', 'MASTER L3H2', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 65, NULL),
('M252798', 'RENAULT', 'MASTER L3H3', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 88, NULL),
('M252799', 'RENAULT', 'MASTER L3H4', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 6, NULL),
('M252800', 'RENAULT', 'MASTER L3H5', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 89, NULL),
('M252801', 'RENAULT', 'MASTER L3H6', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 85, NULL),
('M252802', 'RENAULT', 'MASTER L3H7', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 90, NULL),
('M252803', 'RENAULT', 'MASTER L3H8', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 68, NULL),
('M253386', 'RENAULT', 'MASTER L3H9', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 92, NULL),
('M253387', 'RENAULT', 'MASTER L3H10', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 2, NULL),
('M253388', 'RENAULT', 'MASTER L3H11', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 53, NULL),
('M253389', 'RENAULT', 'MASTER L3H12', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 29, NULL),
('M253390', 'RENAULT', 'MASTER L3H13', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 42, NULL),
('M253391', 'RENAULT', 'MASTER L3H14', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 19, NULL),
('M253392', 'RENAULT', 'MASTER L3H15', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 70, NULL),
('M253393', 'RENAULT', 'MASTER L3H16', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 97, NULL),
('M253394', 'RENAULT', 'MASTER L3H17', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 24, NULL),
('M253395', 'RENAULT', 'MASTER L3H18', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 62, NULL),
('M253396', 'RENAULT', 'MASTER L3H19', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 27, NULL),
('M253397', 'RENAULT', 'MASTER L3H20', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 5, NULL),
('M253398', 'RENAULT', 'MASTER L3H21', 'Utilitaitre -3T500', 'DIESEL', 9, '2024-04-18', 'EN_SERVICE', NULL, NULL, false, 0, 55, NULL),
('M255583', 'RENAULT', 'MEGANE', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255557', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 5, NULL),
('M255558', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 28, NULL),
('M255559', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 37, NULL),
('M255560', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 36, NULL),
('M255561', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 55, NULL),
('M255562', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 35, NULL),
('M255563', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 62, NULL),
('M255564', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 20, NULL),
('M255565', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 70, NULL),
('M255566', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 12, NULL),
('M255567', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 53, NULL),
('M255568', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 24, NULL),
('M255569', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255570', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255571', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255572', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255573', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255574', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255575', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255576', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255577', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255578', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 100, NULL),
('M255579', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 100, NULL),
('M255580', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255581', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL),
('M255582', 'DACIA', 'LOGAN', 'Conduite intérieure', 'DIESEL', 6, '2024-11-12', 'EN_SERVICE', NULL, NULL, false, 0, 1, NULL);