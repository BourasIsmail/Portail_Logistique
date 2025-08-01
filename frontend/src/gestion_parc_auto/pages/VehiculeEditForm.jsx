import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createVehicule, getAllCentres, getAllChauffeurs } from '@/services/parcAutoService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Toaster, toast } from 'sonner';
import { Car, Wrench, Users, Info, Loader2 } from 'lucide-react';
import { updateVehicule, getVehiculeById} from '@/services/parcAutoService'; 

export default function VehiculeForm() {
    const navigate = useNavigate();
    const { vehiculeId } = useParams();
    
    const [vehiculeData, setVehiculeData] = useState(null); 

    const [centres, setCentres] = useState([]);
    const [chauffeurs, setChauffeurs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                
                const [vehiculeRes, centresRes, chauffeursRes] = await Promise.all([
                    getVehiculeById(vehiculeId),
                    getAllCentres(),
                    getAllChauffeurs()
                ]);
                const data = vehiculeRes.data;
                setVehiculeData({
                    ...data,
                    centreRattachementId: data.centreRattachementId?.toString() || null,
                    chauffeurAttitreId: data.chauffeurAttitreId?.toString() || null,
                });
                
                setCentres(centresRes.data);
                setChauffeurs(chauffeursRes.data);
            } catch (err) {
                console.error("Erreur de chargement des données:", err);
                setError("Impossible de charger les données du véhicule.");
                toast.error("Erreur de chargement des données.");
            } finally {
                setLoading(false);
            }
        };
        loadAllData();
    }, [vehiculeId]); 


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVehiculeData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    
    const handleSelectChange = (name, value) => {
        const finalValue = value === "none" ? null : value;
        setVehiculeData(prev => ({ ...prev, [name]: finalValue }));
    };

       const handleSubmit = async (e) => {
        e.preventDefault();

        if (!vehiculeData.centreRattachementId) {
            toast.error("Veuillez sélectionner un centre de rattachement.");
            return;
        }

        setSubmitting(true);
        try {
            const dataToSend = {
                ...vehiculeData,
                centreRattachementId: parseInt(vehiculeData.centreRattachementId, 10),
                chauffeurAttitreId: vehiculeData.chauffeurAttitreId ? parseInt(vehiculeData.chauffeurAttitreId, 10) : null,
            };
            
            await updateVehicule(vehiculeId, dataToSend); // <-- CHANGEMENT : On appelle updateVehicule
            toast.success('Véhicule mis à jour avec succès !');
            setTimeout(() => navigate('/parc-auto/vehicules'), 1500);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Erreur lors de la mise à jour du véhicule.');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };
    
    if (loading) {
        return <div className="p-8 text-center">Chargement des données du véhicule...</div>;
    }
    
    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <form onSubmit={handleSubmit}>
                <Card className="max-w-5xl mx-auto border-gray-300 shadow-lg">
                    <CardHeader className="bg-gray-50 border-b rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-gray-800"> Modifier le Véhicule</CardTitle>
                        <CardDescription>Remplissez les informations ci-dessous pour enregistrer un nouveau véhicule dans le parc.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 space-y-10">
                        {/* Section 1: Identification */}
 <section className="space-y-6">
                            <div className="flex items-center space-x-3 border-b pb-3">
                                <Car className="h-7 w-7 text-blue-500" />
                                <h3 className="text-xl font-semibold text-gray-800">Identification</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2"><Label htmlFor="immatriculation">Immatriculation</Label><Input id="immatriculation" name="immatriculation" value={vehiculeData.immatriculation} onChange={handleChange} required /></div>
                                <div className="space-y-2"><Label htmlFor="marque">Marque</Label><Input id="marque" name="marque" value={vehiculeData.marque} onChange={handleChange} required /></div>
                                <div className="space-y-2"><Label htmlFor="modele">Modèle</Label><Input id="modele" name="modele" value={vehiculeData.modele} onChange={handleChange} /></div>
                                <div className="space-y-2"><Label htmlFor="referenceMarche">Référence Marché</Label><Input id="referenceMarche" name="referenceMarche" value={vehiculeData.referenceMarche} onChange={handleChange} /></div>
                            </div>
                        </section>

                        {/* Section 2: Détails Techniques */}
                        <section className="space-y-6">
                            <div className="flex items-center space-x-3 border-b pb-3"><Wrench className="h-6 w-6 text-green-600" /><h3 className="text-xl font-semibold text-gray-700">Détails Techniques</h3></div>
                             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="space-y-2"><Label htmlFor="genre">Genre</Label><Input id="genre" name="genre" value={vehiculeData.genre} onChange={handleChange} /></div>
                                <div className="space-y-2"><Label htmlFor="typeCarburant">Carburant</Label><Select onValueChange={(v) => handleSelectChange('typeCarburant', v)} defaultValue="DIESEL"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="DIESEL">Diesel</SelectItem><SelectItem value="ESSENCE">Essence</SelectItem></SelectContent></Select></div>
                                <div className="space-y-2"><Label htmlFor="puissanceFiscale">Puissance Fiscale</Label><Input id="puissanceFiscale" name="puissanceFiscale" type="number" value={vehiculeData.puissanceFiscale} onChange={handleChange} /></div>
                                 <div className="space-y-2"><Label htmlFor="kilometrage">Kilométrage</Label><Input id="kilometrage" name="kilometrage" type="number" value={vehiculeData.kilometrage} onChange={handleChange} /></div>
                                <div className="space-y-2"><Label htmlFor="dateMiseEnCirculation">Mise en Circulation</Label><Input id="dateMiseEnCirculation" name="dateMiseEnCirculation" type="date" value={vehiculeData.dateMiseEnCirculation} onChange={handleChange} /></div>
                                <div className="space-y-2"><Label htmlFor="dateExpirationAssurance">Expiration Assurance</Label><Input id="dateExpirationAssurance" name="dateExpirationAssurance" type="date" value={vehiculeData.dateExpirationAssurance} onChange={handleChange} /></div>
                                <div className="space-y-2"><Label htmlFor="dateProchainControleTechnique">Prochain Contrôle Tech.</Label><Input id="dateProchainControleTechnique" name="dateProchainControleTechnique" type="date" value={vehiculeData.dateProchainControleTechnique} onChange={handleChange} /></div>
                             </div>
                        </section>

                        {/* Section 3: Affectation et Statut */}
                             <section className="space-y-6">
                             <h3 className="text-xl font-semibold text-gray-700">Affectation et Statut</h3>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="centreRattachementId">Centre de Rattachement</Label>
                                    <Select 
                                        value={vehiculeData.centreRattachementId?.toString()} 
                                        onValueChange={(v) => handleSelectChange('centreRattachementId', v)} 
                                        required
                                    >
                                        <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                                        <SelectContent>{centres.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.nom}</SelectItem>)}</SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="chauffeurAttitreId">Chauffeur Attitré (Optionnel)</Label>
                                    <Select 
                                        value={vehiculeData.chauffeurAttitreId?.toString() || "none"}
                                        onValueChange={(v) => handleSelectChange('chauffeurAttitreId', v)}
                                    >
                                        <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">Aucun</SelectItem>
                                            {chauffeurs.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.prenom} {c.nom}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="statut">Statut Opérationnel</Label>
                                    <Select 
                                        value={vehiculeData.statut} 
                                        onValueChange={(v) => handleSelectChange('statut', v)}
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="EN_SERVICE">En Service</SelectItem>
                                            <SelectItem value="EN_MISSION">En Mission</SelectItem>
                                            <SelectItem value="EN_MAINTENANCE">En Maintenance</SelectItem>
                                            <SelectItem value="HORS_SERVICE">Hors Service</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                             </div>
                        </section>

                         {/* Section 4: Informations Complémentaires */}
                         <section className="space-y-4">
                            <div className="flex items-center space-x-3 border-b pb-3"><Info className="h-6 w-6 text-orange-600" /><h3 className="text-xl font-semibold text-gray-700">Informations Complémentaires</h3></div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                <div className="space-y-2"><Label htmlFor="etat">État Général (description)</Label><Input id="etat" name="etat" value={vehiculeData.etat} onChange={handleChange} placeholder="ex: Bon état, Usé..."/></div>
                                 <div className="flex items-center space-x-2 pt-6"><Checkbox id="aFaitAccident" name="aFaitAccident" checked={vehiculeData.aFaitAccident} onCheckedChange={(checked) => handleSelectChange('aFaitAccident', checked)} /><Label htmlFor="aFaitAccident">A déjà eu un accident</Label></div>
                             </div>
                             <div className="space-y-2"><Label htmlFor="observations">Observations</Label><Textarea id="observations" name="observations" value={vehiculeData.observations} onChange={handleChange} placeholder="Ajouter des remarques..."/></div>
                        </section>
                    </CardContent>
 <CardFooter className="flex justify-end gap-4 bg-slate-50 border-t p-6">
                        <Button type="button" variant="outline" size="lg" onClick={() => navigate('/parc-auto/vehicules')}>Annuler</Button>
                        <Button type="submit" size="lg" disabled={submitting}>{submitting ? 'Mise à jour...' : 'Enregistrer les Modifications'}</Button>
                    </CardFooter>
                </Card>
            </form>
            <Toaster richColors />
        </div>
    );
}