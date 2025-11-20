import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Feedback {
  id: number;
  name: string;
  phone: string;
  message: string;
  created_at: string;
  status: string;
  notes: string | null;
}

const Admin = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/7698e428-c04c-4817-97e8-70eedd7bc07d');
      const data = await response.json();
      if (data.success) {
        setFeedbacks(data.feedbacks);
      }
    } catch (error) {
      console.error('Failed to load feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFeedback = async () => {
    if (!editingFeedback) return;
    
    setUpdating(true);
    try {
      const response = await fetch(`https://functions.poehali.dev/19ca673e-5734-4552-a942-c1d5157a9efb/${editingFeedback.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: editingFeedback.status,
          notes: editingFeedback.notes || ''
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFeedbacks(feedbacks.map(f => 
          f.id === editingFeedback.id ? data.feedback : f
        ));
        setIsDialogOpen(false);
        setEditingFeedback(null);
      }
    } catch (error) {
      console.error('Failed to update feedback:', error);
    } finally {
      setUpdating(false);
    }
  };

  const openEditDialog = (feedback: Feedback) => {
    setEditingFeedback({...feedback});
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">Новая</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-500">В работе</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500">Решена</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredFeedbacks = activeTab === "all" 
    ? feedbacks 
    : feedbacks.filter(f => f.status === activeTab);

  const stats = {
    total: feedbacks.length,
    new: feedbacks.filter(f => f.status === 'new').length,
    in_progress: feedbacks.filter(f => f.status === 'in_progress').length,
    resolved: feedbacks.filter(f => f.status === 'resolved').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Building2" className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">НАШ ДОМ</h1>
                <p className="text-xs text-muted-foreground">Панель управления заявками</p>
              </div>
            </div>
            <Button onClick={() => window.location.href = '/'} variant="ghost" className="gap-2">
              <Icon name="Home" size={20} />
              На главную
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Всего заявок</CardDescription>
                <CardTitle className="text-3xl">{stats.total}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Новые</CardDescription>
                <CardTitle className="text-3xl text-red-600">{stats.new}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>В работе</CardDescription>
                <CardTitle className="text-3xl text-blue-600">{stats.in_progress}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Решены</CardDescription>
                <CardTitle className="text-3xl text-green-600">{stats.resolved}</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Заявки жильцов</CardTitle>
                  <CardDescription>Список всех обращений с сайта</CardDescription>
                </div>
                <Button onClick={loadFeedbacks} variant="outline" size="sm" className="gap-2">
                  <Icon name="RefreshCw" size={16} />
                  Обновить
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="all">Все ({stats.total})</TabsTrigger>
                  <TabsTrigger value="new">Новые ({stats.new})</TabsTrigger>
                  <TabsTrigger value="in_progress">В работе ({stats.in_progress})</TabsTrigger>
                  <TabsTrigger value="resolved">Решены ({stats.resolved})</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab}>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <Icon name="Loader2" className="animate-spin text-primary" size={32} />
                    </div>
                  ) : filteredFeedbacks.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="Inbox" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Заявок пока нет</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredFeedbacks.map((feedback) => (
                        <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                          <CardHeader>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <CardTitle className="text-lg">#{feedback.id} — {feedback.name}</CardTitle>
                                  {getStatusBadge(feedback.status)}
                                </div>
                                <CardDescription className="flex items-center gap-4">
                                  <span className="flex items-center gap-1">
                                    <Icon name="Phone" size={14} />
                                    {feedback.phone}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Icon name="Calendar" size={14} />
                                    {formatDate(feedback.created_at)}
                                  </span>
                                </CardDescription>
                              </div>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="gap-2"
                                onClick={() => openEditDialog(feedback)}
                              >
                                <Icon name="Edit" size={16} />
                                Изменить
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-slate-50 p-4 rounded-lg">
                              <p className="text-sm whitespace-pre-wrap">{feedback.message}</p>
                            </div>
                            {feedback.notes && (
                              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-xs font-semibold text-blue-900 mb-1">Примечание:</p>
                                <p className="text-sm text-blue-800">{feedback.notes}</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Редактировать заявку #{editingFeedback?.id}</DialogTitle>
            <DialogDescription>
              Изменение статуса и добавление примечаний к заявке
            </DialogDescription>
          </DialogHeader>
          {editingFeedback && (
            <div className="space-y-6 py-4">
              <div className="space-y-3">
                <div className="text-sm">
                  <span className="font-semibold">От:</span> {editingFeedback.name}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">Телефон:</span> {editingFeedback.phone}
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-sm">
                  {editingFeedback.message}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Статус заявки</Label>
                <Select 
                  value={editingFeedback.status} 
                  onValueChange={(value) => setEditingFeedback({...editingFeedback, status: value})}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        Новая
                      </div>
                    </SelectItem>
                    <SelectItem value="in_progress">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        В работе
                      </div>
                    </SelectItem>
                    <SelectItem value="resolved">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Решена
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Примечание (необязательно)</Label>
                <Textarea
                  id="notes"
                  placeholder="Добавьте заметку по заявке..."
                  value={editingFeedback.notes || ''}
                  onChange={(e) => setEditingFeedback({...editingFeedback, notes: e.target.value})}
                  rows={4}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={updating}
                >
                  Отмена
                </Button>
                <Button 
                  onClick={updateFeedback}
                  disabled={updating}
                  className="gap-2"
                >
                  <Icon name={updating ? "Loader2" : "Save"} size={16} className={updating ? "animate-spin" : ""} />
                  {updating ? 'Сохранение...' : 'Сохранить'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;