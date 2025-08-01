import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createVehicule,
  getAllCentres,
  getAllChauffeurs,
} from "@/services/parcAutoService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster, toast } from "sonner";
import { Car, Wrench, Users, Info, Loader2 } from "lucide-react";

export default function VehiculeForm() {
    const navigate = useNavigate();
    
    const [vehiculeData, setVehiculeData] = useState({
        immatriculation: '', marque: '', modele: '', referenceMarche: '', genre: '', typeCarburant: 'DIESEL',
        puissanceFiscale: 0, dateMiseEnCirculation: '', statut: 'EN_SERVICE', kilometrage: 0,
        dateExpirationAssurance: '', dateProchainControleTechnique: '', aFaitAccident: false,
        etat: '', observations: '', centreRattachementId: null, chauffeurAttitreId: null,
    });



  const [centres, setCentres] = useState([]);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDependencies = async () => {
      try {
        const [centresRes, chauffeursRes] = await Promise.all([
          getAllCentres(),
          getAllChauffeurs(),
        ]);
        setCentres(centresRes.data);
        setChauffeurs(chauffeursRes.data);
      } catch (err) {
        console.error("Erreur de chargement des dépendances:", err);
        setError(
          "Impossible de charger les listes de centres et chauffeurs. Veuillez vérifier la connexion au serveur."
        );
        toast.error("Erreur de chargement des données initiales.");
      } finally {
        setLoading(false);
      }
    };
    loadDependencies();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehiculeData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    const finalValue = value === "none" ? null : value;
    setVehiculeData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!vehiculeData.centreRattachementId) {
      toast.error("Veuillez sélectionner un centre de rattachement.");
      return;
    }
    if (!vehiculeData.immatriculation || !vehiculeData.marque) {
      toast.error("L'immatriculation et la marque sont obligatoires.");
      return;
    }

    setSubmitting(true);
    try {
      const dataToSend = {
        ...vehiculeData,
        centreRattachementId: parseInt(vehiculeData.centreRattachementId, 10),
        chauffeurAttitreId: vehiculeData.chauffeurAttitreId
          ? parseInt(vehiculeData.chauffeurAttitreId, 10)
          : null,
        kilometrage: parseInt(vehiculeData.kilometrage, 10) || 0,
        puissanceFiscale: parseInt(vehiculeData.puissanceFiscale, 10) || 0,
      };

      await createVehicule(dataToSend);
      toast.success("Véhicule ajouté avec succès !");
      setTimeout(() => navigate("/parc-auto/vehicules"), 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Erreur lors de la création du véhicule."
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
        <div className="container mx-auto py-10 px-4">
            <form onSubmit={handleSubmit}>
                <Card className="max-w-5xl mx-auto border-gray-300 shadow-lg">
                    <CardHeader className="bg-gray-50 border-b rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-gray-800">Ajouter un Nouveau Véhicule</CardTitle>
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
                            <div className="flex items-center space-x-3 border-b pb-3"><Users className="h-6 w-6 text-purple-600" /><h3 className="text-xl font-semibold text-gray-700">Affectation et Statut</h3></div>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2"><Label htmlFor="centreRattachementId">Centre de Rattachement</Label><Select onValueChange={(v) => handleSelectChange('centreRattachementId', v)} required><SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger><SelectContent>{centres.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.nom}</SelectItem>)}</SelectContent></Select></div>
                                <div className="space-y-2"><Label htmlFor="chauffeurAttitreId">Chauffeur Attitré (Optionnel)</Label><Select onValueChange={(v) => handleSelectChange('chauffeurAttitreId', v)}><SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger><SelectContent><SelectItem value="none">Aucun</SelectItem>{chauffeurs.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.prenom} {c.nom}</SelectItem>)}</SelectContent></Select></div>
                                <div className="space-y-2"><Label htmlFor="statut">Statut Opérationnel</Label><Select onValueChange={(v) => handleSelectChange('statut', v)} defaultValue="EN_SERVICE"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="EN_SERVICE">En Service</SelectItem><SelectItem value="EN_MISSION">En Mission</SelectItem><SelectItem value="EN_MAINTENANCE">En Maintenance</SelectItem><SelectItem value="HORS_SERVICE">Hors Service</SelectItem></SelectContent></Select></div>
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
                    <CardFooter className="flex justify-end gap-4 bg-gray-50 border-t rounded-b-lg p-4">
                        <Button type="button" variant="outline" onClick={() => navigate('/parc-auto/vehicules')}>Annuler</Button>
                        <Button type="submit" disabled={submitting}>{submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement...</> : 'Enregistrer le Véhicule'}</Button>
                    </CardFooter>
                </Card>
            </form>
            <Toaster richColors />
        </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg m-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-5xl mx-auto border-gray-300 shadow-lg">
          <CardHeader className="bg-gray-50 border-b rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Ajouter un Nouveau Véhicule
            </CardTitle>
            <CardDescription>
              Remplissez les informations ci-dessous pour enregistrer un nouveau
              véhicule dans le parc.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-10">
            {/* Section 1: Identification */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <Car className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-700">
                  Identification
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="immatriculation">Immatriculation</Label>
                  <Input
                    id="immatriculation"
                    name="immatriculation"
                    value={vehiculeData.immatriculation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="marque">Marque</Label>
                  <Input
                    id="marque"
                    name="marque"
                    value={vehiculeData.marque}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modele">Modèle</Label>
                  <Input
                    id="modele"
                    name="modele"
                    value={vehiculeData.modele}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Détails Techniques */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <Wrench className="h-6 w-6 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-700">
                  Détails Techniques
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Input
                    id="genre"
                    name="genre"
                    value={vehiculeData.genre}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="typeCarburant">Carburant</Label>
                  <Select
                    onValueChange={(v) =>
                      handleSelectChange("typeCarburant", v)
                    }
                    defaultValue="DIESEL"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DIESEL">Diesel</SelectItem>
                      <SelectItem value="ESSENCE">Essence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="puissanceFiscale">Puissance Fiscale</Label>
                  <Input
                    id="puissanceFiscale"
                    name="puissanceFiscale"
                    type="number"
                    value={vehiculeData.puissanceFiscale}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kilometrage">Kilométrage</Label>
                  <Input
                    id="kilometrage"
                    name="kilometrage"
                    type="number"
                    value={vehiculeData.kilometrage}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateMiseEnCirculation">
                    Mise en Circulation
                  </Label>
                  <Input
                    id="dateMiseEnCirculation"
                    name="dateMiseEnCirculation"
                    type="date"
                    value={vehiculeData.dateMiseEnCirculation}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateExpirationAssurance">
                    Expiration Assurance
                  </Label>
                  <Input
                    id="dateExpirationAssurance"
                    name="dateExpirationAssurance"
                    type="date"
                    value={vehiculeData.dateExpirationAssurance}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateProchainControleTechnique">
                    Prochain Contrôle Tech.
                  </Label>
                  <Input
                    id="dateProchainControleTechnique"
                    name="dateProchainControleTechnique"
                    type="date"
                    value={vehiculeData.dateProchainControleTechnique}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </section>

            {/* Section 3: Affectation et Statut */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-700">
                  Affectation et Statut
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="centreRattachementId">
                    Centre de Rattachement
                  </Label>
                  <Select
                    onValueChange={(v) =>
                      handleSelectChange("centreRattachementId", v)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      {centres.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chauffeurAttitreId">
                    Chauffeur Attitré (Optionnel)
                  </Label>
                  <Select
                    onValueChange={(v) =>
                      handleSelectChange("chauffeurAttitreId", v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucun</SelectItem>
                      {chauffeurs.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.prenom} {c.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statut">Statut Opérationnel</Label>
                  <Select
                    onValueChange={(v) => handleSelectChange("statut", v)}
                    defaultValue="EN_SERVICE"
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EN_SERVICE">En Service</SelectItem>
                      <SelectItem value="EN_MISSION">En Mission</SelectItem>
                      <SelectItem value="EN_MAINTENANCE">
                        En Maintenance
                      </SelectItem>
                      <SelectItem value="HORS_SERVICE">Hors Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </section>

            {/* Section 4: Informations Complémentaires */}
            <section className="space-y-4">
              <div className="flex items-center space-x-3">
                <Info className="h-6 w-6 text-orange-600" />
                <h3 className="text-xl font-semibold text-gray-700">
                  Informations Complémentaires
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <Label htmlFor="etat">État Général (description)</Label>
                  <Input
                    id="etat"
                    name="etat"
                    value={vehiculeData.etat}
                    onChange={handleChange}
                    placeholder="ex: Bon état, Usé..."
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Checkbox
                    id="aFaitAccident"
                    name="aFaitAccident"
                    checked={vehiculeData.aFaitAccident}
                    onCheckedChange={(checked) =>
                      handleSelectChange("aFaitAccident", checked)
                    }
                  />
                  <Label htmlFor="aFaitAccident">A déjà eu un accident</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="observations">Observations</Label>
                <Textarea
                  id="observations"
                  name="observations"
                  value={vehiculeData.observations}
                  onChange={handleChange}
                  placeholder="Ajouter des remarques..."
                />
              </div>
            </section>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 bg-gray-50 border-t rounded-b-lg p-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/parc-auto/vehicules")}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className={
                "rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-900"
              }
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Enregistrement...
                </>
              ) : (
                "Enregistrer le Véhicule"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
      <Toaster richColors />
    </div>
  );
}
