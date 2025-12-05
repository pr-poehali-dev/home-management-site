import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ProtocolViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  title: string;
}

const ProtocolViewer = ({ open, onOpenChange, images, title }: ProtocolViewerProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < images.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <img 
            src={images[currentPage]} 
            alt={`Страница ${currentPage + 1}`}
            className="w-full h-auto"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <Icon name="ChevronLeft" size={20} />
            Назад
          </Button>

          <span className="text-sm text-muted-foreground">
            Страница {currentPage + 1} из {images.length}
          </span>

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === images.length - 1}
          >
            Вперёд
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProtocolViewer;
