import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import api from "@/utils/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { v4 as uuid } from "uuid";

export default function CreateTicketPage() {
  const [loading, setLoading] = useState(true);
  const [needs, setNeeds] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/user/get-categories");
        console.log("Categories Data:", response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (needs.length === 0) {
      alert(
        "Veuillez d'abord ajouter des besoins de matériaux avant d'envoyer la demande."
      );
      return;
    }
    if (needs.some((need) => need.materialName === "")) {
      alert("Veuillez choisir un matériel pour chaque besoin.");
      return;
    }
    if (!formData.get("ticketDesc")) {
      alert("Veuillez fournir une description du ticket.");
      return;
    }

    const ticketData = {
      ticketDesc: formData.get("ticketDesc"),
      ctgrId: categories.find(
        (value) => value.ctgrName === formData.get("ctgrName")
      ).ctgrId,
      needs: [
        ...needs.map((need) => ({
          materialId: materials.find(
            (material) => material.matName === need.materialName
          ).matId,
          quantity: need.quantity,
          observation: need.observation,
          affectationParBureau: need.affectationParBureau,
          affectationParPersonne: need.affectationParPersonne,
        })),
      ],
    };

    console.log("Ticket Data:", ticketData);

    api
      .post("/user/create-ticket", ticketData)
      .then((response) => {
        console.log("Ticket created successfully:", response.data);
        alert("Ticket créé avec succès !");
        return navigate("/dashboard/tickets", { replace: true });
      })
      .catch((error) => {
        console.error("Error creating ticket:", error);
        alert("Une erreur s'est produite lors de la création du ticket.");
      });
  };

  const handleCategoryChange = async (ctgrName) => {
    let materialList = categories.find(
      (cat) => cat.ctgrName === ctgrName
    ).materials;

    setMaterials(materialList);
  };

  const handleClick = () => {
    if (materials.length === 0) {
      alert(
        "Veuillez d'abord choisir une catégorie pour ajouter des matriaux."
      );
      return;
    }

    setNeeds((prevNeeds) => [
      ...prevNeeds,
      {
        id: uuid(),
        materialName: "",
        quantity: 1,
        observation: "",
        affectationParBureau: "",
        affectationParPersonne: "",
      },
    ]);
  };

  const handleChange = (index, field, value) => {
    setNeeds((prevNeeds) => {
      const updatedNeeds = [...prevNeeds];
      updatedNeeds[index] = {
        ...updatedNeeds[index],
        [field]: value,
      };
      return updatedNeeds;
    });
  };

  const removeNeed = (id) => {
    setNeeds(needs.filter((need) => need.id !== id));
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <Dashboard>
        <div className="flex items-start justify-center h-full mt-10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Créer Un Ticket</h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 w-lg flex flex-col justify-center">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">
                    Description
                  </label>
                  <Input
                    placeholder="Donnez une description"
                    name="ticketDesc"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">Categorie</label>
                  <Select
                    name="ctgrName"
                    required
                    onValueChange={(value) => handleCategoryChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="categories de material" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.ctgrId}
                          value={category.ctgrName}
                        >
                          {category.ctgrName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">Besoin</label>
                  {needs.length > 0 &&
                    needs.map((need, index) => (
                      <Collapsible
                        key={index}
                        className="mb-4 border-2 rounded-lg border-black"
                        defaultOpen
                      >
                        <div className="flex items-center justify-between gap-4 px-4">
                          <h4 className="text-sm font-semibold">
                            Material {index + 1}
                          </h4>
                          <div className="flex items-center gap-2">
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8"
                              >
                                <ChevronsUpDown />
                              </Button>
                            </CollapsibleTrigger>
                            <Button
                              className="h-6 p-2 bg-red-500 text-white hover:bg-red-600"
                              type="button"
                              onClick={() => {
                                removeNeed(need.id);
                              }}
                            >
                              <span className="">Delete</span>
                            </Button>
                          </div>
                        </div>
                        <CollapsibleContent className="p-4 rounded">
                          <div className="mb-2">
                            <label className="text-sm font-medium mb-2">
                              Nom :
                            </label>
                            <Select
                              name="materialName"
                              onValueChange={(value) => {
                                handleChange(index, "materialName", value);
                              }}
                              defaultValue={need.materialName}
                              required
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="matériaux" />
                              </SelectTrigger>
                              <SelectContent>
                                {materials.map((material) => (
                                  <SelectItem
                                    key={material.matId}
                                    value={material.matName}
                                  >
                                    {material.matName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="mb-2 flex gap-4">
                            <div>
                              <label className="text-sm font-medium mt-2">
                                Quantité :
                              </label>
                              <Input
                                type="number"
                                placeholder="quantité"
                                className="w-40"
                                name="quantity"
                                min="1"
                                onChange={(e) => {
                                  handleChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                  );
                                }}
                                value={need.quantity}
                                required
                              />
                            </div>
                            <div className="flex-1">
                              <label className="text-sm font-medium mt-2">
                                Observation :
                              </label>
                              <Input
                                type="text"
                                placeholder="observation"
                                onChange={(e) => {
                                  handleChange(
                                    index,
                                    "observation",
                                    e.target.value
                                  );
                                }}
                                value={need.observation}
                                name="observation"
                              />
                            </div>
                          </div>
                          <div className="mb-2">
                            <label className="text-sm font-medium mt-2">
                              Affectation Par Bureau :
                            </label>
                            <Input
                              type="text"
                              placeholder="affectation par bureau"
                              name="affectationParBureau"
                              onChange={(e) => {
                                handleChange(
                                  index,
                                  "affectationParBureau",
                                  e.target.value
                                );
                              }}
                              value={need.affectationParBureau}
                            />
                          </div>
                          <div className="mb-2">
                            <label className="text-sm font-medium mt-2">
                              Affectation Par Person :
                            </label>
                            <Input
                              type="text"
                              placeholder="affectation par person"
                              name="affectationParPersonne"
                              onChange={(e) => {
                                handleChange(
                                  index,
                                  "affectationParPersonne",
                                  e.target.value
                                );
                              }}
                              value={need.affectationParPersonne}
                            />
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  <div className="flex justify-start items-center">
                    <Badge variant="secondary" className="text-sm">
                      Ajoute Materiel
                    </Badge>
                    <Button
                      className="mx-2 rounded-full h-6 px-2"
                      type="button"
                      onClick={handleClick}
                    >
                      <span className="font-bold font-mono text-xl">+</span>
                    </Button>
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </Dashboard>
    </>
  );
}
