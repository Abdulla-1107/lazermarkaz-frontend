import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const Admin = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nameUz: '',
    nameEn: '',
    nameRu: '',
    price: '',
    category: '',
    material: '',
    dimensions: '',
    descriptionUz: '',
    descriptionEn: '',
    descriptionRu: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(t('admin.success'));
      setFormData({
        nameUz: '',
        nameEn: '',
        nameRu: '',
        price: '',
        category: '',
        material: '',
        dimensions: '',
        descriptionUz: '',
        descriptionEn: '',
        descriptionRu: '',
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t('admin.title')}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="nameUz">{t('admin.productName')} (UZ)</Label>
              <Input
                id="nameUz"
                value={formData.nameUz}
                onChange={(e) => setFormData({ ...formData, nameUz: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="nameEn">{t('admin.productName')} (EN)</Label>
              <Input
                id="nameEn"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="nameRu">{t('admin.productName')} (RU)</Label>
              <Input
                id="nameRu"
                value={formData.nameRu}
                onChange={(e) => setFormData({ ...formData, nameRu: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">{t('admin.price')}</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">{t('admin.category')}</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="boxes">{t('catalog.boxes')}</SelectItem>
                  <SelectItem value="signs">{t('catalog.signs')}</SelectItem>
                  <SelectItem value="corporate">{t('catalog.corporate')}</SelectItem>
                  <SelectItem value="gifts">{t('catalog.gifts')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="material">{t('admin.material')}</Label>
              <Input
                id="material"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="dimensions">{t('admin.dimensions')}</Label>
              <Input
                id="dimensions"
                value={formData.dimensions}
                onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="descriptionUz">{t('admin.description')} (UZ)</Label>
            <Textarea
              id="descriptionUz"
              rows={3}
              value={formData.descriptionUz}
              onChange={(e) => setFormData({ ...formData, descriptionUz: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="descriptionEn">{t('admin.description')} (EN)</Label>
            <Textarea
              id="descriptionEn"
              rows={3}
              value={formData.descriptionEn}
              onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="descriptionRu">{t('admin.description')} (RU)</Label>
            <Textarea
              id="descriptionRu"
              rows={3}
              value={formData.descriptionRu}
              onChange={(e) => setFormData({ ...formData, descriptionRu: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? t('common.loading') : t('admin.add')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
