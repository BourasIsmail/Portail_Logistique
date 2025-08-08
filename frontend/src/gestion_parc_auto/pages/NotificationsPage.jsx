import React, { useState, useEffect } from 'react';
import { getAllMyNotifications, markAllNotificationsAsRead, deleteNotification} from '@/services/parcAutoService';
import { useNotifications } from '@/utils/NotificationProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { refreshNotifications } = useNotifications();

    useEffect(() => {
        const markAndFetch = async () => {
            setLoading(true);
            try {
                // On marque tout comme lu, puis on récupère la liste complète
                await markAllNotificationsAsRead();
                const response = await getAllMyNotifications();
                setNotifications(response.data.content);
                // On met à jour le compteur dans la navbar
                refreshNotifications();
            } catch (error) {
                console.error("Failed to fetch notifications", error);
            } finally {
                setLoading(false);
            }
        };
        markAndFetch();
    }, [refreshNotifications]);

     const handleDelete = async (id) => {
        try {
            await deleteNotification(id);
            // On met à jour la liste dans le state pour un effet immédiat
            setNotifications(prevNotifications => prevNotifications.filter(notif => notif.id !== id));
            toast.success("Notification supprimée.");
        } catch (error) {
            toast.error("Erreur lors de la suppression de la notification.");
            console.error("Failed to delete notification", error);
        }
    };

    const getTypeVariant = (type) => {
        switch (type) {
            case 'ASSURANCE': return 'warning';
            case 'CONTROLE_TECHNIQUE': return 'destructive';
            default: return 'secondary';
        }
    };

    if (loading) return <div className="p-8 text-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;

    return (
        <div className="container mx-auto py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Centre de Notifications</CardTitle>
                    <CardDescription>Voici la liste de vos notifications récentes.</CardDescription>
                </CardHeader>
                <CardContent>
                    {notifications.length > 0 ? (
                        <ul className="space-y-4">
                            {notifications.map(notif => (
                                <li key={notif.id} className="p-4 rounded-lg border bg-gray-50 border-gray-200">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-grow">
                                            <Badge variant={getTypeVariant(notif.type)}>{notif.type.replace('_', ' ')}</Badge>
                                            <p className="mt-2 text-gray-800">{notif.message}</p>
                                            {notif.vehiculeId && (
                                                <Button variant="link" asChild className="p-0 h-auto mt-1">
                                                    <Link to={`/parc-auto/vehicules/modifier/${notif.vehiculeId}`}>Voir le véhicule</Link>
                                                </Button>
                                            )}
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-xs text-gray-500 whitespace-nowrap mb-2">{new Date(notif.dateCreation).toLocaleString()}</p>
                                            
                                            {/* --- 5. BOUTON DE SUPPRESSION AJOUTÉ --- */}
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-red-100">
                                                        <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-600" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Voulez-vous vraiment supprimer cette notification ? Cette action est irréversible.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(notif.id)} className="bg-red-600 hover:bg-red-700">Supprimer</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 py-10">Vous n'avez aucune notification.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}