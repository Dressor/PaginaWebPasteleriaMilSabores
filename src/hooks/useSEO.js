// src/hooks/useSEO.js
import { useEffect } from 'react';

export default function useSEO(title, description) {
  useEffect(() => {
    if (title) document.title = `${title} | Pastelería 1000 Sabores`;
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
}
