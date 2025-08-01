import axios from "axios";
import { getTokenFromCookie } from "@/utils/AuthProvider";

// --- CONFIGURATION DE BASE D'AXIOS ---
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
// --- INTERCEPTEUR POUR AJOUTER LE TOKEN ---
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// --- API pour les Véhicules ---
export const getAllVehicules = (page = 0, size = 10, query = '') => {
    return api.get('/admin/parcauto/vehicules', {
        params: {
            page,
            size,
            query,
            sort: 'marque,asc'
        }
    }); 
};

export const getVehiculeById = (id) => {
    return api.get(`/admin/parcauto/vehicules/${id}`);
};

export const createVehicule = (vehiculeData) => {
    return api.post('/admin/parcauto/vehicules', vehiculeData);
};

export const updateVehicule = (id, vehiculeData) => {
    return api.put(`/admin/parcauto/vehicules/${id}`, vehiculeData);
};

export const deleteVehicule = (id) => {
    return api.delete(`/admin/parcauto/vehicules/${id}`);
};


// --- API pour les Chauffeurs ---
export const getAllChauffeurs = () => {
    return api.get('/admin/parcauto/chauffeurs');
};

export const getChauffeurById = (id) =>{
    return api.get(`/admin/parcauto/chauffeurs/${id}`);
};

export const createChauffeur = (chauffeurData) => {
    return api.post('/admin/parcauto/chauffeurs', chauffeurData);
};

export const updateChauffeur = (id, chauffeurData) => {
    return api.put(`/admin/parcauto/chauffeurs/${id}`, chauffeurData);
};

export const deleteChauffeur = (id) => {
    return api.delete(`/admin/parcauto/chauffeurs/${id}`);
};

// ==========================================================
//                      API pour les Missions
// ==========================================================

export const getAllMissions = () => {
    return api.get('/admin/parcauto/missions');
};

export const getMissionById = (id) => {
    return api.get(`/admin/parcauto/missions/${id}`);
};

export const createMission = (missionData) => {
    return api.post('/admin/parcauto/missions', missionData);
};

export const terminerMission = (id, kilometrageFin) => {
    return api.put(`/admin/parcauto/missions/${id}/terminer`, { kilometrageFin });
};

export const updateMission = (id ,missionData) =>{
    return api.put(`/admin/parcauto/missions/${id}`, missionData);
};

export const deleteMission = (id) => {
    return api.delete(`/admin/parcauto/missions/${id}`);
};


// ==========================================================
//             API pour les Régions & Centres
// ==========================================================
export const getAllRegions = () => {
    return api.get('/admin/parcauto/regions');
};

export const getRegionById = (id) => {
    return api.get(`/admin/parcauto/regions/${id}`);
};

export const createRegion = (regionData) => {
    return api.post('/admin/parcauto/regions', regionData);
};

export const updateRegion = (id,regionData) => {
    return api.put(`/admin/parcauto/regions/${id}`, regionData);
};

export const getCentresByRegion= (regionId) => {
    return api.get(`/admin/parcauto/regions/${regionId}/centres`);
};

export const deleteRegion = (id) => {
    return api.delete(`/admin/parcauto/regions/${id}`);
};



export const getAllCentres = () => {
    return api.get('/admin/parcauto/centres');
};

export const getCentreById = (id) => {
    return api.get(`/admin/parcauto/centres/${id}`);
};

export const createCentre = (centreData) => {
    return api.post('/admin/parcauto/centres',centreData );
};

export const updateCentre = (id,centreData) => {
    return api.put(`/admin/parcauto/centres/${id}`, centreData);
};

export const deleteCentre = (id) => {
    return api.delete(`/admin/parcauto/centres/${id}`);
};


// ==========================================================
//             API pour les Dépenses & Moyens de Paiement
// ==========================================================

export const getAllDepenses = () => {
    return api.get('/admin/parcauto/depenses');
};

export const getDepenseById = (id) => {
    return api.get(`/admin/parcauto/depenses/${id}`);
};

export const createDepense = (depenseData) => {
    return api.post('/admin/parcauto/depenses', depenseData);
};

export const updateDepense = (id,depenseData) => {
    return api.put(`/admin/parcauto/depenses/${id}`, depenseData);
};

export const deleteDepense = (id) => {
    return api.delete(`/admin/parcauto/depenses/${id}`);
};



export const getAllMoyensPaiement = () => {
    return api.get('/admin/parcauto/moyens-paiement');
};

export const getMoyenPaiementById = (id) => {
    return api.get(`/admin/parcauto/moyens-paiement/${id}`);
};

export const createMoyenPaiement = (moyenPaiementData) => {
    return api.post('/admin/parcauto/moyens-paiement', moyenPaiementData);
};

export const UpdateMoyenPaiemment = (id,moyenPaiementData) => {
    return api.put(`/admin/parcauto/moyens-paiement/${id}`,moyenPaiementData);
};

export const deleteMoyenPaiement = (id) => {
    return api.delete(`/admin/parcauto/moyens-paiement/${id}`);
};

// ==========================================================
//             API pour les Notifications
// ==========================================================
export const getMyUnreadNotifications = () => {
    return api.get('/notifications/mes-notifications');
};

export const markNotificationAsRead = (id) => {
    return api.put(`/notifications/${id}/marquer-comme-lue`);
};

export const markAllNotificationsAsRead = (id) => {
    return api.put(`/notifications/marquer-tout-comme-lu`);
};

export const deleteNotification = (id) => {
    return api.delete(`/notifications/${id}`);
};