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
import { toast } from "sonner";

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
      toast.warning(
        "Veuillez d'abord ajouter des besoins de matériaux avant d'envoyer la demande."
      );
      return;
    }
    if (needs.some((need) => need.materialName === "")) {
      toast.warning("Veuillez choisir un article pour chaque besoin.");
      return;
    }
    if (!formData.get("ticketDesc")) {
      toast.warning("Veuillez fournir une description du ticket.");
      return;
    }

    const ticketData = {
      ticketDesc: formData.get("ticketDesc"),
      ctgrId: categories.find(
        (value) => value.ctgrName === formData.get("ctgrName")
      ).ctgrId,
      observation: formData.get("observation") || "",
      needs: [
        ...needs.map((need) => ({
          materialId: materials.find(
            (material) => material.matName === need.materialName
          ).matId,
          quantity: need.quantity,
          affectation: need.affectation,
        })),
      ],
    };

    console.log("Ticket Data:", ticketData);

    api
      .post("/user/create-ticket", ticketData)
      .then((response) => {
        console.log("Ticket created successfully:", response.data);
        toast.success("Ticket créé avec succès !");
        return navigate("/dashboard/tickets", { replace: true });
      })
      .catch((error) => {
        console.error("Error creating ticket:", error);
        toast.error("Une erreur s'est produite lors de la création du ticket.");
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
      toast.warning(
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
        affectation: "",
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
      <Dashboard title={"Service Dashboard"}>
        <div className="flex items-start justify-center h-full mt-10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Créer Une Demande</h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 w-lg flex flex-col justify-center">
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Donnez une description"
                    name="ticketDesc"
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-2">
                    Categorie <span className="text-red-500">*</span>
                  </label>
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
                  <label className="text-sm font-medium mb-2">
                    Observation :
                  </label>
                  <Input
                    type="text"
                    placeholder="observation"
                    className="w-full"
                    name="observation"
                  />
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
                        <CollapsibleContent className="px-4 rounded py-1">
                          <div className="mb-2">
                            <label className="text-sm font-medium ">
                              Nom : <span className="text-red-500">*</span>
                            </label>
                            <Select
                              name="materialName"
                              onValueChange={(value) => {
                                handleChange(index, "materialName", value);
                              }}
                              defaultValue={need.materialName}
                              required
                            >
                              <SelectTrigger className="w-full mt-1">
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
                                Quantité :{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <Input
                                type="number"
                                placeholder="quantité"
                                className="w-40 mt-1"
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
                            <div className="mb-2 w-full">
                              <label className="text-sm font-medium mt-2 ">
                                Affectation Par Person :
                              </label>
                              <Input
                                type="text"
                                placeholder="affectation"
                                name="affectation"
                                className={"mt-1"}
                                onChange={(e) => {
                                  handleChange(
                                    index,
                                    "affectation",
                                    e.target.value
                                  );
                                }}
                                value={need.affectation}
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  <div className="flex justify-start items-center">
                    <Badge variant="secondary" className="text-sm">
                      Ajoute Article
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
                <Button type="submit">Envoyer</Button>
              </div>
            </form>
          </div>
        </div>
      </Dashboard>
    </>
  );
}
