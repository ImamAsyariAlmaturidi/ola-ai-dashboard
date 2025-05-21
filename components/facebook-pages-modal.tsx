"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/components/auth-provider";
import { toast } from "sonner";
import { selectFacebookPage } from "@/app/actions/facebookPagesService";

export type FacebookPage = {
  page_id: string;
  page_name: string;
  fb_user_id: string;
  ig_id: string;
  is_selected: boolean;
};

interface FacebookPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: FacebookPage[];
}

export function FacebookPagesModal({
  isOpen,
  onClose,
  pages,
}: FacebookPagesModalProps) {
  const { connectPage } = useAuth();
  const [selectedPages, setSelectedPages] = useState<FacebookPage[]>([]);

  // 👇 ini penting untuk update state kalau props `pages` baru datang
  useEffect(() => {
    setSelectedPages(pages);
  }, [pages]);

  const handleToggleSelection = (pageId: string) => {
    setSelectedPages(
      selectedPages.map((page) =>
        page.page_id === pageId
          ? { ...page, is_selected: !page.is_selected }
          : page
      )
    );
  };

  const handleSaveSelection = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast.error("Unauthorized. Please log in again.");
        return;
      }

      const selectedPage = selectedPages.find((page) => page.is_selected);
      if (!selectedPage) {
        toast.error("Please select at least one page");
        return;
      }

      const page = await selectFacebookPage(
        token,
        selectedPage.page_id,
        selectedPage.ig_id
      );
      connectPage(page);
      toast.success("Instagram page connected successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving page selection:", error);
      toast.error("Failed to connect Instagram page");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Instagram Business Account</DialogTitle>
          <DialogDescription>
            Choose which Instagram business account you want to connect to your
            profile
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[300px] overflow-y-auto py-4">
          {selectedPages.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No Instagram business accounts found
            </p>
          ) : (
            <ul className="space-y-2">
              {selectedPages.map((page) => (
                <li
                  key={page.page_id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                    page.is_selected ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                  onClick={() => handleToggleSelection(page.page_id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      {page.page_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{page.page_name}</p>
                      <p className="text-xs text-muted-foreground">
                        ID: {page.ig_id}
                      </p>
                    </div>
                  </div>
                  {page.is_selected && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveSelection}>
            Connect Selected Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
