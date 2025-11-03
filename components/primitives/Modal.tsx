"use client";

import { type ReactNode, useEffect } from "react";
import { spacingTokens, borderTokens, shadowTokens, zIndexTokens } from "@/styles/tokens";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function Modal({ children, isOpen, onClose, title }: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Trap focus within modal
  useEffect(() => {
    if (!isOpen) return;

    const modal = document.getElementById("modal-content");
    const focusableElements = modal?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    firstElement?.focus();
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: zIndexTokens.modal,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        id="modal-content"
        style={{
          backgroundColor: "var(--color-background-primary)",
          borderRadius: borderTokens.radius.lg,
          padding: spacingTokens[6],
          maxWidth: "32rem",
          width: "90%",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: shadowTokens["2xl"],
        }}
      >
        {title && (
          <h2
            id="modal-title"
            style={{
              marginBottom: spacingTokens[4],
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--color-foreground-primary)",
            }}
          >
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
